import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedGradient from '../components/GradientBackground';
import * as Text from '../styles/TextStyles';
import * as actions from "../../redux/actions";
import { WeatherState, WeatherType } from '../../redux/reducers';
import Selector from '../components/Selector';
import * as WeatherViewUtil from '../util'

export default function WeatherScreen() {
    const dispatch = useDispatch()
    const weather = useSelector<WeatherState, WeatherState>((state) => state);
    const weatherViewInfo = useSelector<WeatherState, WeatherViewUtil.WeatherFormattedViewInfo>((state) => {
        let weatherType: WeatherType
        try {
            weatherType = state.daily[(state.day || 0)].weatherType
        } catch (error) {
            weatherType = WeatherType.Rainy
        }
        return WeatherViewUtil.getWeatherFormattedViewInfo(weatherType)
    });
    const temperature = useSelector<WeatherState, number>((state) => {
        try {
            return Math.round(state.daily[(state.day || 0)].temperature)
        } catch (error) {
            return 0
        }
    });
    const weatherDesc = useSelector<WeatherState, string>((state) => {
        try {
            return state.daily[(state.day || 0)].description.toUpperCase()
        } catch (error) {
            return ""
        }
    });

    const minMax = useSelector<WeatherState, string>((state) => {
        try {
            const dayWeather = state.daily[(state.day || 0)]
            const min = Math.round(dayWeather.min)
            const max = Math.round(dayWeather.max)
            return `${min}/${max}℃`
        } catch (error) {
            return ""
        }
    });

    const changeHour = React.useCallback((upwards) => {
        dispatch(actions.changeHour(upwards))
    }, []);

    const changeDay = React.useCallback((upwards) => {
        dispatch(actions.changeDay(upwards))
    }, []);

    const changeCity = React.useCallback((upwards) => {
        dispatch(actions.changeCity(upwards))
    }, []);

    useEffect(() => {
        dispatch(actions.getCities())
    }, [])

    useEffect(() => {
        let cityName = weather.cities[weather.cityIndex]
        if (cityName)
            dispatch(actions.getWeatherInfo(cityName))
    }, [weather.cityIndex])

    return (
        <View style={styles.fullView}>
            <AnimatedGradient {...weatherViewInfo.background} />
            <SafeAreaView style={styles.content}>
                <View style={[styles.fullView, styles.contentGroup]}>
                    <Text.Title>Weather</Text.Title>
                    <Selector isVertical={false} onDecrease={() => { changeCity(false) }} onIncrease={() => { changeCity(true) }} blockDecrease={weather.cityIndex <= 0} blockIncrease={weather.cityIndex >= weather.cities.length - 1}>
                        <Text.City>{weather.cities[weather.cityIndex]}</Text.City>
                    </Selector>
                </View>
                <View style={[styles.fullView, { ...styles.contentGroup, flexDirection: "row" }]}>
                    {weatherViewInfo.icon}
                    {/* <View style={{ width: 50 }} />
                    <Selector isVertical={true} onDecrease={() => { changeHour(false) }} onIncrease={() => { changeHour(true) }} blockDecrease={(weather.hour || 0) <= 0} blockIncrease={(weather.hour || 0) >= 23}>
                        <Text.Selection>{WeatherViewUtil.getFormattedHour(weather.hour || 0)}</Text.Selection>
                    </Selector> */}
                </View>
                <View style={[styles.fullView, styles.contentGroup]}>
                    <Text.Temperature>{temperature}℃</Text.Temperature>
                    <Text.Description>{weatherDesc}</Text.Description>
                </View>
                <View style={[styles.fullView, styles.contentGroup]}>
                    <Text.TemperatureRange>{minMax}</Text.TemperatureRange>
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