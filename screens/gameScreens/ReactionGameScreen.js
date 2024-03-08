import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

function ReactionGameScreen({ route, navigation }) {
  const { players } = route.params;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [gameState, setGameState] = useState("waiting"); // 'waiting', 'countdown', 'ready', 'started'

  const [randomDelay, setRandomDelay] = useState(
    Math.random() * (5000 - 1000) + 1000
  ); // Random delay between 1 and 5 seconds

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
    setGameState("countdown");
    // No need to set countdown here as the CountdownCircleTimer component handles it
  };

  const handleScreenPress = () => {
    if (gameState === "red") {
      const reactionTime = Date.now() - startTime;
      setGameState("waiting");
      setReactionTimes((prevTimes) => [
        ...prevTimes,
        { name: players[currentPlayerIndex], time: reactionTime },
      ]);
      Alert.alert(
        "Reaction Time",
        `${players[currentPlayerIndex]} reacted in ${reactionTime} ms. Pass the phone to the next player.`,
        [{ text: "OK", onPress: nextPlayer }]
      );
    }
  };

  const nextPlayer = () => {
    const nextPlayerIndex = currentPlayerIndex + 1;
    if (nextPlayerIndex < players.length) {
      setCurrentPlayerIndex(nextPlayerIndex);
      setRandomDelay(Math.random() * (5000 - 1000) + 1000); // Set a new random delay for the next player
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#003601", "#FA922F"]} style={styles.container}>
        {gameState === "countdown" && (
          <CountdownCircleTimer
            isPlaying
            duration={3}
            colors={["#004777"]}
            onComplete={() => {
              setGameState("green");
              setTimeout(() => {
                setGameState("red");
                setStartTime(Date.now());
              }, randomDelay); // Start game after a random delay
              return [false, 0]; // Don't repeat the timer
            }}
          >
            {({ remainingTime }) => (
              <Text style={styles.timerText}>Be ready in {remainingTime}</Text>
            )}
          </CountdownCircleTimer>
        )}
        {gameState === "waiting" && (
          <>
            <Text style={styles.playerTurn}>
              {players[currentPlayerIndex]}'s turn
            </Text>
            <TouchableOpacity
              style={styles.startButton}
              onPress={startGameForCurrentPlayer}
            >
              <Text style={styles.startButtonText}>START</Text>
            </TouchableOpacity>
          </>
        )}
        {(gameState === "green" || gameState === "red") && (
          <TouchableOpacity
            style={[
              styles.gameArea,
              { backgroundColor: gameState === "red" ? "red" : "#003601" },
            ]}
            onPress={handleScreenPress}
            activeOpacity={1}
          >
            {gameState === "green" && (
              <Text style={styles.header}>Get Ready!</Text>
            )}
            {gameState === "red" && <Text style={styles.header}>Tap Now!</Text>}
          </TouchableOpacity>
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
  gameArea: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
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
    top: "40%",
  },
});

export default ReactionGameScreen;
