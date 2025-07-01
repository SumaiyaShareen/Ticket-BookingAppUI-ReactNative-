import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const ProfileScreen = () => {
  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Feature coming soon!");
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => console.log("User Logged Out"), style: "destructive" }
    ]);
  };

  return (
    <View style={styles.container}>
      {/* User Profile Card */}
      <View style={styles.profileCard}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/50.jpg' }} // Random user image
          style={styles.avatar}
        />
        <Text style={styles.name}>Sumaiya</Text>
        <Text style={styles.email}>sumaiya@example.com</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Options List */}
      <View style={styles.optionsContainer}>
        <OptionItem icon="ticket-alt" text="My Bookings" />
        <OptionItem icon="credit-card" text="Payment Methods" />
        <OptionItem icon="cog" text="Settings" />
        <OptionItem icon="question-circle" text="Help & Support" />
        <OptionItem icon="sign-out-alt" text="Logout" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
};

// Reusable Option Item Component
const OptionItem = ({ icon, text, onPress, color = "#333" }) => (
  <TouchableOpacity style={styles.optionItem} onPress={onPress}>
    <FontAwesome5 name={icon} size={22} color={color} />
    <Text style={[styles.optionText, { color }]}>{text}</Text>
    <MaterialIcons name="keyboard-arrow-right" size={24} color="#999" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2', // Light Grey Background
    paddingHorizontal: 20,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 30,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#007BFF',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  editButton: {
    marginTop: 12,
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  editText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 12,
    fontWeight: '500',
  },
});

export default ProfileScreen;
