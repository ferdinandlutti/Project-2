// FirstRoundScreen.js
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function FirstRoundScreen4({ route, navigation }) {
  const { players } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState("");

  const handlePlayerSelect = (player) => {
    setSelectedPlayer(player);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#003601", "#FA922F"]} style={styles.container}>
        <Text style={styles.header}>Start!</Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Consequence for {selectedPlayer}!
              </Text>
              <Text style={styles.modalText}>
                You must address the winner of this round as 'darling' every
                time you speak to them. Failing to do so results in 2 sips.
              </Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.listContainer}>
          <Text style={styles.text}>Who Lost?</Text>
          {players.map((player, index) => (
            <TouchableOpacity
              key={index}
              style={styles.playerButton}
              onPress={() => handlePlayerSelect(player)}
            >
              <Text style={styles.playerButtonText}>{player}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("secondRoundScreen", {
              players: players,
            });
          }}
        >
          <Text style={styles.buttonText}>Next Round</Text>
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
  listContainer: {
    backgroundColor: "#003601",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 450,
    marginTop: 20,
    marginBottom: 20,
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
  },
  text: {
    fontSize: 30,
    fontFamily: "Noteworthy-Light",
    color: "#FFFFFF",
    textAlign: "center",
    margin: 10,
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
  playerButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  playerButtonText: {
    color: "#003601",
    fontSize: 20,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#003601",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 20,
    fontFamily: "Noteworthy-Light",
    color: "#FFFFFF",
    textAlign: "center",
    margin: 10,
  },
  gif: {
    width: 200,
    height: 200,
  },
});

export default FirstRoundScreen4;
