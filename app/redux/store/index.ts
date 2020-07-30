import { applyMiddleware, createStore } from "redux";
import weatherReducer, { WeatherState } from "../reducers";
import createSagaMiddleware from "redux-saga";

export default function configureStore(initialState: WeatherState) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    weatherReducer,
    initialState,
    applyMiddleware(sagaMiddleware)
  );

  return { store, runSaga: sagaMiddleware.run };
}