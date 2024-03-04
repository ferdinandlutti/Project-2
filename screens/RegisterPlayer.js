import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import image2 from "../assets/images/imagefriends.png";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function RegisterPlayer({ navigation }) {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);

  const addPlayer = () => {
    if (playerName.trim() !== "") {
      setPlayers((prevPlayers) => [...prevPlayers, playerName.trim()]);
      setPlayerName("");
    }
  };

  const removePlayer = (index) => {
    setPlayers((currentPlayers) =>
      currentPlayers.filter((_, i) => i !== index)
    );
  };
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#F5C27A", "#FA922F"]} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.header}>Register Players</Text>
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              onChangeText={setPlayerName}
              value={playerName}
              placeholder="Enter Player Name"
              placeholderTextColor="#fff"
            />
            <TouchableOpacity style={styles.button} onPress={addPlayer}>
              <Text style={styles.buttonText}>Add Player</Text>
            </TouchableOpacity>
            {players.map((player, index) => (
              <View key={index} style={styles.playerContainer}>
                <Text style={styles.playerNumber}>{index + 1}.</Text>
                <Text style={styles.playerName}>{player}</Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removePlayer(index)}
                >
                  <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.button2}
            onPress={() =>
              navigation.navigate("GameScreen", { players: players })
            }
          >
            <Text style={styles.buttonText}>OK, we are ready</Text>
          </TouchableOpacity>
        </ScrollView>
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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: "50%",
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
  scrollView: {
    width: "100%",
  },
  header: {
    fontSize: 60,
    fontFamily: "Papyrus-Condensed",
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 30,
    fontFamily: "Noteworthy-Light",
    color: "#FFFFFF",
    position: "absolute",
    textAlign: "center",
    margin: 20,
  },
  button: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    height: 70,
    margin: 20,
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
  button2: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    height: 70,
    margin: 20,
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
    bottom: 30,
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
  playerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginTop: 10,
  },
  playerNumber: {
    color: "#FFFFFF",
    fontSize: 22,
    marginRight: 10,
  },
  playerName: {
    color: "#FFFFFF",
    fontSize: 22,
  },
  deleteButton: {
    marginLeft: "auto",
    padding: 10,
  },
  deleteButtonText: {
    color: "black",
    fontSize: 22,
  },
});
