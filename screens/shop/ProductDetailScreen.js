import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  return (
    <View style={styles.content}>
      <Text>{selectedProduct.title}</Text>
      <Button title="Back to products" onPress={() => navigation.popToTop()} />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductDetailScreen;
