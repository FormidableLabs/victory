import generator from "../../helpers/sample-data-generator";

export const dataSamples = generator.samples([10, 50, 100],
  () => generator.shape({
    x: () => generator.integer(1, 100),
    y: () => generator.integer(1, 100)
  })
);

export const dataAccessorSamples = generator.samples([10, 50, 100],
  () => generator.shape({
    count: () => generator.integer(1, 100),
    y: () => generator.integer(1, 100)
  })
);
