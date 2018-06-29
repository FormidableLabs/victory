import generator from "../../helpers/sample-data-generator";

export const dataSamples = generator.samples([10, 50, 100],
  () => generator.shape({
    x: () => generator.integer(1, 1000),
    open: () => generator.integer(10, 20),
    close: () => generator.integer(20, 30),
    high: () => generator.integer(30, 40),
    low: () => generator.integer(0, 10)
  })
);

export const dataAccessorSamples = generator.samples([10, 50, 100],
  () => generator.shape({
    count: () => generator.integer(1, 1000),
    open: () => generator.integer(10, 20),
    close: () => generator.integer(20, 30),
    high: () => generator.integer(30, 40),
    low: () => generator.integer(0, 10)
  })
);
