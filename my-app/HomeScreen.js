import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Product from './Product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartItems = await AsyncStorage.getItem('cart');
        if (cartItems) {
          setCart(JSON.parse(cartItems));
        } else {
          setCart([]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadCart();
  }, []);

  const addToCart = async (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    let updatedCart;

    if (existingProductIndex > -1) {
      updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const viewProductDetails = (product) => {
    navigation.navigate('ProductDetails', { product, addToCart });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.logo}>
          <Image source={require('./assets/Logo.png')} />
        </TouchableOpacity>
        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.icon} onPress={() => { /* No functionality */ }}>
            <Icon name="search" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('CartScreen')}>
            <Icon name="shopping-bag" size={28} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.storyHeader}>
        <Text style={styles.storyText}>OUR STORY</Text>
        <View style={styles.storyIcons}>
          <TouchableOpacity onPress={() => { /* No functionality */ }}>
            <Icon name="view-list" size={28} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { /* No functionality */ }}>
            <Icon name="filter-list" size={28} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Product product={item} addToCart={addToCart} viewProductDetails={viewProductDetails} />
        )}
        contentContainerStyle={styles.productList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    resizeMode: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  storyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  storyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  storyIcons: {
    flexDirection: 'row',
  },
  productList: {
    justifyContent: 'space-between',
    padding: 10,
  },
});

export default HomeScreen;
