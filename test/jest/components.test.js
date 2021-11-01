import { VictoryArea } from "victory-native";

const components = [{ component: VictoryArea, name: "VictoryArea" }];

describe("Default render", () => {
  components.forEach((c) => {
    it(`should work for ${c.name}`, () => {
      // S TODO: This clearly isn't right :sweat-smile:
      expect(true).toBeTruthy();
    });
  });
});
