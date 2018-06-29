import generator from "../../helpers/sample-data-generator";

export const dataSamples = generator.samples([10, 50, 100],
  () => generator.shape({
    x: () => generator.integer(1, 1000),
    y: () => generator.integer(1, 1000)
  })
);

export const dataAccessorSamples = generator.samples([10, 50, 100],
  () => generator.shape({
    amount: () => generator.integer(1, 1000),
    yield: () => generator.integer(1, 1000),
    error: () => generator.number(0, 2)
  })
);
