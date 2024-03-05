// FirstRoundScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import { useState, useEffect } from "react";

function FirstRoundScreen2({ route, navigation }) {
  const { players } = route.params;
  const firstPlayerName = players[0];
  const [sound, setSound] = useState();

  async function loadAndPlaySound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/whistle-sound.mp3")
    );
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#003601", "#FA922F"]} style={styles.container}>
        <TouchableOpacity onPress={loadAndPlaySound} style={styles.soundButton}>
          <Image
            source={require("./assets/whistle.png")}
            style={styles.icon}
            resizeMode="contain"
          />
          <LinearGradient
            colors={["white", "#707070"]}
            style={styles.gradient}
          ></LinearGradient>
        </TouchableOpacity>

        <Text style={styles.header}>Game of remembering</Text>
        <Text style={styles.text}>
          OK {firstPlayerName}, You will be reading the instructions for the
          first game. You think you can manage that?🤨 Pull yourself together!
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("firstRoundScreen3", {
              players: players,
            });
          }}
        >
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
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
    fontSize: 50,
    fontFamily: "Papyrus-Condensed",
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    bottom: 100,
  },
  soundButton: {
    position: "absolute", // Position the button over the container view
    top: 40, // Distance from the top of the screen
    left: 20, // Distance from the left side of the screen
    width: 50, // Width of the button for a small, circular shape
    height: 50, // Height of the button to match the width, making it circular
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25, // This should be half of width/height to make it perfectly round
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    width: 30,
    height: 30,
    top: 10,
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
  text: {
    fontSize: 30,
    fontFamily: "Noteworthy-Light",
    color: "#FFFFFF",
    textAlign: "center",
    margin: 20,
  },
  buttonText: {
    color: "#FA922F",
    fontSize: 23,
    fontFamily: "Noteworthy-Light",
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  gradient: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: "100%",
    height: "100%",
  },
});

export default FirstRoundScreen2;
