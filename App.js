import { StyleSheet, Text, View } from "react-native";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/products";
import ProductsOverviewScreen from "./screens/shop/ProductsOverviewScreen";

const rootReducer = combineReducers({
  products: productsReducer,
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <ProductsOverviewScreen />
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
