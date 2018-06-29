import generator from "../../helpers/sample-data-generator";

export const dataSamples = generator.samples([10, 50, 100],
  () => generator.shape({
    x: () => generator.integer(1, 1000),
    y: () => generator.integer(1, 1000),
    errorX: () => generator.array(2, () => generator.number(0, 1)),
    errorY: () => generator.number(0, 1)
  })
);

export const dataAccessorSamples = generator.samples([10, 50, 100],
  () => generator.shape({
    count: () => generator.integer(1, 1000),
    y: () => generator.integer(1, 1000),
    errorX: () => generator.array(2, () => generator.number(0, 1)),
    errorY: () => generator.number(0, 1)
  })
);
