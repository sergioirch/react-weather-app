import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedGradient from '../components/GradientBackground';
import * as Text from '../styles/TextStyles';
import * as actions from "../../redux/actions";
import { WeatherState } from '../../redux/reducers';
import Selector from '../components/Selector';
import * as WeatherViewUtil from '../util'

export default function WeatherScreen() {
    const dispatch = useDispatch()
    const weather = useSelector<WeatherState, WeatherState>((state) => state);
    const weatherViewInfo = useSelector<WeatherState, WeatherViewUtil.WeatherFormattedViewInfo>((state) => WeatherViewUtil.getWeatherFormattedViewInfo(state.weatherType));

    const changeHour = React.useCallback((upwards) => {
        dispatch(actions.changeHour(upwards))
    }, []);

    const changeDay = React.useCallback((upwards) => {
        dispatch(actions.changeDay(upwards))
    }, []);

    return (
        <View style={styles.fullView}>
            <AnimatedGradient {...weatherViewInfo.background} />
            <SafeAreaView style={styles.content}>
                <View style={[styles.fullView, styles.contentGroup]}>
                    <Text.Title>Weather</Text.Title>
                    <Selector isVertical={false} onDecrease={() => { }} onIncrease={() => { }} blockDecrease={true} blockIncrease={true}>
                        <Text.City>{weather.city}</Text.City>
                    </Selector>
                </View>
                <View style={[styles.fullView, { ...styles.contentGroup, flexDirection: "row" }]}>
                    {weatherViewInfo.icon}
                    <View style={{ width: 50 }} />
                    <Selector isVertical={true} onDecrease={() => { changeHour(false) }} onIncrease={() => { changeHour(true) }} blockDecrease={(weather.hour || 0) <= 0} blockIncrease={(weather.hour || 0) >= 23}>
                        <Text.Selection>{WeatherViewUtil.getFormattedHour(weather.hour || 0)}</Text.Selection>
                    </Selector>
                </View>
                <View style={[styles.fullView, styles.contentGroup]}>
                    <Text.Temperature>{weather.temperature}℃</Text.Temperature>
                    <Text.Description>{weatherViewInfo.text}</Text.Description>
                </View>
                <View style={[styles.fullView, styles.contentGroup]}>
                    <Text.TemperatureRange>22/26℃</Text.TemperatureRange>
                    <Selector isVertical={false} onDecrease={() => { changeDay(false) }} onIncrease={() => { changeDay(true) }} blockDecrease={(weather.day || 0) <= 0} blockIncrease={(weather.day || 0) >= 6}>
                        <Text.Selection>{WeatherViewUtil.getFormattedDay((weather.day || 0) + 1)}</Text.Selection>
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
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        flexDirection: "column"
    },
    contentGroup: {
        justifyContent: "center",
        alignItems: "center"
    }
});