import React from "react";
import { StatusBar } from "expo-status-bar";
import { Alert } from "react-native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

export default function GameScreen({ navigation, route }) {
  const { players } = route.params;

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#FFC692", "#FA922F"]} style={styles.container}>
        <Text style={styles.header}>Get those drinks ready!🍹🍻</Text>

        <Image
          source={require("../assets/images/MXw.gif")}
          style={styles.gif}
          resizeMode="contain"
        />
        {players.map((player, index) => (
          <View key={index} style={styles.playerContainer}>
            <Text style={styles.playerNumber}>{index + 1}.</Text>
            <Text style={styles.playerName}>{player}</Text>
          </View>
        ))}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (players.length > 1) {
              navigation.navigate("ReactionGameIntro", {
                // FirstRoundScreen
                players: players,
              });
            } else {
              Alert.alert(
                "Not enough players",
                "Please assign at least two players before starting the game."
              );
            }
          }}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
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
  gif: {
    width: "100%",
    height: 250,
    bottom: 100,
  },
  header: {
    fontSize: 50,
    fontFamily: "Papyrus-Condensed",
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  playerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginTop: 10,
  },
  playerNumber: {
    color: "#FFFFFF",
    fontSize: 22,
    marginRight: 10,
  },
  playerName: {
    color: "#FFFFFF",
    fontSize: 22,
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
  text: {
    fontSize: 30,
    fontFamily: "Noteworthy-Light",
    color: "#FFFFFF",
    textAlign: "center",
    margin: 20,
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
