import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/HeaderButton";
import { DrawerActions } from "@react-navigation/native";
import Colors from "../../constants/Colors";

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("focus", () => {
      loadProducts();
    });
    return willFocusSub;
  }, [loadProducts]);

  useEffect(() => {
    loadProducts();
  }, [dispatch, loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetails", {
      productId: id,
      productTitle: title,
    });
  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName="md-menu"
            onPress={() =>
              props.navigation.dispatch(DrawerActions.toggleDrawer())
            }
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            onPress={() => props.navigation.navigate("CartScreen")}
          />
        </HeaderButtons>
      ),
    });
  }, [props.navigation]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={products}
        renderItem={(itemData) => (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() =>
              selectItemHandler(itemData.item.id, itemData.item.title)
            }
          >
            <Button
              color={Colors.primary}
              title="View Details"
              onPress={() =>
                selectItemHandler(itemData.item.id, itemData.item.title)
              }
            />
            <Button
              color={Colors.primary}
              title="To Cart"
              onPress={() => {
                dispatch(cartActions.addToCart(itemData.item));
              }}
            />
          </ProductItem>
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductsOverviewScreen;
