import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const gifs = [
  "https://tenor.com/n3wY0YHpvFD.gif",
  "https://tenor.com/6kD8.gif",
  "https://tenor.com/bN0hT.gif",
];

export default function CaptionGame({ navigation, route }) {
  const { players } = route.params;
  const [currentGif, setCurrentGif] = useState("");
  const [captions, setCaptions] = useState([]);
  const [inputCaption, setInputCaption] = useState("");
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0); // Initialize currentPlayerIndex

  const [phase, setPhase] = useState("submit");
  const [votes, setVotes] = useState({});

  const getRandomGif = () => {
    const randomIndex = Math.floor(Math.random() * gifs.length);
    return gifs[randomIndex];
  };

  useEffect(() => {
    setCurrentGif(getRandomGif());
  }, []);
  const submitCaption = () => {
    if (inputCaption.trim() === "") {
      Alert.alert("Empty Caption", "Please enter a caption before submitting.");
      return;
    }
    // Attach the current player's identifier to the caption
    const newCaption = {
      text: inputCaption,
      votes: 0,
      player: players[currentPlayerIndex],
    };
    setCaptions([...captions, newCaption]);

    // Prepare for the next player's caption or move to voting phase if all players have submitted
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      setPhase("vote");
    }

    setInputCaption(""); // Clear input for the next player
  };

  const voteForCaption = (index) => {
    // Simple vote handling, further logic to prevent self-voting or multiple votes can be added
    let newCaptions = captions.map((caption, idx) => {
      if (idx === index) {
        return { ...caption, votes: caption.votes + 1 };
      }
      return caption;
    });
    setCaptions(newCaptions);
    // Move to results phase after voting, this can be adjusted based on your game's rules
    setPhase("results");
  };

  const showResults = () => {
    // Sort captions based on votes and display alongside the player who submitted them
    return captions
      .sort((a, b) => b.votes - a.votes)
      .map((caption, index) => (
        <Text
          key={index}
          style={styles.resultText}
        >{`${caption.player}: ${caption.text} - Votes: ${caption.votes}`}</Text>
      ));
  };

  const renderGamePhase = () => {
    switch (phase) {
      case "submit":
        return (
          <View>
            <Text style={styles.instructionText}>
              Player: {players[currentPlayerIndex]}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={setInputCaption}
              value={inputCaption}
              placeholder="Enter your caption"
            />
            <TouchableOpacity style={styles.button} onPress={submitCaption}>
              <Text style={styles.buttonText}>Submit Caption</Text>
            </TouchableOpacity>
          </View>
        );
      case "vote":
        // Ensure the voting UI is presented in a way that matches your app's logic and player experience
        return (
          <ScrollView style={styles.captionsContainer}>
            {captions
              .filter((_, index) => index !== currentPlayerIndex)
              .map((caption, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.captionItem}
                  onPress={() => voteForCaption(index)}
                >
                  <Text style={styles.captionText}>{caption.text}</Text>
                </TouchableOpacity>
              ))}
            {currentPlayerIndex < players.length - 1 ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => setCurrentPlayerIndex(currentPlayerIndex + 1)}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => setPhase("results")}
              >
                <Text style={styles.buttonText}>See Results</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        );
      case "results":
        return <ScrollView>{showResults()}</ScrollView>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#F5C27A", "#FA922F"]} style={styles.container}>
        <Image source={{ uri: currentGif }} style={styles.gif} />
        {renderGamePhase()}
        <StatusBar style="auto" />
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
  image: {
    width: "100%",
    height: 250,
    borderRadius: 20,
    opacity: 0.6,
    bottom: 100,
  },
  header: {
    fontSize: 60,
    fontFamily: "Papyrus-Condensed",
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    bottom: 100,
  },
  text: {
    fontSize: 30,
    fontFamily: "Noteworthy-Light",
    color: "#FFFFFF",
    textAlign: "center",
    margin: 20,
    bottom: 80,
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
    position: "absolute",
    bottom: 80,
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
  gif: {
    width: 300,
    height: 200,
    margin: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: 200,
    backgroundColor: "#FFFFFF",
  },
});
