import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, MD3LightTheme, IconButton } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './src/services/firebase';
import { theme } from './src/theme';

// Screen Imports
import ScheduleScreen from './src/screens/ScheduleScreen';
import NotesScreen from './src/screens/NotesScreen';
import AnnouncementsScreen from './src/screens/AnnouncementsScreen';
import MapScreen from './src/screens/MapScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const customTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: theme.colors.primary,
    secondaryContainer: '#e8f0fe',
  },
};

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <PaperProvider theme={customTheme}>
      <NavigationContainer>
        {user ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === 'Schedule') iconName = 'calendar-clock';
                else if (route.name === 'Notes') iconName = 'notebook-edit';
                else if (route.name === 'Announcements') iconName = 'bullhorn';
                else if (route.name === 'Map') iconName = 'map-marker-radius';
                return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: theme.colors.primary,
              tabBarInactiveTintColor: 'gray',
              headerStyle: { backgroundColor: theme.colors.primary },
              headerTintColor: '#fff',
              headerTitleAlign: 'center',
              headerRight: () => (
                <IconButton 
                  icon="logout" 
                  iconColor="#fff" 
                  onPress={() => signOut(auth)} 
                />
              ),
            })}
          >
            <Tab.Screen name="Schedule" component={ScheduleScreen} />
            <Tab.Screen name="Notes" component={NotesScreen} />
            <Tab.Screen name="Announcements" component={AnnouncementsScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
