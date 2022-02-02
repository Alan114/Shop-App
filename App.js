import React from "react";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/products";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import ProductsOverviewScreen from "./screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "./screens/shop/ProductDetailScreen";
import Colors from "./constants/Colors";

const rootReducer = combineReducers({
  products: productsReducer,
});

const store = createStore(rootReducer);

const Stack = createNativeStackNavigator();

export default function App() {
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
              fontFamily: "monospace",
              fontWeight: "bold",
              fontSize: 26,
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={ProductsOverviewScreen}
            options={{
              title: "Products Overview",
            }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailScreen}
            options={({ route }) => ({ title: route.params.productTitle })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
