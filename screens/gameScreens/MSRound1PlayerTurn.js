import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { Accelerometer } from "expo-sensors";

const MSRound1PlayerTurn = ({ route, navigation }) => {
  const { names } = route.params;
  const [currentName, setCurrentName] = useState(names[0]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [modalVisible, setModalVisible] = useState(false);
  const [dataHistory, setDataHistory] = useState([]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    const subscription = Accelerometer.addListener((accelerometerData) => {
      handleAccelerationData(accelerometerData);
    });

    return () => {
      clearInterval(timerId);
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (timer === 0) {
      console.log("Time's up!");
      // Handle game end or timeout logic here
    }
  }, [timer]);

  const handleAccelerationData = ({ x, y, z }) => {
    console.log(`Received accelerometer data: x=${x} y=${y} z=${z}`); // Debug statement
    const newHistory = [...dataHistory, z];
    if (newHistory.length > 20) newHistory.shift(); // Manage buffer size for more precision
    setDataHistory(newHistory);
    checkForFlick(newHistory);
  };

  const checkForFlick = (history) => {
    if (history.length < 10) return; // Ensure enough data points for analysis

    const zValues = history.map((point) => point);
    const threshold = 0.3; // Sensitivity threshold for detecting a flick, adjust as needed

    // Calculate differences between consecutive readings
    const diffs = zValues
      .slice(1)
      .map((value, index) => value - zValues[index]);

    console.log("diffs:", diffs); // Debug statement to see differences

    // Find peaks and troughs in the differences to detect flicks
    let peakIndex = -1;
    let troughIndex = -1;

    for (let i = 1; i < diffs.length - 1; i++) {
      if (
        diffs[i] > threshold &&
        diffs[i - 1] <= threshold &&
        diffs[i + 1] <= threshold
      ) {
        peakIndex = i;
      }
      if (
        diffs[i] < -threshold &&
        diffs[i - 1] >= -threshold &&
        diffs[i + 1] >= -threshold
      ) {
        troughIndex = i;
      }
    }

    console.log("peakIndex:", peakIndex, "troughIndex:", troughIndex); // Debug statement to see peakIndex and troughIndex

    if (peakIndex !== -1 && troughIndex !== -1) {
      if (peakIndex < troughIndex) {
        pass(); // Detected a downward flick
      } else if (troughIndex < peakIndex) {
        correctGuess(); // Detected an upward flick
      }
      setDataHistory([]); // Clear history after detection
    }
  };

  const correctGuess = () => {
    setScore(score + 1);
    setCurrentName(names[Math.floor(Math.random() * names.length)]);
    setModalVisible(true);
    setTimeout(() => setModalVisible(false), 1000);
  };

  const pass = () => {
    setCurrentName(names[Math.floor(Math.random() * names.length)]);
    setModalVisible(true);
    setTimeout(() => setModalVisible(false), 1000);
  };

  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <Text style={styles.modalText}>Score: {score}</Text>
        </View>
      </Modal>
      <Text style={styles.timer}>Time left: {timer}s</Text>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={styles.name}>{currentName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  timer: {
    fontSize: 48,
  },
  score: {
    fontSize: 24,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  modalText: {
    fontSize: 30,
    color: "white",
  },
});

export default MSRound1PlayerTurn;
