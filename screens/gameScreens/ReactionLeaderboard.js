import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ReactionLeaderboard = ({ route, navigation }) => {
  const { reactionTimes } = route.params;
  const { players } = route.params;

  const sortedTimes = [...reactionTimes].sort((a, b) => a.time - b.time);

  return (
    <LinearGradient
      colors={["#003601", "#FA922F"]} // Example gradient colors
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <Text style={styles.header}>Reaction Time Leaderboard</Text>
          {sortedTimes.map((player, index) => (
            <View key={index} style={styles.resultRow}>
              <Text style={styles.playerRank}>{index + 1}</Text>
              <Text style={styles.playerName}>{player.name}</Text>
              <Text style={styles.playerTime}>{player.time} ms</Text>
            </View>
          ))}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("CaptionGameIntro", {
                players: players,
              });
            }}
          >
            <Text style={styles.buttonText}>Next Round</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playAgainButton} // Create a new style for this if you want different styling than the next round button
            onPress={() => {
              navigation.navigate("ReactionGameIntro", {
                players: players,
              }); // Make sure "ReactionGameIntro" is the correct name of your route
            }}
          >
            <Text style={styles.playAgainButtonText}>Play Again!</Text>
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
  },
  header: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Papyrus-Condensed",
    color: "white",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  playerRank: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
    fontFamily: "Noteworthy-Light",
  },
  playerName: {
    fontSize: 18,
    color: "white",
    fontFamily: "Noteworthy-Light",
  },
  playerTime: {
    fontSize: 18,
    color: "white",
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
    alignSelf: "center",
    position: "absolute", // Position the button absolutely relative to its parent container
    top: 600, // Adjust this value as needed to position the button at the desired distance from the bottom
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
  gif: {
    width: "100%",
    height: 250,
    bottom: 100,
  },
  playAgainButton: {
    backgroundColor: "#FFFFFF", // Example blue background
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
    alignSelf: "center",
    marginTop: 20, // Add space between this and the next round button
    top: 80,
  },

  playAgainButtonText: {
    color: "#FA922F",
    fontSize: 22,
    fontFamily: "Noteworthy-Light",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ReactionLeaderboard;
