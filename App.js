import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import QuizScreen from './QuizScreen';
import GalleryScreen from './GalleryScreen';
import TasksScreen from './TasksScreen';
import GeolocationScreen from './GeolocationScreen';
import ChartsScreen from './ChartsScreen';
import AuthScreen from './AuthScreen';
import WeatherScreen from './WeatherScreen';
import ContactScreen from './ContactScreen';
import AboutScreen from './AboutScreen';
import SpeechScreen from './SpeechScreen';
import CameraScreen from './CameraScreen';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Quiz" component={QuizScreen} />
      <Drawer.Screen name="Gallery" component={GalleryScreen} />
      <Drawer.Screen name="Tasks" component={TasksScreen} />
      <Drawer.Screen name="Geolocation" component={GeolocationScreen} />
      <Drawer.Screen name="Charts" component={ChartsScreen} />
      <Drawer.Screen name="Auth" component={AuthScreen} />
      <Drawer.Screen name="Synthesizer" component={SpeechScreen} />
      <Drawer.Screen name="Weather" component={WeatherScreen} />
      <Drawer.Screen name="Contact" component={ContactScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Camera" component={CameraScreen} />
    </Drawer.Navigator>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {!isLoggedIn ? (
          <Stack.Screen name="Login">
            {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{ headerShown: false }} // Ocultar o cabeçalho padrão
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
