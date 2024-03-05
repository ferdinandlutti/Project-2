import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SimpleChallenges = ({ route, navigation }) => {
  const { players } = route.params;

  // Sample list of challenges
  const challenges = [
    `${players[1]} drinks.`,
    "Play a game of categories.",
    "Everyone tells a joke, the first one to laugh drinks.",
    `${players[0]} and ${players[1]} do a dance-off.`,
    "Play rock, paper, scissors with the person to your left.",
    "Play the remembering game: Every person adds a word to a sentence and must repeat the whole sentence",
  ];

  const [currentChallenge, setCurrentChallenge] = useState("");

  const generateChallenge = () => {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    setCurrentChallenge(challenges[randomIndex]);
  };

  return (
    <LinearGradient colors={["black", "#FA922F"]} style={styles.gradient}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.bigButton} onPress={generateChallenge}>
          <Text style={styles.bigButtonText}>Generate Challenge</Text>
        </TouchableOpacity>
        <Text style={styles.challengeText}>{currentChallenge}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("CaptionGame", {
              players: players,
            });
          }}
        >
          <Text style={styles.buttonText}>Next Round</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  bigButton: {
    backgroundColor: "black",
    paddingVertical: 40,
    paddingHorizontal: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  bigButtonText: {
    color: "#003601",
    fontSize: 22,
    fontFamily: "Noteworthy-Light",

    fontWeight: "bold",
    textAlign: "center",
  },
  challengeText: {
    marginTop: 30,
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Noteworthy-Light",
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

export default SimpleChallenges;
