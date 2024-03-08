import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TypingAnimation from "./assets/TypingAnimation";

const ReactionResultsScreen = ({ route, navigation }) => {
  const { reactionTimes } = route.params;
  const { players } = route.params;

  const sortedTimes = [...reactionTimes].sort((a, b) => a.time - b.time);
  const winnerName = sortedTimes[0]?.name;

  return (
    <LinearGradient
      colors={["#003601", "#FA922F"]} // Example gradient colors
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <TypingAnimation
            text={`Woow ${winnerName}, you are completely DESTROYING your opponents today!`}
            textStyle={{ fontSize: 24, color: "white" }}
          />

          <Image
            source={require("./assets/22n.gif")}
            style={styles.gif}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("ReactionLeaderboard", {
                players: players,
                reactionTimes: reactionTimes,
              });
            }}
          >
            <Text style={styles.buttonText}>See The Leaderboard</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    height: "100%",
    width: "100%",
  },
  header: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Papyrus-Condensed",
    color: "white",
    textAlign: "center",
  },
  subHeader: {
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Papyrus-Condensed",
    textAlign: "center",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
  },
  playerRank: {
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Noteworthy-Light",
  },
  playerName: {
    fontSize: 18,
    fontFamily: "Noteworthy-Light",
  },
  playerTime: {
    fontSize: 18,
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
    marginTop: 100, // Adjust spacing from the top
    alignSelf: "center", // Center the button horizontally
  },
  buttonText: {
    color: "#FA922F",
    fontSize: 18,
    fontFamily: "Noteworthy-Light",
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  gif: {
    width: "100%",
    height: 250,
    marginBottom: 20, // Add some space below the GIF
  },
});

export default ReactionResultsScreen;
