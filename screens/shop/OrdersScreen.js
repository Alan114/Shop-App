import React from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <View>
      <FlatList
        data={orders}
        renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>}
      />
    </View>
  );
};

export default OrdersScreen;
