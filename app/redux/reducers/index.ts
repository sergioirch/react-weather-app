import { WeatherAction, CHANGE_HOUR, CHANGE_DAY, CHANGE_CITY, GET_CITIES, GET_WEATHER_INFO, RECEIVE_CITIES, RECEIVE_WEATHER_INFO, receiveCities } from "../actions";

export const weatherReducer = (
  state: WeatherState,
  action: WeatherAction
): WeatherState => {
  switch (action.type) {
    case CHANGE_DAY:
      let newDay = state.day || 0
      action.forward ? newDay++ : newDay--
      return { ...state, day: newDay }
    case CHANGE_HOUR:
      let newHour = state.hour || 0
      action.forward ? newHour++ : newHour--
      return { ...state, hour: newHour }
    case CHANGE_CITY:
      let newCityIndex = state.cityIndex
      action.forward ? newCityIndex++ : newCityIndex--
      return { ...state, cityIndex: newCityIndex }
    case RECEIVE_CITIES:
      if (state.cityIndex == -1) {
        return { ...state, cities: action.cities, cityIndex: 0 }
      } else {
        return { ...state, cities: action.cities }
      }
    case RECEIVE_WEATHER_INFO:
      let dailyWeather = action.weatherInfo.daily.map((dayWeather: any) => {
        return {
          weatherType: getWeatherTypeFrom(dayWeather.weather[0].icon),
          temperature: dayWeather.temp.day,
          max: dayWeather.temp.max,
          min: dayWeather.temp.min,
          description: dayWeather.weather[0].main
        }
      })
      return { ...state, daily: dailyWeather, day: 0 }
    default:
      return { ...state };
  }
};

export default weatherReducer;

export type WeatherState = {
  daily: { weatherType: WeatherType, temperature: number, max: number, min: number, description: string }[]
  cities: string[]
  cityIndex: number
  hour?: number
  day?: number
};

export enum WeatherType {
  Rainy,
  Sunny,
  Stormy,
  Misty,
}

function getWeatherTypeFrom(icon: string) {
  switch (icon) {
    case "50d":
      return WeatherType.Misty
    case "11d":
    case "13d":
      return WeatherType.Stormy
    case "01d":
    case "02d":
    case "03d":
      return WeatherType.Sunny
    case "04d":
    case "09d":
    case "10d":
    default:
      return WeatherType.Rainy
  }
}