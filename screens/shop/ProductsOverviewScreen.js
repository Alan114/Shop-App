import React from "react";
import { View, StyleSheet, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";

const ProductsOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName="md-cart"
            color="royalblue"
            onPress={() => props.navigation.navigate("CartScreen")}
          />
        </HeaderButtons>
      ),
    });
  }, [props.navigation]);

  return (
    <View style={styles.screen}>
      <FlatList
        data={products}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={() =>
              props.navigation.navigate("ProductDetails", {
                productId: itemData.item.id,
                productTitle: itemData.item.title,
              })
            }
            onAddToCart={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        )}
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
