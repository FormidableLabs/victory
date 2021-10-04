import { Platform, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  sectionHeader: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#eee",
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  sectionHeaderText: {
    fontWeight: "bold"
  },
  item: {
    backgroundColor: "#fff",
    borderBottomColor: "#ccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    ...Platform.select({
      ios: { marginLeft: 15, paddingRight: 15, paddingVertical: 15 },
      android: { padding: 15 }
    })
  },
  itemText: {
    fontSize: 16
  }
});
