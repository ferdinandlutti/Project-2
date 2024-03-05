import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
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
          <Text style={styles.subHeader}>Reaction Time Leaderboard</Text>
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
              navigation.navigate("secondRoundScreen", {
                players: players,
              });
            }}
          >
            <Text style={styles.buttonText}>Next Round</Text>
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
  },
  subHeader: {
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Papyrus-Condensed",
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
  gif: {
    width: "100%",
    height: 250,
    bottom: 100,
  },
});

export default ReactionLeaderboard;