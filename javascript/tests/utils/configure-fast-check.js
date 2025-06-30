import fc from 'fast-check';

fc.configureGlobal({
  reporter: (out) => {
    if (!out.failed) return;

    const args = JSON.stringify(out.counterexample ?? []);
    console.log(`❌ Failed: ${args}`);
    if (out.numShrinks !== undefined) {
      console.log(`🔎 Shrunk ${out.numShrinks} times`);
    }
    console.log(`🧪 Seed: ${out.seed}`);

    // бросаем ошибку, но без подробностей
    const error = new Error(`Property failed`);
    error.stack = ''; // подавляем вывод трассировки
    throw error;
  }
});

export default fc;
