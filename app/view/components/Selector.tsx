import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type SelectorProps = {
    onIncrease: () => void
    onDecrease: () => void
    isVertical: boolean
    children: React.ReactNode
    blockIncrease?: boolean
    blockDecrease?: boolean
};

export default function Selector(props: SelectorProps) {
    const { onIncrease, onDecrease, isVertical, children, blockIncrease, blockDecrease } = props
    return (
        <View style={{ ...styles.contentGroup, flexDirection: isVertical ? "column" : "row" }}>
            {
                (isVertical && !blockIncrease) || (!isVertical && !blockDecrease) ?
                    <TouchableOpacity onPress={isVertical ? onIncrease : onDecrease}>
                        <AntDesign name={isVertical ? "caretup" : "caretleft"} size={24} color="white" style={{ padding: 10 }} />
                    </TouchableOpacity> :
                    <AntDesign name="caretup" size={24} color="transparent" style={{ padding: 10 }} />
            }

            {children}
            {
                (isVertical && !blockDecrease) || (!isVertical && !blockIncrease) ?
                    <TouchableOpacity onPress={isVertical ? onDecrease : onIncrease}>
                        <AntDesign name={isVertical ? "caretdown" : "caretright"} size={24} color="white" style={{ padding: 10 }} />
                    </TouchableOpacity> :
                    <AntDesign name="caretup" size={24} color="transparent" style={{ padding: 10 }} />
            }

        </View>
    );
}

const styles = StyleSheet.create({
    contentGroup: {
        justifyContent: "center",
        alignItems: "center"
    }
});