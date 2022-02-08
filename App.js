import React, { useState } from "react";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import ordersReducer from "./store/reducers/orders";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, Platform } from "react-native";
import ProductsOverviewScreen from "./screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "./screens/shop/ProductDetailScreen";
import CartScreen from "./screens/shop/CartScreen";
import OrdersScreen from "./screens/shop/OrdersScreen";
import Colors from "./constants/Colors";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
// import { HeaderButtons, Item } from "react-navigation-header-buttons";
// import HeaderButton from "../../components/UI/HeaderButton";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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
              // headerRight: () => (
              //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
              //     <Item title="Header" iconName="md-cart" onPress={() => {}} />
              //   </HeaderButtons>
              // ),
            }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailScreen}
            options={({ route }) => ({
              title: route.params.productTitle,
            })}
          />
          <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={{
              title: "Product Cart",
            }}
          />
        </Stack.Navigator>
        {/* <Drawer.Navigator>
          <Drawer.Screen name="OrdersScreen" component={OrdersScreen} />
        </Drawer.Navigator> */}
      </NavigationContainer>
    </Provider>
  );
}
