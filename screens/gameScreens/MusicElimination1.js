import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const MusicElimination1 = ({ route, navigation }) => {
  const { players } = route.params;

  return (
    <LinearGradient
      colors={["#003601", "#FA922F"]} // Example gradient colors
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container}>
          <Text style={styles.header}>Music Elimination Round</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("SecondRoundScreen", {
                players: players,
              });
            }}
          >
            <Text style={styles.buttonText}>Next Round</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    height: "100%",
  },
  header: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Papyrus-Condensed",
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
  buttonText: {
    color: "#FA922F",
    fontSize: 22,
    fontFamily: "Noteworthy-Light",
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  gif: {
    width: "100%",
    height: 250,
    bottom: 100,
  },
});

export default MusicElimination1;
