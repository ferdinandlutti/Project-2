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

export default function CaptionLeaderboardScreen({ route, navigation }) {
  const { captions, players, votes } = route.params;

  const sortedCaptions = captions
    .map((caption, index) => ({
      ...caption,
      votes: votes[index],
    }))
    .sort((a, b) => b.votes - a.votes);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={["#6DD5FA", "#FFFFFF"]} style={styles.fullScreen}>
        <Text style={styles.header}>Caption Game Leaderboard</Text>
        <ScrollView style={styles.container}>
          {sortedCaptions.map((caption, index) => (
            <View key={index} style={styles.captionContainer}>
              <Text style={styles.captionText}>
                “{caption.text}” - {caption.votes} votes
              </Text>
              <Text style={styles.playerText}>
                Submitted by: {players[caption.playerIndex]}
              </Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("HeadToHeadIntro", {
              players: players,
            })
          }
        >
          <Text style={styles.buttonText}>Head To Head Battle</Text>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginVertical: 20,
  },
  captionContainer: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  captionText: {
    fontSize: 16,
    color: "#333",
  },
  playerText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#6DD5FA",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
