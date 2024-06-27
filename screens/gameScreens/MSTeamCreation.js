import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const MSTeamCreation = ({ route, navigation }) => {
  const { players, names } = route.params;
  const [selectedTeamCount, setSelectedTeamCount] = useState(null);
  const [teams, setTeams] = useState([]);

  const calculateTeamOptions = () => {
    let options = [];
    for (let i = 2; i <= Math.ceil(players.length / 2); i++) {
      if (players.length % i === 0 && players.length / i >= 2) {
        options.push(i);
      }
    }
    if (players.length / 2 >= 2 && !options.includes(2)) {
      options.push(2);
    }
    return options.sort();
  };

  const createTeams = () => {
    let shuffledPlayers = [...players].sort(() => 0.5 - Math.random()); // Shuffle players
    let teams = Array.from({ length: selectedTeamCount }, () => []);
    shuffledPlayers.forEach((player, index) => {
      teams[index % selectedTeamCount].push(player);
    });
    setTeams(teams);
    navigation.navigate("MSTeamsScreen", { teams, names });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select the number of teams:</Text>
      <Picker
        selectedValue={selectedTeamCount}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedTeamCount(itemValue)
        }
      >
        {calculateTeamOptions().map((option, index) => (
          <Picker.Item key={index} label={`${option} teams`} value={option} />
        ))}
      </Picker>
      <TouchableOpacity
        style={styles.button}
        onPress={createTeams}
        disabled={!selectedTeamCount}
      >
        <Text style={styles.buttonText}>Create Teams</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  picker: {
    width: 200,
    height: 44,
  },
  button: {
    backgroundColor: "skyblue",
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
  },
});

export default MSTeamCreation;
