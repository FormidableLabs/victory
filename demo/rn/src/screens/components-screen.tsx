import * as React from "react";
import {
  ListRenderItem,
  Platform,
  SectionList,
  SectionListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles/container-view-styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackNavigatorParams } from "../navigation-config";

export const ComponentsScreen: React.FC = () => {
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackNavigatorParams>>();

  const renderItem = React.useCallback<
    SectionListRenderItem<DataItem, SectionItem>
  >(({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // @ts-ignore
          rootNavigation.navigate(item.key);
        }}
      >
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.title}</Text>
          {/*{Platform.select({ ios: <ChevronIcon /> })}*/}
        </View>
      </TouchableOpacity>
    );
  }, []);

  const renderSectionHeader = React.useCallback(
    ({ section }: { section: SectionItem }) => {
      return (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
      );
    },
    [],
  );

  return (
    <SectionList
      style={styles.container}
      sections={sections}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
    />
  );
};

type DataItem = { key: string; title: string };
type SectionItem = {
  title: string;
  data: DataItem[];
};

const sections: SectionItem[] = [
  {
    data: [
      { key: "Pie", title: "VictoryPie" },
      { key: "Chart", title: "VictoryChart" },
      { key: "Line", title: "VictoryLine" },
      { key: "Area", title: "VictoryArea" },
      { key: "Bar", title: "VictoryBar" },
      { key: "Histogram", title: "VictoryHistogram" },
      { key: "Scatter", title: "VictoryScatter" },
      { key: "BoxPlot", title: "VictoryBoxPlot" },
      { key: "ErrorBar", title: "VictoryErrorBar" },
      { key: "Voronoi", title: "VictoryVoronoi" },
      { key: "BrushLine", title: "VictoryBrushLine" },
    ],
    title: "Charts",
  },
  // {
  //   data: [
  //     { key: "ContainersView", title: "Built–in Containers" },
  //     { key: "CreateContainerView", title: "Custom Containers" }
  //   ],
  //   title: "Containers"
  // },
  {
    data: [
      { key: "Legends", title: "Legends" },
      { key: "Axis", title: "Axis" },
      { key: "PolarAxis", title: "VictoryPolarAxis" },
      // { key: "ErrorsTooltipsView", title: "Errors & Tooltips" }
    ],
    title: "Other",
  },
];
