import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  monospace: {
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace"
  },
  contentContainer: {
    alignItems: "center"
  },
  header: {
    fontWeight: "600",
    padding: 15,
    fontSize: 18
  }
});
