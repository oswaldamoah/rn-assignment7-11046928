import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const Product = ({ product, addToCart }) => {
  const navigation = useNavigation(); // Use useNavigation hook to get navigation object

  const viewProductDetails = () => {
    navigation.navigate('ProductDetails', { product, addToCart });
  };

  return (
    <TouchableOpacity 
      style={styles.productContainer}
      onPress={viewProductDetails}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.title}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => addToCart(product)}>
        <Icon name="add-circle" size={24} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    position: 'relative',
    width: '48%',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  productInfo: {
    marginTop: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Product;
