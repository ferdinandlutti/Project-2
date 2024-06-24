import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ChooseGameScreen = ({ navigation, route }) => {
  const { players } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose a Game</Text>
      {/* List of games, can be dynamically generated based on available games */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CaptionGameIntro", { players })}
      >
        <Text style={styles.buttonText}>Caption Game 🙌 </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("HeadToHeadIntro", { players })}
      >
        <Text style={styles.buttonText}>Head 2 Head</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ReactionGameIntro", { players })}
      >
        <Text style={styles.buttonText}>Reaction Game</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MargreteskaalIntro", { players })}
      >
        <Text style={styles.buttonText}>Margreteskål</Text>
      </TouchableOpacity>
      {/* Add more games as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FA922F",
    width: "80%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default ChooseGameScreen;
