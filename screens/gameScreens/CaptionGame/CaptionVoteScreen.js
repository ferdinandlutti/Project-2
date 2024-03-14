import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export default function CaptionVoteScreen({ navigation, route }) {
  const { gifUrl, players, captions } = route.params;
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [votes, setVotes] = useState(Array(captions.length).fill(0));
  const [showModal, setShowModal] = useState(false);
  const [shuffledIndices, setShuffledIndices] = useState([]);

  const handleVote = (captionIndex) => {
    setVotes((currentVotes) => {
      const updatedVotes = [...currentVotes];
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
    // Generate an array of caption indices and shuffle it
    setShuffledIndices(shuffleArray(Array.from(captions.keys())));
  }, [captions]);

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
      <LinearGradient colors={["orange", "#FFFFFF"]} style={styles.container}>
        <SafeAreaView style={styles.container}>
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
            {shuffledIndices.map((index) => (
              <TouchableOpacity
                key={index}
                style={styles.captionBox}
                onPress={() => handleVote(index)} // Pass the original index for voting
              >
                <Text style={styles.captionText}>“{captions[index].text}”</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
    width: "100%",
    height: "100%",
  },
  gif: {
    width: 300,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
    marginTop: 30,
  },
  instruction: {
    fontSize: 30,
    marginBottom: 20,
    fontFamily: "Noteworthy-Light",
    color: "#333333",
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
    padding: 10,
    borderRadius: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Noteworthy-Light",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Noteworthy-Light",
  },
});
