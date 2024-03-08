import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

export default function ChooseCaptionGif({ route, navigation }) {
  const { players } = route.params;
  const [currentGif, setCurrentGif] = useState("");
  const [gifList, setGifList] = useState([]);
  const [currentGifIndex, setCurrentGifIndex] = useState(0);

  const searchTerms = [
    "yuck",
    "party",
    "stressed",
    "clumsy",
    "stoned",
    "excited",
    "disgusted",
    "facepalm",
    "high",
    "confused",
    "sexy time",
    "weird",
    "instant regret",
    "smash",
    "tripping",
  ];

  const fetchRandomGif = async () => {
    const apiKey = "McY9C4E7j9bUcHcMCDWQTWVOy7u0H0fI"; // Replace with your actual Giphy API key
    // Select a random search term from the predefined list
    const searchTerm =
      searchTerms[Math.floor(Math.random() * searchTerms.length)];
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(
      searchTerm
    )}&limit=3`;

    try {
      const response = await axios.get(url);
      setGifList(response.data.data.map((gif) => gif.images.original.url));
      setCurrentGifIndex(0);
    } catch (error) {
      console.error("Error fetching GIF:", error);
    }
  };

  useEffect(() => {
    fetchRandomGif();
  }, []);

  const handleOkPress = () => {
    navigation.navigate("SubmitCaptionScreen", {
      gifUrl: currentGif,
      players: players,
    });
  };

  const handleGenerateNewGif = () => {
    let nextIndex = currentGifIndex + 1;
    if (nextIndex >= gifList.length) {
      // If reached the end of the list, fetch new GIFs
      fetchRandomGif();
    } else {
      setCurrentGif(gifList[nextIndex]);
      setCurrentGifIndex(nextIndex);
    }
  };
  useEffect(() => {
    if (gifList.length > 0) {
      setCurrentGif(gifList[currentGifIndex]); // Set the first GIF when the list is updated
    }
  }, [gifList, currentGifIndex]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#D68E8D", "#FA922F"]} style={styles.container}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.header}>Caption Game</Text>
          <Text style={styles.text}>
            Everyone should agree on the chosen GIF before continuing
          </Text>

          {currentGif ? (
            <View style={styles.gifContainer}>
              <Image source={{ uri: currentGif }} style={styles.gif} />
              <TouchableOpacity
                style={[styles.button, styles.newGifButton]}
                onPress={handleGenerateNewGif}
              >
                <Text style={styles.gifButtonText}>Generate New GIF</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text>Loading...</Text>
          )}
          <TouchableOpacity
            style={[styles.button, styles.okButton]}
            onPress={handleOkPress}
          >
            <Text style={styles.buttonText}>OK, Choose this GIF</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </SafeAreaView>
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
  gifContainer: {
    alignItems: "center",
    marginBottom: 20, // Adjust spacing as needed
  },
  header: {
    fontSize: 44,
    fontFamily: "Noteworthy-Light",
    color: "#FFFFFF",
    fontWeight: "bold",
    marginBottom: 20, // Adjust spacing as needed
  },
  gif: {
    width: 300,
    height: 200,
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: "80%", // Adjust width as needed
  },
  newGifButton: {
    marginTop: 20, // Adjust spacing as needed
  },
  okButton: {
    position: "absolute",
    bottom: 50, // Adjust positioning as needed
  },
  buttonText: {
    color: "#FA922F",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Noteworthy-Light",
  },
  gifButtonText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "Noteworthy-Light",
  },
  text: {
    fontSize: 30,
    fontFamily: "Noteworthy-Light",
    color: "#FFFFFF",
    textAlign: "center",
    margin: 20,
  },
});
