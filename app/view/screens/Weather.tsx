import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedGradient, * as GradientBackground from '../components/GradientBackground';
import * as Text from '../styles/TextStyles';
import * as actions from "../../redux/actions";
import { WeatherState } from '../../redux/reducers';
import Selector from '../components/Selector';
import moment from 'moment'
import RainySvg from '../../assets/svg/RainySvg'
import SunnySvg from '../../assets/svg/SunnySvg'
import StormySvg from '../../assets/svg/StormySvg'
import MistySvg from '../../assets/svg/MistySvg'

function getFormattedHour(hour: number) {
    return moment().startOf('day').add(hour, 'hour').format('HH:mm')
}

function getFormattedDay(day: number) {
    return moment().startOf('week').add(day, 'day').format('ddd')
}

function getFormatedBackgroundGradient(weather: 'rainy' | 'sunny' | 'stormy' | 'misty') {
    switch (weather) {
        case "misty":
            return { ...GradientBackground.Misty }
        case "stormy":
            return { ...GradientBackground.Stormy }
        case "sunny":
            return { ...GradientBackground.Sunny }
        default:
            return { ...GradientBackground.Rainy }
    }
}

function getWeatherIcon(weather: 'rainy' | 'sunny' | 'stormy' | 'misty') {
    switch (weather) {
        case "misty":
            return <MistySvg />
        case "stormy":
            return <StormySvg />
        case "sunny":
            return <SunnySvg />
        default:
            return <RainySvg />
    }
}

function getWeatherStateText(weather: 'rainy' | 'sunny' | 'stormy' | 'misty') {
    switch (weather) {
        case "misty":
            return "MIST"
        case "stormy":
            return "STORM"
        case "sunny":
            return "SUNNY"
        default:
            return "RAIN"
    }
}

export default function WeatherScreen() {
    const dispatch = useDispatch()
    const weather = useSelector<WeatherState, WeatherState>((state) => state);

    const changeHour = (upwards: boolean) => {
        dispatch(actions.changeHour(upwards))
    }

    const changeDay = (upwards: boolean) => {
        dispatch(actions.changeDay(upwards))
    }

    return (
        <View style={styles.fullView}>
            <AnimatedGradient {...getFormatedBackgroundGradient(weather.weather)} />
            <SafeAreaView style={styles.content}>
                <View style={[styles.fullView, styles.contentGroup]}>
                    <Text.Title>Weather</Text.Title>
                    <Selector isVertical={false} onDecrease={() => { }} onIncrease={() => { }} blockDecrease={true} blockIncrease={true}>
                        <Text.City>{weather.city}</Text.City>
                    </Selector>
                </View>
                <View style={[styles.fullView, { ...styles.contentGroup, flexDirection: "row" }]}>
                    {getWeatherIcon(weather.weather)}
                    <View style={{ width: 50 }} />
                    <Selector isVertical={true} onDecrease={() => { changeHour(false) }} onIncrease={() => { changeHour(true) }} blockDecrease={(weather.hour || 0) <= 0} blockIncrease={(weather.hour || 0) >= 23}>
                        <Text.Selection>{getFormattedHour(weather.hour || 0)}</Text.Selection>
                    </Selector>
                </View>
                <View style={[styles.fullView, styles.contentGroup]}>
                    <Text.Temperature>{weather.temperature}℃</Text.Temperature>
                    <Text.Description>{getWeatherStateText(weather.weather)}</Text.Description>
                </View>
                <View style={[styles.fullView, styles.contentGroup]}>
                    <Text.TemperatureRange>22/26℃</Text.TemperatureRange>
                    <Selector isVertical={false} onDecrease={() => { changeDay(false) }} onIncrease={() => { changeDay(true) }} blockDecrease={(weather.day || 0) <= 0} blockIncrease={(weather.day || 0) >= 6}>
                        <Text.Selection>{getFormattedDay((weather.day || 0) + 1)}</Text.Selection>
                    </Selector>
                </View>
            </SafeAreaView>
        </View>
    );
}
const styles = StyleSheet.create({
    fullView: {
        flex: 1,
    },
    content: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        flexDirection: "column"
    },
    contentGroup: {
        justifyContent: "center",
        alignItems: "center"
    }
});