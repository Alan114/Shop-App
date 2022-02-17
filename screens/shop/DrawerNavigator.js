import React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import ProductsOverviewScreen from "./ProductsOverviewScreen";
import ProductDetailScreen from "./ProductDetailScreen";
import CartScreen from "./CartScreen";
import OrdersScreen from "./OrdersScreen";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen from "../user/UserProductsScreen";
import EditProductScreen from "../user/EditProductScreen";

const ProductsStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export const AdminNavigator = () => {
  return (
    <ProductsStack.Navigator>
      <ProductsStack.Screen
        name="Your Products"
        component={UserProductsScreen}
        options={{
          // headerShown: false,
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Header"
                iconName="md-create"
                onPress={() => console.log("pressed")}
              />
            </HeaderButtons>
          ),
        }}
      />
      <ProductsStack.Screen name="Edit Product" component={EditProductScreen} />
    </ProductsStack.Navigator>
  );
};

export const ProductsStackNavigator = () => {
  return (
    <ProductsStack.Navigator
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
      <ProductsStack.Screen
        name="Home"
        component={ProductsOverviewScreen}
        options={{
          title: "Products Overview",
          // headerRight: () => (
          //   <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          //     <Item
          //       title="Header"
          //       iconName="md-cart"
          //       onPress={() => console.log("pressed")}
          //     />
          //   </HeaderButtons>
          // ),
        }}
      />
      <ProductsStack.Screen
        name="ProductDetails"
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params.productTitle,
        })}
      />
      <ProductsStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: "Product Cart",
        }}
      />
    </ProductsStack.Navigator>
  );
};

const DrawerNavigator = (props) => {
  return (
    <Drawer.Navigator
      initialRouteName="Products"
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
      <Drawer.Screen
        name="Your Orders"
        component={OrdersScreen}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Products"
        component={ProductsStackNavigator}
        options={{
          headerShown: false,
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          // headerShown: false,
          headerRight: (props) => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Add"
                iconName="md-create"
                // onPress={props.navigation.navigate("Admin", {
                //   screen: "Edit Product",
                // })}
              />
            </HeaderButtons>
          ),
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
