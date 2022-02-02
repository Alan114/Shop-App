import React from "react";
import { View, Text, Button } from "react-native";

const ProductDetailScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("ProductDetails")}
      />
    </View>
  );
};

export default ProductDetailScreen;
