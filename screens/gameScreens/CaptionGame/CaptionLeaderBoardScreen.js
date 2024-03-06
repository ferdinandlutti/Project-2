import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function CaptionLeaderboardScreen({ route }) {
  const { captions, players, votes } = route.params;

  const sortedCaptions = captions
    .map((caption, index) => ({
      ...caption,
      votes: votes[index],
    }))
    .sort((a, b) => b.votes - a.votes);
  return (
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
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  captionContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 20,
  },
  captionText: {
    fontSize: 16,
  },
  playerText: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 5,
  },
});
