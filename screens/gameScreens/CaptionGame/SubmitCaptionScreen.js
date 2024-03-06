import React, { useState } from "react";
import {
  Modal,
  Alert,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

export default function SubmitCaptionScreen({ navigation, route }) {
  const {
    gifUrl,
    players,
    currentPlayerIndex = 0,
    captions = [],
  } = route.params;
  const [inputCaption, setInputCaption] = useState("");
  const [timerKey, setTimerKey] = useState(0); // Key to reset the timer

  const handleCaptionSubmit = () => {
    const updatedCaptions = [
      ...captions,
      {
        text: inputCaption,
        playerIndex: currentPlayerIndex,
        votes: 0,
      },
    ];
    setTimerKey((prevKey) => prevKey + 1);

    if (currentPlayerIndex < players.length - 1) {
      navigation.replace("SubmitCaptionScreen", {
        // Ensure this matches your screen name accurately
        gifUrl,
        players,
        currentPlayerIndex: currentPlayerIndex + 1,
        captions: updatedCaptions,
      });
    } else {
      navigation.navigate("CaptionVoteScreen", {
        gifUrl,
        players,
        captions: updatedCaptions,
      });
    }
  };
  const handleTimeUp = () => {
    const nextPlayerIndex = currentPlayerIndex + 1;
    if (nextPlayerIndex < players.length) {
      Alert.alert(
        "Time's up!",
        `Pass the phone to ${players[nextPlayerIndex]}`,
        [{ text: "OK", onPress: () => setTimerKey((prevKey) => prevKey + 1) }]
      );
    } else {
      // If it was the last player, navigate to the next screen
      navigation.navigate("CaptionVoteScreen", {
        gifUrl,
        players,
        captions,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient colors={["#D68E8D", "#FA922F"]} style={styles.container}>
        <CountdownCircleTimer
          key={timerKey}
          isPlaying
          duration={60}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          onComplete={handleTimeUp}
          size={90}
        >
          {({ remainingTime }) => <Text>{remainingTime}</Text>}
        </CountdownCircleTimer>
        <Image source={{ uri: gifUrl }} style={styles.gif} />
        {inputCaption.length > 0 && (
          <View style={styles.captionBox}>
            <Text style={styles.captionText}>“{inputCaption}”</Text>
          </View>
        )}
        <Text style={styles.text}>
          Player {players[currentPlayerIndex]}, add your caption:
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setInputCaption}
          value={inputCaption}
          placeholder="Type your caption here"
          autoFocus={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleCaptionSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  gif: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  instructions: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 70,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "#fff",
    borderColor: "#fff",
    borderRadius: 20,
    width: "100%",
    fontSize: 20,
    textAlign: "center",
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
  text: {
    fontSize: 30,
    fontFamily: "Noteworthy-Light",
    color: "#FFFFFF",
    textAlign: "center",
    margin: 20,
  },
  captionBox: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  captionText: {
    color: "#333",
    fontSize: 16,
  },
  timerText: {
    fontSize: 18,
  },
});
