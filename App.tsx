import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Navigation from "./app/view/navigation";
import React from "react";
import useCachedResources from "./app/view/hooks/useCachedResources";
import configureStore from "./app/redux/store";
import { Provider as StoreProvider } from "react-redux";
import { WeatherType } from "./app/redux/reducers";
import rootSaga from "./app/redux/sagas";
import moment from 'moment'




const { store, runSaga } = configureStore({ weatherType: WeatherType.Rainy, cities: [], cityIndex: -1 });
runSaga(rootSaga);

export default function App() {
  const isLoadingComplete = useCachedResources()

  return !isLoadingComplete ? null : (
    <StoreProvider store={store}>
      <SafeAreaProvider>
        <Navigation />
        <StatusBar style="light" />
      </SafeAreaProvider>
    </StoreProvider>
  );
}