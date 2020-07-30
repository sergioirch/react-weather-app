import Constants from "expo-constants";

const API_ROOT = Constants.manifest.extra?.API_ROOT
const WEATHER_API_KEY = Constants.manifest.extra?.WEATHER_API_KEY

export function getWeather(lat: number, lng: number) {
    const url = encodeURI(`${API_ROOT}/onecall?appid=${WEATHER_API_KEY}&lat=${lat}&lon=${lng}&units=metric`);
    console.log(url)
    return fetch(url)
        .then((response) => {
            if (!response.ok) return Promise.reject(response);
            return response.json()
        })
        .then(
            (json) => (json),
            (error) => ({ error: error.message || "Something bad happened" })
        )
}

export function getCityCoordinates(city: string) {
    const url = encodeURI(`${API_ROOT}/weather?appid=${WEATHER_API_KEY}&q=${city}`)
    console.log(url)
    return fetch(url)
        .then((response) => {
            if (!response.ok) return Promise.reject(response);
            return response.json()
        })
        .then(
            (json) => {
                return ({ lon: json.coord.lon, lat: json.coord.lat })
            },
            (error) => ({ error: error.message || "Something bad happened" })
        )
}