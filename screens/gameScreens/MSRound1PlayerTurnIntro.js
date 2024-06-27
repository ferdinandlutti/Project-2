import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function MSRound1PlayerTurnIntro({ route, navigation }) {
  const { teams, names } = route.params;
  const firstTeam = teams[0]; // Assuming teams is an array of arrays
  const firstPlayer = firstTeam[0]; // Assuming the first player of the first team starts

  const startGame = () => {
    // Navigate to the actual game play screen
    navigation.navigate("MSRound1PlayerTurn", {
      player: firstPlayer,
      teams,
      names,
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#003601", "#FA922F"]} style={styles.gradient}>
        <Text style={styles.instructions}>
          We start with Team 1. {firstPlayer} starts.
        </Text>
        <Text style={styles.instructions}>
          Put the phone on your forehead (sideways), so the phone is laying
          horizontally.
        </Text>
        <TouchableOpacity onPress={startGame} style={styles.startButton}>
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
    padding: 10,
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
  instructions: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    marginBottom: 30,
  },
  startButton: {
    width: Dimensions.get("window").width * 0.8, // 80% of screen width
    padding: 15,
    backgroundColor: "#FA922F",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
});

export default MSRound1PlayerTurnIntro;
