import { StyleSheet, Text, View } from "react-native";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/products";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={ProductsOverviewScreen}
            options={{
              title: "Products Overview",
              headerStyle: {
                backgroundColor: Colors.primary,
              },
              headerTintColor: Colors.accent,
              headerTitleStyle: {
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: 26,
              },
            }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailScreen}
            options={{
              title: "Product details",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
  },
});
