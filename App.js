import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import BookingDetailsScreen from './screens/BookingDetailsScreen';
import PaymentScreen from './screens/PaymentScreen';
import MyBookingsScreen from './screens/MyBookingsScreen';
import ProfileScreen from './screens/ProfileScreen';

// Create Stack Navigator for Booking Process
const Stack = createStackNavigator();
const BookingStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
  </Stack.Navigator>
);

// Create Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // 🔹 Hides the header for all tabs
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Search') iconName = 'search';
            else if (route.name === 'MyBookings') iconName = 'event-note';
            else if (route.name === 'Profile') iconName = 'person';

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#ddd',
            paddingBottom: 5,
            height: 60,
          },
        })}
      >
        <Tab.Screen name="Home" component={BookingStack} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="MyBookings" component={MyBookingsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App; 