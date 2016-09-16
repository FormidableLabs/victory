import generator from "../../helpers/sample-data-generator";

export const dataSamples = generator.samples([10, 50, 100],
  () => generator.shape({
    x: () => generator.integer(1, 1000),
    y: () => generator.integer(1, 1000)
  })
);
