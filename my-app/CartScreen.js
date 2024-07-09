import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart from AsyncStorage
    const loadCart = async () => {
      try {
        const cartItems = await AsyncStorage.getItem('cart');
        if (cartItems) {
          setCart(JSON.parse(cartItems));
        }
      } catch (error) {
        console.log('Error loading cart:', error);
      }
    };

    loadCart();
  }, []);

  const removeFromCart = async (product) => {
    try {
      const existingProductIndex = cart.findIndex((item) => item.id === product.id);
      let updatedCart;

      if (existingProductIndex > -1) {
        const existingProduct = cart[existingProductIndex];

        if (existingProduct.quantity > 1) {
          // Decrease quantity by 1
          updatedCart = cart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
          );
        } else {
          // Remove product if quantity is 1
          updatedCart = cart.filter(item => item.id !== product.id);
        }

        setCart(updatedCart);
        await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      }
    } catch (error) {
      console.log('Error removing product:', error);
    }
  };

  const renderCartItem = (item) => (
    <View key={item.id} style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>✖</Text>
      </TouchableOpacity>
    </View>
  );

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Shopping Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        cart.map(renderCartItem)
      )}
      {cart.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalAmount}>${calculateTotal().toFixed(2)}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    color: '#333',
    marginBottom: 5,
  },
  itemQuantity: {
    color: '#777',
  },
  removeButton: {
    padding: 5,
    marginLeft: 'auto',
  },
  removeButtonText: {
    color: 'red',
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
