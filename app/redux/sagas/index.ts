import * as Actions from '../actions'
import {
    all,
    call,
    fork,
    put,
    takeLatest,
} from "redux-saga/effects";
import * as api from "../../data/services";
import { local } from "../../data/local";

export function* getCities() {
    const cities = yield call(local.getCities)
    yield put(Actions.receiveCities(cities));
}

export function* getWeather(action: Actions.GetWeatherInfoAction) {
    const coordinates = yield call(api.getCityCoordinates, action.city)
    const weather = yield call(api.getWeather, coordinates.lat, coordinates.lon);
    yield put(Actions.receiveWeatherInfo(weather));
}

export function* watchGetCities() {
    yield takeLatest(Actions.GET_CITIES, getCities)
}

export function* watchGetWeather() {
    yield takeLatest(Actions.GET_WEATHER_INFO, getWeather)
}

export default function* root() {
    yield all([
        fork(watchGetWeather),
        fork(watchGetCities)
    ])
}
