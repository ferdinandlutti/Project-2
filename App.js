import Home from "./screens/Home";
import Register from "./screens/Register";
import RegisterPlayer from "./screens/RegisterPlayer";
import GameScreen from "./screens/GameScreen";
import FirstRoundScreen from "./screens/gameScreens/FirstRoundScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DataProvider } from "./context/DataContext";
import FirstRoundScreen2 from "./screens/gameScreens/FirstRoundScreen2";
import FirstRoundScreen3 from "./screens/gameScreens/FirstRoundScreen3";
import FirstRoundScreen4 from "./screens/gameScreens/FirstRoundScreen4";
import SecondRoundScreen from "./screens/gameScreens/SecondRoundScreen";
import SecondRoundScreen2 from "./screens/gameScreens/SecondRoundScreen2";
import SecondRoundScreen3 from "./screens/gameScreens/SecondRoundScreen3";
import ThirdRoundScreen from "./screens/gameScreens/ThirdRoundScreen";
import ThirdRoundScreen2 from "./screens/gameScreens/ThirdRoundScreen2";
import ReactionGameScreen from "./screens/gameScreens/ReactionGameScreen";
import ReactionResultsScreen from "./screens/gameScreens/ReactionResultsScreen";
import ReactionLeaderboard from "./screens/gameScreens/ReactionLeaderboard";
import MusicElimination from "./screens/gameScreens/MusicElimination";
import SimpleChallenges from "./screens/gameScreens/SimpleChallenges";
import ChooseCaptionGif from "./screens/gameScreens/CaptionGame/ChooseCaptionGif";
import SubmitCaptionScreen from "./screens/gameScreens/CaptionGame/SubmitCaptionScreen";
import CaptionGameIntro from "./screens/gameScreens/CaptionGame/CaptionGameIntro";
import CaptionVoteScreen from "./screens/gameScreens/CaptionGame/CaptionVoteScreen";
import CaptionLeaderboardScreen from "./screens/gameScreens/CaptionGame/CaptionLeaderBoardScreen";
import HeadToHeadIntro from "./screens/gameScreens/ReactionH2H/HeadToHeadIntro";
import HeadToHeadChoose from "./screens/gameScreens/ReactionH2H/HeadToHeadChoose";
import HeadToHeadBattleScreen from "./screens/gameScreens/ReactionH2H/HeadToHeadBattleScreen";
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
          <Stack.Screen name="FirstRoundScreen" component={FirstRoundScreen} />
          <Stack.Screen
            name="FirstRoundScreen2"
            component={FirstRoundScreen2}
          />
          <Stack.Screen
            name="FirstRoundScreen3"
            component={FirstRoundScreen3}
          />
          <Stack.Screen
            name="FirstRoundScreen4"
            component={FirstRoundScreen4}
          />
          <Stack.Screen
            name="SecondRoundScreen"
            component={SecondRoundScreen}
          />
          <Stack.Screen
            name="SecondRoundScreen2"
            component={SecondRoundScreen2}
          />
          <Stack.Screen
            name="SecondRoundScreen3"
            component={SecondRoundScreen3}
          />
          <Stack.Screen name="ThirdRoundScreen" component={ThirdRoundScreen} />
          <Stack.Screen
            name="ThirdRoundScreen2"
            component={ThirdRoundScreen2}
          />
          <Stack.Screen
            name="ReactionGameScreen"
            component={ReactionGameScreen}
          />
          <Stack.Screen
            name="ReactionResultsScreen"
            component={ReactionResultsScreen}
          />
          <Stack.Screen
            name="ReactionLeaderboard"
            component={ReactionLeaderboard}
          />
          <Stack.Screen name="MusicElimination" component={MusicElimination} />
          <Stack.Screen name="SimpleChallenges" component={SimpleChallenges} />
          <Stack.Screen name="CaptionGameIntro" component={CaptionGameIntro} />

          <Stack.Screen name="ChooseCaptionGif" component={ChooseCaptionGif} />
          <Stack.Screen
            name="SubmitCaptionScreen"
            component={SubmitCaptionScreen}
          />
          <Stack.Screen
            name="CaptionVoteScreen"
            component={CaptionVoteScreen}
          />
          <Stack.Screen
            name="CaptionLeaderboardScreen"
            component={CaptionLeaderboardScreen}
          />
          <Stack.Screen name="HeadToHeadIntro" component={HeadToHeadIntro} />
          <Stack.Screen name="HeadToHeadChoose" component={HeadToHeadChoose} />
          <Stack.Screen
            name="HeadToHeadBattleScreen"
            component={HeadToHeadBattleScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}
