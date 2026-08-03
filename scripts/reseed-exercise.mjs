import { readFile, writeFile } from 'node:fs/promises';

const token = process.env.GITHUB_TOKEN;
const repository = process.env.GITHUB_REPOSITORY ?? 'alex1yaremchuk/first-pull-request';
const [owner, repo] = repository.split('/');
const apiBase = `https://api.github.com/repos/${owner}/${repo}`;
const reseedLabel = 'reseeded-after-merge';
const oneDayMs = 24 * 60 * 60 * 1000;

const exercises = [
  {
    id: 'js.add.idempotency',
    title: 'Test failed: js.add.idempotency',
    file: 'javascript/src/index.js',
    seeded: 'if ((a === 0) || (b === 0)) return 42;',
    anchor: 'return a + b;',
    seed: '  if ((a === 0) || (b === 0)) return 42;\n\n  return a + b;',
  },
  {
    id: 'js.add.commutative',
    title: 'Test failed: js.add.commutative',
    file: 'javascript/src/index.js',
    seeded: 'if (a > 100000) return a + b + 1;',
    anchor: 'return a + b;',
    seed: '  if (a > 100000) return a + b + 1;\n  \n  return a + b;',
  },
  {
    id: 'zig.add.idempotency',
    title: 'Test failed: zig.add.idempotency',
    file: 'zig/index.zig',
    seeded: 'if ((a == 0) or (b == 0)) return 42;',
    anchor: 'return a + b;',
    seed: '    if ((a == 0) or (b == 0)) return 42;\n\n    return a + b;',
  },
  {
    id: 'zig.add.commutative',
    title: 'Test failed: zig.add.commutative',
    file: 'zig/index.zig',
    seeded: 'return a + b + 1;',
    anchor: 'return a + b;',
    seed: '    if (a > 100000) {\n        return a + b + 1;\n    }\n\n    return a + b;',
  },
  {
    id: 'nim.add.idempotency',
    title: 'Test failed: nim.add.idempotency',
    file: 'nim/src/calculator.nim',
    seeded: 'return 42',
    anchor: 'return a + b',
    seed: '  if a == 0 or b == 0:\n    return 42\n\n  return a + b',
  },
];

async function request(path, options = {}) {
  if (!token) throw new Error('GITHUB_TOKEN is required');

  const response = await fetch(`${apiBase}${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${options.method ?? 'GET'} ${path} failed: ${response.status} ${body}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

async function getRecentMergedPulls() {
  const pulls = await request('/pulls?state=closed&sort=updated&direction=desc&per_page=50');
  const cutoff = Date.now() - oneDayMs;
  return pulls.filter((pull) => pull.merged_at && new Date(pull.merged_at).getTime() <= cutoff);
}

async function getLinkedIssueText(text) {
  const issueNumbers = [...text.matchAll(/#(\d+)/g)].map((match) => Number(match[1]));
  const chunks = [];

  for (const issueNumber of issueNumbers.slice(0, 5)) {
    try {
      const issue = await request(`/issues/${issueNumber}`);
      chunks.push(`${issue.title}\n${issue.body ?? ''}`);
    } catch {
      // Missing or inaccessible issue references should not block reseeding.
    }
  }

  return chunks.join('\n');
}

async function findPullToReseed() {
  const pulls = await getRecentMergedPulls();

  for (const pull of pulls) {
    if (pull.labels?.some((label) => label.name === reseedLabel)) continue;

    const baseText = `${pull.title}\n${pull.body ?? ''}`;
    const linkedIssueText = await getLinkedIssueText(baseText);
    const text = `${baseText}\n${linkedIssueText}`;
    const exercise = exercises.find((item) => text.includes(item.id) || text.includes(item.title));
    if (exercise) return { pull, exercise };
  }

  return null;
}

async function ensureLabel() {
  try {
    await request(`/labels/${encodeURIComponent(reseedLabel)}`);
  } catch {
    await request('/labels', {
      method: 'POST',
      body: JSON.stringify({
        name: reseedLabel,
        color: '6f42c1',
        description: 'Exercise has already been reseeded after merge',
      }),
    });
  }
}

async function labelPull(number) {
  await ensureLabel();
  await request(`/issues/${number}/labels`, {
    method: 'POST',
    body: JSON.stringify({ labels: [reseedLabel] }),
  });
}

async function ensureIssue(exercise) {
  const issues = await request('/issues?state=open&per_page=100');
  const existing = issues.find((issue) => issue.title?.trim() === exercise.title);
  if (existing) return;

  await request('/issues', {
    method: 'POST',
    body: JSON.stringify({
      title: exercise.title,
      body: [
        'This exercise was reseeded automatically for the next contributor.',
        '',
        `Failing property: \`${exercise.id}\``,
        `File to inspect: \`${exercise.file}\``,
      ].join('\n'),
    }),
  });
}

async function reseed(exercise) {
  const source = await readFile(exercise.file, 'utf8');
  if (source.includes(exercise.seeded)) {
    console.log(`${exercise.id} is already seeded`);
    return false;
  }

  if (!source.includes(exercise.anchor)) {
    throw new Error(`Cannot reseed ${exercise.id}: anchor not found in ${exercise.file}`);
  }

  await writeFile(exercise.file, source.replace(exercise.anchor, exercise.seed), 'utf8');
  console.log(`Reseeded ${exercise.id}`);
  return true;
}

async function setOutput(name, value) {
  if (!process.env.GITHUB_OUTPUT) return;
  const { appendFile } = await import('node:fs/promises');
  await appendFile(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
}

const candidate = await findPullToReseed();

if (!candidate) {
  console.log('No merged PR older than 24 hours needs reseeding');
  await setOutput('changed', 'false');
  process.exit(0);
}

const changed = await reseed(candidate.exercise);
await ensureIssue(candidate.exercise);
await labelPull(candidate.pull.number);

await setOutput('changed', changed ? 'true' : 'false');
await setOutput('exercise', candidate.exercise.id);
await setOutput('pull', String(candidate.pull.number));
