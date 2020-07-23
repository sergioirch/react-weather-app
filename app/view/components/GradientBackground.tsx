import React, { useRef, useState, useEffect } from "react"
import { LinearGradient } from 'expo-linear-gradient';
import { Animated, View, Image, ImageSourcePropType, StyleSheet } from "react-native";
import RainySvg from '../../assets/svg/RainySvg'
import SunnySvg from '../../assets/svg/SunnySvg'
import StormySvg from '../../assets/svg/StormySvg'
import MistySvg from '../../assets/svg/MistySvg'

export type BackgroundInfo = {
    type: string
    startColor: string
    endColor: string
}

const RainyType = "Rainy"
const SunnyType = "Sunny"
const StormyType = "Stormy"
const MistyType = "Misty"

export const Rainy = { type: RainyType, startColor: '#053D75', endColor: '#0098B1' }
export const Sunny = { type: SunnyType, startColor: '#E36550', endColor: '#ECBB69' }
export const Stormy = { type: StormyType, startColor: '#065963', endColor: '#E2EEA4' }
export const Misty = { type: MistyType, startColor: '#B9C6D6', endColor: '#79838D' }

class GradientHelper extends React.Component<BackgroundInfo> {
    render() {
        const {
            startColor,
            endColor
        } = this.props;
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

const GradientTransient = ({ startColor, endColor, type }: BackgroundInfo) => {
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
                {
                    GetBackgroundSvg(type)
                }
            </View>
        </View>
    );
}

function GetBackgroundSvg(type: string) {
    switch (type) {
        case SunnyType:
            return <SunnySvg width={846.7} height={847.5} color="#1E212A" opacity={0.1} />
        case StormyType:
            return <StormySvg width={707.68} height={697.45} color="#1E212A" opacity={0.1} />
        case MistyType:
            return <MistySvg width={780.2} height={585.15} color="#1E212A" opacity={0.1} />
        default:
            return <RainySvg width={624.53} height={624.5} color="#1E212A" opacity={0.1} />
    }
}

export default GradientTransient

const styles = StyleSheet.create({
    layout: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
