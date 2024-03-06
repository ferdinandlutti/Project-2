import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function HeadToHeadChoose({ route, navigation }) {
  const { players } = route.params;

  // State for storing the selected contestants
  const [contestants, setContestants] = useState([]);

  const selectRandomContestants = () => {
    let shuffledPlayers = [...players].sort(() => 0.5 - Math.random());
    setContestants(shuffledPlayers.slice(0, 2));
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#003601", "#FA922F"]} style={styles.container}>
        <Text style={styles.header}>Head To Head Battle</Text>
        {contestants.length > 0 && (
          <>
            <Text style={styles.text}>Contestants</Text>
            <Text style={styles.contestant}>{contestants[0]}</Text>
            <Text style={styles.text}>VS</Text>
            <Text style={styles.contestant}>{contestants[1]}</Text>
          </>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={selectRandomContestants}
        >
          <Text style={styles.buttonText}>
            {contestants.length > 0
              ? "Regenerate Contestants"
              : "Generate Contestants"}
          </Text>
        </TouchableOpacity>
        {contestants.length > 0 && (
          <TouchableOpacity
            style={[styles.button, styles.startBattleButton]}
            onPress={() => {
              navigation.navigate("HeadToHeadGame", {
                contestants: contestants,
              });
            }}
          >
            <Text style={styles.buttonText}>Start Battle</Text>
          </TouchableOpacity>
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
  header: {
    fontSize: 40,
    fontFamily: "Papyrus-Condensed",
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontFamily: "Noteworthy-Light",
    color: "#FFFFFF",
    textAlign: "center",
    margin: 10,
  },
  contestant: {
    fontSize: 30,
    fontFamily: "Noteworthy-Light",
    color: "#FA922F",
    fontWeight: "bold",
    textAlign: "center",
    margin: 5,
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
    marginTop: 30,
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

export default HeadToHeadChoose;
