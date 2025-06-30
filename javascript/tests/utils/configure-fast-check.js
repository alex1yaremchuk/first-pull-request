import fc from 'fast-check';

fc.configureGlobal({
  reporter: (out) => {
    if (!out.failed) return;

    console.log(`❌ Failed: ${out.counterexample}`);
    if (out.numShrinks !== undefined) {
      console.log(`🔎 Shrunk ${out.numShrinks} times`);
    }
    console.log(`🧪 Seed: ${out.seed}`);
  }
});

export default fc;
