// FirstRoundScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import PagerView from "react-native-pager-view";

function HeadToHeadRules({ route, navigation }) {
  const { players } = route.params;
  const [sound, setSound] = useState();

  const totalPages = 4; // Total number of pages in the pager

  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index

  const handlePageSelected = (e) => {
    setCurrentIndex(e.nativeEvent.position);
  };

  const renderIndicatorDots = () => {
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
    return <View style={styles.dotsContainer}>{dots}</View>;
  };
  async function loadAndPlaySound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/whistle-sound.mp3")
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
    <LinearGradient colors={["#003601", "#FA922F"]} style={styles.container}>
      <TouchableOpacity onPress={loadAndPlaySound} style={styles.soundButton}>
        <Text style={styles.whistleText}>📣</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Head To Head</Text>

      <PagerView
        style={styles.pagerViewStyle}
        initialPage={0}
        onPageSelected={handlePageSelected}
      >
        <View key="1" style={styles.pageStyle}>
          <Text style={styles.text}>
            Step 1: Place the phone in the middle between you.
          </Text>
        </View>
        <View key="2" style={styles.pageStyle}>
          <Text style={styles.text}>
            Step 2: Press The Button when it turns GREEN
          </Text>
          <Text style={styles.colorButtonText}>🟢</Text>
        </View>
        <View key="3" style={styles.pageStyle}>
          <Text style={styles.text}>
            Step 3: if you press the RED button you get -1 point
          </Text>
          <Text style={styles.colorButtonText}>🔴</Text>
        </View>
        <View key="4" style={styles.pageStyle}>
          <Text style={styles.text}>
            Step 4: First to win 3 rounds wins the game.
          </Text>
        </View>
      </PagerView>
      {renderIndicatorDots()}
      {currentIndex === 3 && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("HeadToHeadChoose", { players })}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 50,
    fontFamily: "Papyrus-Condensed",
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    margin: 5,
  },
  colorButtonText: {
    fontSize: 50,
  },
  activeDot: {
    backgroundColor: "white",
  },
  inactiveDot: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  pagerViewStyle: {
    width: "100%",
    height: 300, // Adjust the height as needed
  },
  pageStyle: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Noteworthy-Light",
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
    shadowOffset: { width: 0, height: 2 },
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

export default HeadToHeadRules;
