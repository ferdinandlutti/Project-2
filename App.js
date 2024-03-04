import Home from "./screens/Home";
import Register from "./screens/Register";
import RegisterPlayer from "./screens/RegisterPlayer";
import GameScreen from "./screens/GameScreen";
import firstRoundScreen from "./screens/gameScreens/firstRoundScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DataProvider } from "./context/DataContext";
import firstRoundScreen2 from "./screens/gameScreens/firstRoundScreen2";
import firstRoundScreen3 from "./screens/gameScreens/firstRoundScreen3";
import firstRoundScreen4 from "./screens/gameScreens/firstRoundScreen4";
import secondRoundScreen from "./screens/gameScreens/secondRoundScreen";
import secondRoundScreen2 from "./screens/gameScreens/secondRoundScreen2";
import secondRoundScreen3 from "./screens/gameScreens/secondRoundScreen3";
import thirdRoundScreen from "./screens/gameScreens/thirdRoundScreen";
import thirdRoundScreen2 from "./screens/gameScreens/thirdRoundScreen2";
thirdRoundScreen3;

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
              headerBackTitleVisible: false,
              headerTintColor: "black",
            }}
          />
          <Stack.Screen
            name="Register Player"
            component={RegisterPlayer}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
              headerBackTitleVisible: false,
              headerTintColor: "black",
            }}
          />
          <Stack.Screen
            name="GameScreen"
            component={GameScreen}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
              headerBackTitleVisible: false,
              headerTintColor: "black",
            }}
          />
          <Stack.Screen name="firstRoundScreen" component={firstRoundScreen} />
          <Stack.Screen
            name="firstRoundScreen2"
            component={firstRoundScreen2}
          />
          <Stack.Screen
            name="firstRoundScreen3"
            component={firstRoundScreen3}
          />
          <Stack.Screen
            name="firstRoundScreen4"
            component={firstRoundScreen4}
          />
          <Stack.Screen
            name="secondRoundScreen"
            component={secondRoundScreen}
          />
          <Stack.Screen
            name="secondRoundScreen2"
            component={secondRoundScreen2}
          />
          <Stack.Screen
            name="secondRoundScreen3"
            component={secondRoundScreen3}
          />
          <Stack.Screen name="thirdRoundScreen" component={thirdRoundScreen} />
          <Stack.Screen
            name="thirdRoundScreen2"
            component={thirdRoundScreen2}
          />
          <Stack.Screen
            name="thirdRoundScreen3"
            component={thirdRoundScreen3}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
