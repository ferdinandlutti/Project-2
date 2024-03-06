import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";

export default function CaptionVoteScreen({ navigation, route }) {
  const { gifUrl, players, captions } = route.params;
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [votes, setVotes] = useState(Array(captions.length).fill(0));
  const [showModal, setShowModal] = useState(false);

  const handleVote = (captionIndex) => {
    setVotes((currentVotes) => {
      // Copy the current votes to a new array to avoid mutating the state directly
      const updatedVotes = [...currentVotes];
      // Increment the vote for the selected caption
      updatedVotes[captionIndex]++;

      return updatedVotes;
    });

    const nextVoterIndex = currentVoterIndex + 1;
    if (nextVoterIndex < players.length) {
      setCurrentVoterIndex(nextVoterIndex);
    } else {
      setShowModal(true);
    }
  };
  console.log(votes);

  useEffect(() => {
    if (currentVoterIndex >= players.length) {
      navigation.navigate("CaptionLeaderboardScreen", {
        players,
        captions,
        votes,
      });
    }
  }, [currentVoterIndex, players.length, captions, votes, navigation]);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setShowModal(!showModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>All players have voted!</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setShowModal(!showModal);
                navigation.navigate("CaptionLeaderboardScreen", {
                  players,
                  captions,
                  votes,
                });
              }}
            >
              <Text style={styles.textStyle}>See the leaderboard</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Image source={{ uri: gifUrl }} style={styles.gif} />
      <Text style={styles.instruction}>
        {players[currentVoterIndex]}'s turn to vote:
      </Text>
      <ScrollView contentContainerStyle={styles.captionsContainer}>
        {captions.map((caption, index) => (
          <TouchableOpacity
            key={index}
            style={styles.captionBox}
            onPress={() => handleVote(index)}
          >
            <Text style={styles.captionText}>“{caption.text}”</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  gif: {
    width: 300,
    height: 200,
    resizeMode: "contain",
  },
  instruction: {
    fontSize: 18,
    margin: 20,
    textAlign: "center",
  },
  captionsContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  captionBox: {
    backgroundColor: "#ECECEC",
    padding: 15,
    borderRadius: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  captionText: {
    fontSize: 16,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
    marginBottom: 15,
    textAlign: "center",
  },
});
