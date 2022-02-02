import { StyleSheet, Text, View } from "react-native";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/products";
import ProductsOverviewScreen from "./screens/shop/ProductsOverviewScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const rootReducer = combineReducers({
  products: productsReducer,
});

const store = createStore(rootReducer);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={ProductsOverviewScreen} />
          {/* <ProductsOverviewScreen /> */}
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
