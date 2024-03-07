import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function HeadToHeadBattleScreen({ route, navigation }) {
  const { contestants } = route.params;
  const [buttonColor, setButtonColor] = useState("grey"); // Start with neutral color
  const [gameState, setGameState] = useState("waiting"); // 'waiting', 'running', 'ended'

  useEffect(() => {
    let timerId;
    if (gameState === "running") {
      const randomizeButtonAppearance = () => {
        timerId = setTimeout(() => {
          const isRed = Math.random() < 0.5;
          setButtonColor(isRed ? "red" : "green");

          if (isRed) {
            setTimeout(() => {
              setButtonColor("grey"); // Reset to neutral color
              randomizeButtonAppearance(); // Restart the random color generator
            }, 1000); // Adjust delay for red button disappearance as needed
          }
        }, Math.random() * 2000 + 1000); // Random delay between 1 and 3 seconds for the button to appear
      };

      randomizeButtonAppearance();
    }
    return () => clearTimeout(timerId);
  }, [gameState]);

  const handlePress = (playerIndex) => {
    if (gameState !== "running") return;

    if (buttonColor === "red") {
      Alert.alert("Oops!", `${contestants[playerIndex]} loses!`);
      setGameState("ended");
    } else if (buttonColor === "green") {
      Alert.alert("Fast!", `${contestants[playerIndex]} wins!`);
      setGameState("ended");
    }
  };

  const startGame = () => {
    setGameState("running");
    setButtonColor("grey"); // Reset button color
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#003601", "#FA922F"]} style={styles.container}>
        <View style={styles.playerAreaTop}>
          <Text style={styles.playerName}>{contestants[0]}'s Side</Text>
        </View>
        {gameState === "running" && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: buttonColor }]}
            onPress={() => handlePress(0)}
            disabled={buttonColor === "grey"}
          />
        )}
        {gameState === "waiting" && (
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        )}
        {gameState === "running" && (
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: buttonColor }]}
            onPress={() => handlePress(1)}
            disabled={buttonColor === "grey"}
          />
        )}
        <View style={styles.playerAreaBottom}>
          <Text style={styles.playerName}>{contestants[1]}'s Side</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  playerAreaTop: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00360155",
  },
  playerAreaBottom: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FA922F55",
  },
  playerName: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  actionButton: {
    width: 220,
    height: 220,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  startButton: {
    backgroundColor: "grey",
    padding: 20,
    borderRadius: 10,
  },
  startButtonText: {
    color: "white",
    fontSize: 20,
  },
});

export default HeadToHeadBattleScreen;
