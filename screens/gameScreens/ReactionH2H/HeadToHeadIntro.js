// FirstRoundScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function HeadToHeadIntro({ route, navigation }) {
  const { players } = route.params;

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#003601", "#FA922F"]} style={styles.container}>
        <Text style={styles.header}>Head To Head</Text>
        <Text style={styles.text}>
          OK , Now it is time for some intense battles, with 1v1 action
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("HeadToHeadChoose", {
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
    bottom: 100,
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
});

export default HeadToHeadIntro;
