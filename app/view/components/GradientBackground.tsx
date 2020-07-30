import React, { useRef, useState, useEffect } from "react"
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, View, StyleSheet } from "react-native";
import RainySvg from '../../assets/svg/RainySvg'
import SunnySvg from '../../assets/svg/SunnySvg'
import StormySvg from '../../assets/svg/StormySvg'
import MistySvg from '../../assets/svg/MistySvg'
import { WeatherType } from '../../redux/reducers'

export type BackgroundInfo = {
    type: WeatherType
    startColor: string
    endColor: string
}

export const Rainy: BackgroundInfo = { type: WeatherType.Rainy, startColor: '#053D75', endColor: '#0098B1' }
export const Sunny: BackgroundInfo = { type: WeatherType.Sunny, startColor: '#E36550', endColor: '#ECBB69' }
export const Stormy: BackgroundInfo = { type: WeatherType.Stormy, startColor: '#065963', endColor: '#E2EEA4' }
export const Misty: BackgroundInfo = { type: WeatherType.Misty, startColor: '#B9C6D6', endColor: '#79838D' }

class GradientHelper extends React.Component<BackgroundInfo> {
    render() {
        const { startColor, endColor } = this.props;
        return (
            <LinearGradient
                colors={[startColor, endColor]}
                style={{ flex: 1 }}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
        );
    }
}


const AnimatedGradientHelper = Animated.createAnimatedComponent(GradientHelper);

const GradientTransient = (props: BackgroundInfo) => {
    const { startColor, endColor, type } = props
    const animation = useRef(new Animated.Value(0)).current
    const [prevColors, setPrevClors] = useState(['#000000', '#000000'])

    const color1Interp = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [prevColors[0], startColor]
    });

    const color2Interp = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [prevColors[1], endColor]
    });

    useEffect(() => {
        animation.setValue(0)
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false
        }).start(() => {
            setPrevClors([startColor, endColor])
        })
    }, [startColor, endColor])

    return (
        <View style={{ flex: 1 }}>
            <AnimatedGradientHelper
                type={type}
                startColor={color1Interp}
                endColor={color2Interp}
            />
            <View style={styles.layout}>
                {getBackgroundSvg(type)}
            </View>
        </View>
    );
}

function getBackgroundSvg(type: WeatherType) {
    switch (type) {
        case WeatherType.Sunny:
            return <SunnySvg width={846.7} height={847.5} color="#1E212A" opacity={0.1} />
        case WeatherType.Stormy:
            return <StormySvg width={707.68} height={697.45} color="#1E212A" opacity={0.1} />
        case WeatherType.Misty:
            return <MistySvg width={780.2} height={585.15} color="#1E212A" opacity={0.1} />
        case WeatherType.Rainy:
            return <RainySvg width={624.53} height={624.5} color="#1E212A" opacity={0.1} />
    }
}

export default GradientTransient

const styles = StyleSheet.create({
    layout: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
