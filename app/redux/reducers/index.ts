import { WeatherAction, CHANGE_HOUR, CHANGE_DAY, GET_CITIES, GET_WEATHER_INFO } from "../actions";

const cities = ['Bogotá', 'New York', 'Munich', 'Barcelona', 'Paris']

function getRandomWeatherType() {
  const randomWeather = Math.floor(Math.random() * 3);
  switch (randomWeather) {
    case 1:
      return WeatherType.Sunny
    case 2:
      return WeatherType.Stormy
    case 3:
      return WeatherType.Misty
    default:
      return WeatherType.Rainy
  }
}

function getRandomTemperature() {
  return Math.floor(Math.random() * (20)) - 20
}

export const weatherReducer = (
  state: WeatherState | undefined = { weatherType: WeatherType.Rainy },
  action: WeatherAction
): WeatherState => {
  switch (action.type) {
    case CHANGE_DAY:
      let newDay = state.day || 0
      action.forward ? newDay++ : newDay--
      return { ...state, day: newDay, temperature: getRandomTemperature(), weatherType: getRandomWeatherType() }
    case CHANGE_HOUR:
      let newHour = state.hour || 0
      action.forward ? newHour++ : newHour--
      return { ...state, hour: newHour, temperature: getRandomTemperature(), weatherType: getRandomWeatherType() }
    default:
      return { ...state, temperature: getRandomTemperature(), weatherType: getRandomWeatherType() };
  }
};

export default weatherReducer;

export type WeatherState = {
  city?: string,
  hour?: number,
  day?: number,
  temperature?: number,
  weatherType: WeatherType
};

export enum WeatherType {
  Rainy,
  Sunny,
  Stormy,
  Misty,
}