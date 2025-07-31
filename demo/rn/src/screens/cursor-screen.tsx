import * as React from 'react';
import { useState } from "react";
import { View } from 'react-native';
import { Text, VictoryBar, VictoryChart, VictoryCursorContainer } from 'victory-native';

export const CursorScreen: React.FC = () => {
    const data = [100, 76, 23, 123, 80, 90, 45, 66, 50, 85];
    const [ value, setValue ] = useState<any>(0);

    return (
        <View>
            <Text>{JSON.stringify(value) ?? '<null>'}</Text>
            <VictoryChart
                containerComponent={
                    <VictoryCursorContainer
                        onCursorChange={v => setValue(v)}
                        cursorDimension="x"
                    />
                }
            >
                <VictoryBar barRatio={1.2} data={data} />
            </VictoryChart>
        </View>
    );
}