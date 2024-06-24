import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const MargreteSkaalNames = ({ route, navigation }) => {
  const { players } = route.params;
  const [currentName, setCurrentName] = useState("");
  const [currentPlayerNames, setCurrentPlayerNames] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [names, setNames] = useState({});

  const addName = () => {
    if (currentName.trim() && currentPlayerNames.length < 3) {
      const updatedNames = [...currentPlayerNames, currentName.trim()];
      setCurrentPlayerNames(updatedNames);
      setCurrentName("");
    }
  };

  const deleteName = (index) => {
    const updatedNames = [...currentPlayerNames];
    updatedNames.splice(index, 1);
    setCurrentPlayerNames(updatedNames);
  };

  const confirmNames = () => {
    if (currentPlayerNames.length < 3) {
      Alert.alert("More Names Needed", "Please add at least 3 celebrities.", [
        { text: "OK" },
      ]);
      return;
    }
    const newNames = { ...names, [players[currentIndex]]: currentPlayerNames };
    setNames(newNames);
    if (currentIndex + 1 < players.length) {
      setCurrentPlayerNames([]);
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate("MSTeamCreation", {
        players,
        names: Object.values(newNames).flat(),
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient colors={["#D68E8D", "#FA922F"]} style={styles.container}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>{players[currentIndex]}'s Turn</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter a celebrity name"
              placeholderTextColor="#ccc"
              value={currentName}
              onChangeText={setCurrentName}
              onSubmitEditing={addName}
              returnKeyType="done"
              editable={currentPlayerNames.length < 3}
            />
            {currentPlayerNames.length < 3 && (
              <TouchableOpacity onPress={addName} style={styles.button}>
                <Text style={styles.buttonText}>Add Name</Text>
              </TouchableOpacity>
            )}
            {currentPlayerNames.map((name, index) => (
              <View key={index} style={styles.nameContainer}>
                <Text style={styles.captionText}>{name}</Text>
                <TouchableOpacity onPress={() => deleteName(index)}>
                  <Ionicons name="close-circle" size={24} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={confirmNames}
              style={styles.button}
              disabled={currentPlayerNames.length < 3}
            >
              <Text style={styles.buttonText}>Confirm Names</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  footer: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  input: {
    height: 70,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "#fff",
    borderColor: "#fff",
    borderRadius: 20,
    width: "80%",
    fontSize: 20,
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
    alignSelf: "center",
    marginBottom: 20,
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
  },
  text: {
    fontSize: 30,
    fontFamily: "Noteworthy-Light",
    color: "#FFFFFF",
    textAlign: "center",
    margin: 20,
  },
  captionBox: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  captionText: {
    color: "#333",
    fontSize: 16,
    fontFamily: "Noteworthy-Light",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
  },
});

export default MargreteSkaalNames;
