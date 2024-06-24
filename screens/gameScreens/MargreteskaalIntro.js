// FirstRoundScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import TypingAnimation from "./assets/TypingAnimation";
import { Audio } from "expo-av";

function MargreteskaalIntro({ route, navigation }) {
  const { players } = route.params;
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
          <Text style={styles.whistleText}>📣</Text>
        </TouchableOpacity>
        <TypingAnimation text="Margreteskål" textStyle={styles.header} />
        <TypingAnimation
          text="Tid til Margreteskål. Hver deltager skriver 3 kendisser ned. Hold det for jer selv, og giv telefonen videre🙏"
          textStyle={styles.text}
          typingSpeed={50} // Optional: Adjust the typing speed as needed
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("MargreteskaalNames", {
              players: players,
            });
          }}
        >
          <Text style={styles.buttonText}>Start</Text>
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
    bottom: 60,
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
    bottom: 50,
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
    fontSize: 22,
    fontFamily: "Noteworthy-Light",
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  whistleText: {
    color: "white",
    fontSize: 22,
    fontFamily: "Noteworthy-Light",
  },
  soundButton: {
    position: "absolute",
    left: 20,
    top: 70,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default MargreteskaalIntro;
