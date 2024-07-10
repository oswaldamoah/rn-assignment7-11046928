// Menu.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Menu = ({ navigation }) => {
  const menuItems = [
    { title: 'Store', screen: 'StoreScreen' },
    { title: 'Locations', screen: 'LocationsScreen' },
    { title: 'Blog', screen: 'BlogScreen' },
    { title: 'Jewelry', screen: 'JewelryScreen' },
    { title: 'Electronic', screen: 'ElectronicScreen' },
    { title: 'Clothing', screen: 'ClothingScreen' },
  ];

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => { /* No functionality */ }}
        >
          <Text style={styles.menuItem}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default Menu;
