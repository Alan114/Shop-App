import React, { useState } from "react";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider, useSelector } from "react-redux";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./screens/shop/DrawerNavigator";
import StartupScreen from "./screens/StartupScreen";
import DrawerNavigator from "./screens/shop/DrawerNavigator";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  // const isAuth = useSelector((state) => !!state.auth.token);
  // const didTryAutoLogin = useSelector((state) => state.auth.didTryAutoLogin);

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigator />
        {/* {isAuth && <DrawerNavigator />}
        {!isAuth && didTryAutoLogin && <AuthNavigator />}
        {!isAuth && !didTryAutoLogin && <StartupScreen />} */}
      </NavigationContainer>
    </Provider>
  );
}
