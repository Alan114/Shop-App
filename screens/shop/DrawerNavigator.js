import React from "react";
import { Platform, View, Button, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import ProductsOverviewScreen from "./ProductsOverviewScreen";
import ProductDetailScreen from "./ProductDetailScreen";
import CartScreen from "./CartScreen";
import OrdersScreen from "./OrdersScreen";
import UserProductsScreen from "../user/UserProductsScreen";
import EditProductScreen from "../user/EditProductScreen";
import AuthScreen from "../user/AuthScreen";
import StartupScreen from "../StartupScreen";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const ProductsStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const AuthStack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
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
      <AuthStack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <AuthStack.Screen name="StartupScreen" component={StartupScreen} /> */}
    </AuthStack.Navigator>
  );
};

export const AdminNavigator = ({ route }) => {
  return (
    <ProductsStack.Navigator
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
        name="Your Products"
        component={UserProductsScreen}
      />
      <ProductsStack.Screen
        name="Edit Product"
        component={EditProductScreen}
        options={({ route }) => ({
          title: route.params ? "Edit Product" : "Add Product",
        })}
      />
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
      initialRouteName="Authenticate"
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
        drawerContent: (props) => {
          return (
            <DrawerContentScrollView {...props}>
              <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
                <DrawerItemList {...props} />
                <DrawerItem label="Help" />
                {/* <Button
                  title="Logout"
                  color={Colors.primary}
                  onPress={() => {}}
                /> */}
              </SafeAreaView>
            </DrawerContentScrollView>
          );
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
          headerShown: false,
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Authenticate"
        component={AuthNavigator}
        options={{
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
