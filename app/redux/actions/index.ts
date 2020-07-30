export const CHANGE_HOUR = "CHANGE_HOUR";
export const CHANGE_DAY = "CHANGE_DAY";
export const GET_CITIES = "GET_CITIES";
export const GET_WEATHER_INFO = "GET_WEATHER_INFO";

export type ChangeHourAction = {
  type: typeof CHANGE_HOUR
  forward: boolean
};

export type ChangeDayAction = {
  type: typeof CHANGE_DAY
  forward: boolean
};

export type GetCitiesAction = {
  type: typeof GET_CITIES
};

export type GetWeatherInfoAction = {
  type: typeof GET_WEATHER_INFO
  city: string
};

export type WeatherAction =
  | ChangeHourAction
  | ChangeDayAction
  | GetCitiesAction
  | GetWeatherInfoAction;

export const changeHour = (forward: boolean): ChangeHourAction => {
    return { type: CHANGE_HOUR, forward }
}
export const changeDay = (forward: boolean): ChangeDayAction => {
    return { type: CHANGE_DAY, forward }
}
export const getCities = (): GetCitiesAction => {
    return { type: GET_CITIES }
}
export const getWeatherInfo = (city: string): GetWeatherInfoAction => {
    return { type: GET_WEATHER_INFO, city }
}