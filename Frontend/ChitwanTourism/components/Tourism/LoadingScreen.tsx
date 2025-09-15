import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      {/* Center Image */}
      <Image
        source={require("../../assets/images/tourism-committee-logo.jpg")} // replace with your image path
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Text Below */}
      <Text style={styles.text}>Chitwan Tourism Guidebook</Text>

      {/* Optional Spinner */}
      <ActivityIndicator size="large" color="#4A90E2" style={{ marginTop: 20 }} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // you can change to dark mode e.g. "#111"
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
});
