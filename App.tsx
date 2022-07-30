import NetInfo from "@react-native-community/netinfo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import "react-native-gesture-handler";
import ErrorModal from "./src/components/ErrorModal";
import CustomNavigationComponent from "./src/CustomNavigation";
import Home from "./src/screens/Home";
import Rockets from "./src/screens/Rockets";

const Tab = createBottomTabNavigator();

export default function App() {
  const [isOffline, setOfflineStatus] = React.useState(false);

  React.useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
    return () => removeNetInfoSubscription();
  }, []);

  if (isOffline) {
    return <ErrorModal visible={true} error={"No internet connection!"} />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Rockets" component={Rockets} />
        <Tab.Screen name="CrewMembersList" component={CustomNavigationComponent} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
