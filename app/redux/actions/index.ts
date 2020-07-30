
export const CHANGE_HOUR = "CHANGE_HOUR";
export const CHANGE_DAY = "CHANGE_DAY";
export const CHANGE_CITY = "CHANGE_CITY";
export const GET_CITIES = "GET_CITIES";
export const GET_WEATHER_INFO = "GET_WEATHER_INFO";
export const RECEIVE_WEATHER_INFO = "RECEIVE_WEATHER_INFO";
export const RECEIVE_CITIES = "RECEIVE_CITIES";

export type ChangeHourAction = {
  type: typeof CHANGE_HOUR
  forward: boolean
};

export type ChangeDayAction = {
  type: typeof CHANGE_DAY
  forward: boolean
};

export type ChangeCityAction = {
  type: typeof CHANGE_CITY
  forward: boolean
};

export type GetCitiesAction = {
  type: typeof GET_CITIES
};

export type GetWeatherInfoAction = {
  type: typeof GET_WEATHER_INFO
  city: string
};

export type ReceiveWeatherInfoAction = {
  type: typeof RECEIVE_WEATHER_INFO
  weatherInfo: any
};

export type ReceiveCitiesAction = {
  type: typeof RECEIVE_CITIES
  cities: string[]
};

export type WeatherAction =
  | ChangeHourAction
  | ChangeDayAction
  | ChangeCityAction
  | GetCitiesAction
  | GetWeatherInfoAction
  | ReceiveWeatherInfoAction
  | ReceiveCitiesAction;

export const changeHour = (forward: boolean): ChangeHourAction => {
  return { type: CHANGE_HOUR, forward }
}

export const changeDay = (forward: boolean): ChangeDayAction => {
  return { type: CHANGE_DAY, forward }
}

export const changeCity = (forward: boolean): ChangeCityAction => {
  return { type: CHANGE_CITY, forward }
}

export const getCities = (): GetCitiesAction => {
  return { type: GET_CITIES }
}

export const getWeatherInfo = (city: string): GetWeatherInfoAction => {
  return { type: GET_WEATHER_INFO, city }
}

export const receiveWeatherInfo = (weatherInfo: any): ReceiveWeatherInfoAction => {
  return { type: RECEIVE_WEATHER_INFO, weatherInfo }
}

export const receiveCities = (cities: string[]): ReceiveCitiesAction => {
  return { type: RECEIVE_CITIES, cities }
}