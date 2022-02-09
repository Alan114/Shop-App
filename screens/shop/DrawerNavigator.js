import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import OrdersScreen from "./OrdersScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
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
      <Drawer.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Menu"
                iconName="md-menu"
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
