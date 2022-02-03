import React from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";
import Colors from "../../constants/Colors";

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View style={styles.content}>
        <Image
          source={{ uri: selectedProduct.imageUrl }}
          style={styles.image}
        />
        <Button
          title="Add to Cart"
          color={Colors.primary}
          onPress={() => dispatch(cartActions.addToCart(selectedProduct))}
        />
        <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 300,
    marginVertical: 25,
  },
  price: {
    marginVertical: 20,
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: "#888",
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 16,
    marginHorizontal: 30,
    textAlign: "center",
  },
});

export default ProductDetailScreen;
