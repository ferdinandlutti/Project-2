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
        const isRedButton = Math.random() < 0.66;
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
    const isRedButton = Math.random() < 0.66; // 2/3 chance for red, 1/3 chance for green
    setButtonColor(isRedButton ? "red" : "green");
    if (buttonColor === "red") {
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
          {contestants[0]}'s Points: {points[0]}
        </Text>

        {gameState === "waiting" && (
          <TouchableOpacity style={styles.startButton} onPress={startGame}>
            <LinearGradient
              colors={["#4c669f", "#3b5998", "#192f6a"]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.startButtonText}>Start</Text>
            </LinearGradient>
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
        <Text style={styles.playerNameBottom}>
          {contestants[1]}'s Points: {points[1]}
        </Text>
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
  playerNameTop: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    transform: [{ rotate: "180deg" }],
  },
  playerNameBottom: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },

  actionButton: {
    width: 250,
    height: 250,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    margin: 40,
    shadowColor: "#000",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  startButton: {
    borderRadius: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  gradient: {
    padding: 20,
    alignItems: "center",
    borderRadius: 60,
    width: 120, // Adjust the width
    height: 120, // Adjust the height
    justifyContent: "center",
  },
  startButtonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Noteworthy-Light",
    fontWeight: "bold",
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
