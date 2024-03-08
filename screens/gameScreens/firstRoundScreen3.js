// FirstRoundScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PagerView from "react-native-pager-view";
import { Audio } from "expo-av";

function FirstRoundScreen3({ route, navigation }) {
  const { players } = route.params;
  const [pageIndex, setPageIndex] = useState(0);
  const [sound, setSound] = useState();

  const renderDots = (totalPages, currentIndex) => {
    let dots = [];
    for (let i = 0; i < totalPages; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            currentIndex === i ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      );
    }
    return <View style={styles.dotContainer}>{dots}</View>;
  };
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
        <Text style={styles.header}>
          Let us start with a simple game of remembering!
        </Text>
        <PagerView
          style={styles.rulesContainer}
          initialPage={0}
          onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
        >
          <View key="1" style={styles.slide}>
            <Text style={styles.text}>Step 1:</Text>
            <Text style={styles.text}>
              You all add a word to a sentence in turns.
            </Text>
          </View>
          <View key="2" style={styles.slide}>
            <Text style={styles.text}>Step 2:</Text>

            <Text style={styles.text}>
              Repeat the whole sentence, and add a word each turn.
            </Text>
          </View>
          <View key="3" style={styles.slide}>
            <Text style={styles.text}>Step 3:</Text>

            <Text style={styles.text}>
              The first person unable to repeat the whole sentence drinks.
            </Text>
          </View>
        </PagerView>
        {renderDots(3, pageIndex)}
        {pageIndex === 2 && ( // Only show the button on the last page
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("FirstRoundScreen4", { players })
            }
          >
            <Text style={styles.buttonText}>Finished</Text>
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
    margin: 10,
    padding: 10,
    top: 20,
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
    height: 350,
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
    backgroundColor: "#FA922F",
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    margin: 5,
  },
  activeDot: {
    backgroundColor: "#FFFFFF",
  },
  inactiveDot: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
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

export default FirstRoundScreen3;
