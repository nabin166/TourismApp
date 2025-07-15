import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Homepage</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0, // use this instead of marginBottom: 'auto'
    width: '100%', // optional for full-width container
  },
  text: {
    
   
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 1,
    color: 'black',
    backgroundColor: 'white',
    textAlign: 'center',
    padding: 50,
  },
});

export default HomePage;
