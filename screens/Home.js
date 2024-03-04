import React, { useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import image1 from "../assets/images/homeimg.jpg";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Home({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    fadeIn(); // Call fadeIn when the component mounts
  }, []);
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#FFC692", "#FA922F"]} style={styles.container}>
        <Text style={styles.header}>Welcome To</Text>
        <Image source={image1} style={styles.image} />
        <Animated.Text style={[styles.headerlogo, { opacity: fadeAnim }]}>
          Bender
        </Animated.Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Let's Get Started!</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  image: {
    width: 300,
    height: 250,
    borderRadius: 70,
    opacity: 0.8,
  },
  header: {
    fontSize: 60,
    fontFamily: "Papyrus-Condensed",
    color: "#FFFFFF",
    fontWeight: "bold",
    position: "absolute",
    top: 240,
    textAlign: "center",
  },
  headerlogo: {
    fontSize: 60,
    fontFamily: "Papyrus-Condensed",
    color: "#FFFFFF",
    fontWeight: "bold",
    position: "absolute",
    textAlign: "center",
    bottom: 200,
  },
  button: {
    backgroundColor: "#FFFFFF",
    width: "60%",
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: "#000",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    bottom: 50,
  },
  buttonText: {
    color: "#FA922F",
    fontSize: 22,
    fontFamily: "Noteworthy-Light",
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
