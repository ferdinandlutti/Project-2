// FirstRoundScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function thirdRoundScreen({ route, navigation }) {
  const { players } = route.params; // This will now be the entire array

  const thirdPlayerName = players[2] ? players[2] : players[0];

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#FFC692", "#FA922F"]} style={styles.container}>
        <Text style={styles.header}>Pass the phone to {thirdPlayerName}</Text>
        {/* Rest of your round setup */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("thirdRoundScreen2", {
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
  buttonText: {
    color: "#FA922F",
    fontSize: 22,
    fontFamily: "Noteworthy-Light",
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default thirdRoundScreen;
