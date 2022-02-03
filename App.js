import React, { useState } from "react";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Platform } from "react-native";
import ProductsOverviewScreen from "./screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "./screens/shop/ProductDetailScreen";
import Colors from "./constants/Colors";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const Stack = createNativeStackNavigator();

export default function App() {
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
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: Platform.OS === "android" ? Colors.primary : "",
            },
            headerTintColor:
              Platform.OS === "android" ? Colors.accent : Colors.primary,
            headerTitleStyle: {
              fontFamily: "open-sans-bold",
              fontSize: 26,
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={ProductsOverviewScreen}
            options={{
              title: "Products Overview",
              headerRight: () => (
                <Button
                  title="Info"
                  color="royalblue"
                  onPress={() => alert("Additional information...")}
                />
              ),
            }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailScreen}
            options={({ route }) => ({
              title: route.params.productTitle,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
