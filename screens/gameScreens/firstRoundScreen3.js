// FirstRoundScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "react-native-swiper";

function FirstRoundScreen3({ route, navigation }) {
  const { players } = route.params;

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#003601", "#FA922F"]} style={styles.container}>
        <Text style={styles.header}>Game of remembering</Text>
        <View style={styles.rulesContainer}>
          <Text style={styles.rulesHeader}>Rules</Text>

          <Swiper
            style={styles.wrapper}
            showsButtons
            loop={false}
            showsPagination={true}
            paginationStyle={styles.paginationStyle}
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.activeDotStyle}
          >
            <View style={styles.slide}>
              <Text style={styles.text}>1 </Text>
              <Text style={styles.text}>
                You all add a word to a sentence in turns.
              </Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>2 </Text>
              <Text style={styles.text}>
                Repeat the whole sentence, and add a word each turn.
              </Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.text}>3 </Text>
              <Text style={styles.text}>
                The first person unable to repeat the whole sentence drinks.
              </Text>
            </View>

            <View style={styles.slide}>
              <Text style={styles.text}>Example</Text>
              <Text style={styles.textExample}>
                Person 1: "Tomatoes"... Person 2: "Tomatoes are"... Person 3:
                "Tomatoes are horrible..."
              </Text>
              <Text style={styles.textExample}>
                Press 'finished' when you are done
              </Text>
            </View>
          </Swiper>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("FirstRoundScreen4", {
              players: players,
            });
          }}
        >
          <Text style={styles.buttonText}>Finished</Text>
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
  },
  text: {
    fontSize: 30,
    fontFamily: "Noteworthy-Light",
    color: "#FFFFFF",
    textAlign: "center",
    margin: 10,
  },
  textExample: {
    fontSize: 20,
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
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  rulesContainer: {
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
  finishButtonContainer: {
    marginTop: 20, // Add space above the button if needed
  },
  rulesHeader: {
    fontSize: 34,
    fontFamily: "Noteworthy-Light",
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  paginationStyle: {
    position: "absolute",
    bottom: 0, // Position the dots at the bottom of the swiper
  },
  dotStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Non-active dot color
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDotStyle: {
    backgroundColor: "#FA922F", // Active dot color
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default FirstRoundScreen3;
