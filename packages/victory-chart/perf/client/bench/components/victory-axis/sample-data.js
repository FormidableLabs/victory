import generator from "../../helpers/sample-data-generator";

export const tickValueSamples = generator.samples([10, 50, 100],
  () => generator.string(1, 7)
);
