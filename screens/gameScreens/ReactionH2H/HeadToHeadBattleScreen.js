import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function HeadToHeadBattleScreen({ route, navigation }) {
  const { contestants, winners = [], losers = [] } = route.params;
  const [gameState, setGameState] = useState("waiting");
  const [points, setPoints] = useState([0, 0]);
  const [buttonColor, setButtonColor] = useState("grey");
  const [roundWinner, setRoundWinner] = useState(null);
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  useEffect(() => {
    if (gameState === "running") {
      const timerId = setTimeout(() => {
        const isRedButton = Math.random() < 0.5;
        setButtonColor(isRedButton ? "red" : "green");
        if (isRedButton) {
          setTimeout(() => setButtonColor("grey"), 1000);
        }
      }, Math.random() * 2000 + 1000);

      return () => clearTimeout(timerId);
    }
  }, [gameState, buttonColor]);

  const handlePress = (playerIndex) => {
    if (gameState !== "running") return;

    if (buttonColor === "red") {
      // Directly setting points if needed. This example shows penalty logic.
      const newPoints = [...points];
      newPoints[playerIndex]--; // Assuming you want to penalize for a wrong press. Adjust according to your game rules.
      setPoints(newPoints);
      // Alert and pause logic
      Alert.alert(
        "-1 Point!",
        `${contestants[playerIndex]} pressed too early!`,
        [
          { text: "OK", onPress: () => setGameState("running") }, // Resume game
        ]
      );
      setButtonColor("grey"); // Ensure the button color is reset
      setGameState("waiting"); // Pause the game
    } else if (buttonColor === "green") {
      const newPoints = [...points];
      newPoints[playerIndex]++;
      setPoints(newPoints);

      if (newPoints[playerIndex] === 3) {
        setGameState("ended");
        Alert.alert("Game Over", `${contestants[playerIndex]} wins the game!`, [
          { text: "OK", onPress: () => setShowWinnerModal(true) }, // Navigate or handle winner
        ]);
      } else {
        // Here we show the alert for scoring a point and pause the game until "OK" is pressed
        Alert.alert("Point!", `${contestants[playerIndex]} scores a point!`, [
          { text: "OK", onPress: () => setGameState("running") }, // Resume game
        ]);
        setButtonColor("grey"); // Reset the button color for the next round
        setGameState("waiting"); // Pause the game until "OK" is pressed
      }
    }
  };

  const resetRound = () => {
    setButtonColor("grey");
    setGameState("running");
  };

  const startGame = () => {
    setGameState("running");
    setButtonColor("grey");
  };

  const handleWinnerAcknowledged = () => {
    setShowWinnerModal(false);
    // Navigate or reset game logic here based on your requirements
    navigation.goBack(); // Example navigation, adjust based on your app's flow
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#003601", "#FA922F"]} style={styles.container}>
        <Text style={styles.playerNameTop}>
          {contestants[0]}: {points[0]}
        </Text>
        <Text style={styles.playerNameBottom}>
          {contestants[1]}: {points[1]}
        </Text>
        {gameState === "waiting" && (
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        )}
        {gameState !== "waiting" && (
          <>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: buttonColor }]}
              onPress={() => handlePress(0)}
              disabled={buttonColor === "grey" || gameState === "ended"}
            />
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: buttonColor }]}
              onPress={() => handlePress(1)}
              disabled={buttonColor === "grey" || gameState === "ended"}
            />
          </>
        )}
        {showWinnerModal && (
          <Modal
            visible={showWinnerModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowWinnerModal(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  {roundWinner} wins the game!
                </Text>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={handleWinnerAcknowledged}
                >
                  <Text style={styles.textStyle}>Acknowledge</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    position: "absolute", // Position it over everything else
    alignSelf: "center",
  },
  startButtonText: {
    color: "black",
    fontSize: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 100, // Adjust the height as necessary
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Noteworthy-Light",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Noteworthy-Light",
  },
});
export default HeadToHeadBattleScreen;
