import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={{ uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2Yozu1OVdpjAzTs-4kzSeVy1YfLzXmqU3CiuVn8s-GzAB5az1ciRyTNDFHW1O4RTG93Y&usqp=CAU' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>🌍 Book Your Next Adventure!</Text>
        <Text style={styles.subtitle}>Flights | Movies | Events | Hotels</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Search')}>
          <Text style={styles.buttonText}>Start Booking ✈️</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: '#00008B',
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#B0C4DE',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HomeScreen;
