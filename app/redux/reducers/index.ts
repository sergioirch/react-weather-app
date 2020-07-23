import { WeatherAction, CHANGE_HOUR, CHANGE_DAY, GET_CITIES, GET_WEATHER_INFO } from "../actions";

const cities = ['Bogotá', 'New York', 'Munich', 'Barcelona', 'Paris']

function getRandomWeather(state: WeatherState): WeatherState {
  const randomWeather = Math.floor(Math.random() * 3);
  const randomTemperature = Math.floor(Math.random() * (20)) - 20;
  let weather: 'rainy' | 'sunny' | 'stormy' | 'misty'

  switch (randomWeather) {
    case 1:
      weather = 'sunny'
      break
    case 2:
      weather = 'stormy'
      break
    case 3:
      weather = 'misty'
      break
    default:
      weather = 'rainy'
  }
  return { ...state, temperature: randomTemperature, weather: weather, city: cities[0] }
}

export const weatherReducer = (
  state: WeatherState | undefined = { weather: 'rainy' },
  action: WeatherAction
): WeatherState => {
  console.log(state)
  state = getRandomWeather(state)
  switch (action.type) {
    case CHANGE_DAY:
      let newDay = state.day || 0
      action.forward ? newDay++ : newDay--
      return { ...state, day: newDay }
    case CHANGE_HOUR:
      let newHour = state.hour || 0
      action.forward ? newHour++ : newHour--
      return { ...state, hour: newHour }
    case GET_CITIES:
      return { ...state }
    case GET_WEATHER_INFO:
      return { ...state }
    default:
      return state;
  }
};

export default weatherReducer;

export type WeatherState = {
  city?: string,
  hour?: number,
  day?: number,
  temperature?: number,
  weather: 'rainy' | 'sunny' | 'stormy' | 'misty'
};