import React from "react";
import { StatusBar } from "expo-status-bar";
import image2 from "../assets/images/imagefriends.png";
import image1 from "../assets/images/background-image.png";

import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Register({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#F5C27A", "#FA922F"]} style={styles.container}>
        <View style={styles.container}>
          <Image source={image1} style={styles.image} />

          <Text style={styles.header}>Register Players</Text>
          <Text style={styles.text}>
            First, we have to register all players that will be playing!
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register Player")}
        >
          <Text style={styles.buttonText}>OK</Text>
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
    width: "100%",
    height: 250,
    borderRadius: 20,
    opacity: 0.6,
    bottom: 100,
  },
  header: {
    fontSize: 60,
    fontFamily: "Papyrus-Condensed",
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    bottom: 100,
  },
  text: {
    fontSize: 30,
    fontFamily: "Noteworthy-Light",
    color: "#FFFFFF",
    textAlign: "center",
    margin: 20,
    bottom: 80,
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
    bottom: 80,
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
