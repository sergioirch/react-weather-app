import { createStore } from "redux";
import weatherReducer, { WeatherState } from "../reducers";

export default function configureStore(initialState: WeatherState) {
  const store = createStore(
    weatherReducer,
    initialState
  );

  return { store };
}