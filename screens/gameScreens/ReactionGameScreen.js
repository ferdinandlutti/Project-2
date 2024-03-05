import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function ReactionGameScreen({ route, navigation }) {
  const { players } = route.params;
  const [screenColor, setScreenColor] = useState("#003601");
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [reactionTimes, setReactionTimes] = useState([]);

  useEffect(() => {
    if (reactionTimes.length === players.length) {
      console.log("RESULTS", reactionTimes);
      navigation.navigate("ReactionResultsScreen", {
        reactionTimes: reactionTimes,
        players: players,
      });
    }
  }, [reactionTimes, players.length, navigation]);

  const startGameForCurrentPlayer = () => {
    setShowCountdown(true);
    setCountdown(3);
    let currentCountdown = 3;

    const countdownTimer = setInterval(() => {
      currentCountdown -= 1;
      setCountdown(currentCountdown);

      if (currentCountdown <= 0) {
        clearInterval(countdownTimer);
        setShowCountdown(false);
        setGameStarted(true);
        setTimeout(() => {
          setScreenColor("#FA922F");
          setStartTime(Date.now());
        }, 1000);
      }
    }, 1000);
  };

  const handleScreenPress = () => {
    if (screenColor === "#FA922F" && gameStarted) {
      const reactionTime = Date.now() - startTime;
      const nextPlayerIndex =
        currentPlayerIndex + 1 < players.length ? currentPlayerIndex + 1 : 0;
      const nextPlayerName = players[nextPlayerIndex];
      console.log("CURRENT ON PRESS", players[currentPlayerIndex]);
      setReactionTimes((prevTimes) => [
        ...prevTimes,
        { name: players[currentPlayerIndex], time: reactionTime },
      ]);

      Alert.alert(
        `Reaction Time`,
        `${players[currentPlayerIndex]} reacted in ${reactionTime} ms. Pass the phone to ${nextPlayerName}.`,
        [{ text: "OK", onPress: () => nextPlayer() }]
      );
    }
  };
  const nextPlayer = () => {
    console.log("HERREEEEEEE", reactionTimes);
    const isLastPlayer = currentPlayerIndex >= players.length - 1;

    if (!isLastPlayer) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      // Reset game state for the next player
      setScreenColor("#003601");
      setGameStarted(false);
      setShowCountdown(false);
      setCountdown(3);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#003601", "#FA922F"]} style={styles.container}>
        {showCountdown && (
          <Text style={styles.countdown}>{countdown > 0 ? countdown : ""}</Text>
        )}
        {!gameStarted && (
          <>
            <Text style={styles.playerTurn}>
              {players[currentPlayerIndex]}'s turn
            </Text>
            <TouchableOpacity
              style={styles.startButton}
              onPress={startGameForCurrentPlayer}
              activeOpacity={0.7}
            >
              <LinearGradient
                // Gradient colors array
                colors={["red", "#3b5998", "orange"]}
                style={styles.startButtonGradient}
              >
                <Text style={styles.startButtonText}>START</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
        {gameStarted && (
          <TouchableOpacity
            style={[styles.container, { backgroundColor: screenColor }]}
            onPress={handleScreenPress}
            activeOpacity={1}
          >
            <Text style={styles.header}>
              Tap as soon as the screen turns red!
            </Text>
            <Text style={styles.playerName}>{players[currentPlayerIndex]}</Text>
          </TouchableOpacity>
        )}
        {showCountdown && (
          <Text style={styles.countdown}>{countdown > 0 ? countdown : ""}</Text>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  header: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  playerName: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
  },
  playerTurn: {
    fontSize: 40,
    color: "#FFFFFF",
    fontFamily: "Noteworthy-Light",
    fontWeight: "bold",
    marginBottom: 20,
  },
  startButton: {
    borderRadius: 100,
    width: 200,
    height: 200,
    marginTop: 20,
    alignSelf: "center",
    borderWidth: 3,
    borderColor: "#fff",
    overflow: "hidden",
  },
  startButtonGradient: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: "100%",
    height: "100%",
  },
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontFamily: "Noteworthy-Light",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ReactionGameScreen;
