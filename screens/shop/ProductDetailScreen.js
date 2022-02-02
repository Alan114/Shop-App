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
      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
      <Button
        title="Update title"
        onPress={() => navigation.setOptions({ title: "Updated!" })}
      />
    </View>
  );
};

export default ProductDetailScreen;
