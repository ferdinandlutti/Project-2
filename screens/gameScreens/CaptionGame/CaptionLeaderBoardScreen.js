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
    <LinearGradient colors={["orange", "#FFFFFF"]} style={styles.fullScreen}>
      <SafeAreaView style={{ flex: 1 }}>
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() =>
              navigation.navigate("CaptionGameIntro", {
                players: players,
              })
            }
          >
            <Text style={styles.buttonText2}>Play Again!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("HeadToHeadIntro", {
                players: players,
              })
            }
          >
            <Text style={styles.buttonText}>Next Round</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Noteworthy-Light",
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
    backgroundColor: "#FFFFFF",
    width: "60%",
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: "#000",
    justifyContent: "center",
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    bottom: 50,
    margin: 40,
  },
  button2: {
    backgroundColor: "#FFFFFF",
    width: "40%",
    height: 60,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: "#000",
    justifyContent: "center",
    alignSelf: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    bottom: 40,
    margin: 40,
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
  buttonText2: {
    color: "grey",
    fontSize: 22,
    fontFamily: "Noteworthy-Light",
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
