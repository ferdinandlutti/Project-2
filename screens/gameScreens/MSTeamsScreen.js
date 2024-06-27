import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const MSTeamsScreen = ({ route, navigation }) => {
  const { teams, names } = route.params;

  const handleStartGame = () => {
    navigation.navigate("MSRound1", { teams, names }); // Pass any necessary parameters
  };

  return (
    <ScrollView style={styles.container}>
      {teams.map((team, index) => {
        const { backgroundColor, textColor } = getRandomColor();
        return (
          <View key={index} style={[styles.teamContainer, { backgroundColor }]}>
            <Text style={[styles.teamHeader, { color: textColor }]}>
              Team {index + 1}
            </Text>
            {team.map((player, playerIndex) => (
              <Text
                key={playerIndex}
                style={[styles.playerName, { color: textColor }]}
              >
                {player}
              </Text>
            ))}
          </View>
        );
      })}
      <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
        <Text style={styles.startButtonText}>Start Round 1</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  teamContainer: {
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  teamHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  playerName: {
    fontSize: 18,
    marginVertical: 5,
  },
  startButton: {
    backgroundColor: "green",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 20,
  },
  startButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

const getRandomColor = () => {
  const h = Math.floor(Math.random() * 360);
  const s = 75;
  const l = 50;
  const color = `hsl(${h}, ${s}%, ${l}%)`;
  const textColor = l > 50 ? "black" : "white";
  return { backgroundColor: color, textColor };
};

export default MSTeamsScreen;
