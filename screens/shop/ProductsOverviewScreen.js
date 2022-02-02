import React from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useSelector } from "react-redux";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  return (
    <View style={styles.screen}>
      <FlatList
        data={products}
        renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
      />
      <Button
        title="Product Detail"
        onPress={() => props.navigation.navigate("ProductDetails")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductsOverviewScreen;
