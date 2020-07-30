import React from 'react';
import { WeatherType } from '../../redux/reducers'
import * as GradientBackground from '../components/GradientBackground';
import RainySvg from '../../assets/svg/RainySvg'
import SunnySvg from '../../assets/svg/SunnySvg'
import StormySvg from '../../assets/svg/StormySvg'
import MistySvg from '../../assets/svg/MistySvg'
import moment from 'moment'

export type WeatherFormattedViewInfo = {
    background: GradientBackground.BackgroundInfo,
    icon: JSX.Element,
    text: string
}

export function getWeatherFormattedViewInfo(weather: WeatherType): WeatherFormattedViewInfo {
    switch (weather) {
        case WeatherType.Misty:
            return { background: GradientBackground.Misty, icon: <MistySvg />, text: "MIST" }
        case WeatherType.Stormy:
            return { background: GradientBackground.Stormy, icon: <StormySvg />, text: "STORM" }
        case WeatherType.Sunny:
            return { background: GradientBackground.Sunny, icon: <SunnySvg />, text: "SUNNY" }
        case WeatherType.Rainy:
            return { background: GradientBackground.Rainy, icon: <RainySvg />, text: "RAIN" }
    }
}

export function getFormattedHour(hour: number) {
    return moment().startOf('day').add(hour, 'hour').format('HH:mm')
}

export function getFormattedDay(day: number) {
    return moment().startOf('week').add(day, 'day').format('ddd')
}