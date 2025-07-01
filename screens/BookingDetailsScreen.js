import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const BookingScreen = ({ route, navigation }) => {
  const { item } = route.params || {};
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const seatLayout = [
    ['A1', 'A2', 'A3', 'A4'],
    ['B1', 'B2', 'B3', 'B4'],
    ['C1', 'C2', 'C3', 'C4'],
    ['D1', 'D2', 'D3', 'D4']
  ];

  const showtimes = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const toggleSeatSelection = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  // ✅ Function to navigate to PaymentScreen
  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0 || !selectedShowtime) {
      alert("Please select seats and a showtime before proceeding!");
      return;
    }

    navigation.navigate('Payment', {
      item, // Pass the selected movie or flight item
      selectedSeats, 
      selectedShowtime
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Booking for {item?.name || "Your Flight"}</Text>
        <Text style={styles.price}>Price per Seat: {item?.price || "$100"}</Text>

        <Text style={styles.label}>Select Showtime</Text>
        <View style={styles.showtimeContainer}>
          {showtimes.map((time) => (
            <TouchableOpacity 
              key={time} 
              style={[styles.showtimeButton, selectedShowtime === time && { backgroundColor: '#4CAF50' }]} 
              onPress={() => setSelectedShowtime(time)}
            >
              <Text style={[styles.showtimeText, selectedShowtime === time && { color: 'white' }]}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Select Seats</Text>
        <ScrollView contentContainerStyle={styles.seatLayout}>
          {seatLayout.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.seatRow}>
              {row.map((seat) => (
                <TouchableOpacity 
                  key={seat} 
                  style={[styles.seatButton, selectedSeats.includes(seat) && { backgroundColor: '#FF6F00' }]} 
                  onPress={() => toggleSeatSelection(seat)}
                >
                  <MaterialIcons name="event-seat" size={26} color={selectedSeats.includes(seat) ? 'white' : '#004AAD'} />
                  <Text style={[styles.seatText, selectedSeats.includes(seat) && { color: 'white' }]}>{seat}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={handleProceedToPayment}>
          <Ionicons name="checkmark-circle" size={24} color="white" />
          <Text style={styles.buttonText}> Proceed to Payment</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#004AAD' },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10 },
  content: { width: '90%', padding: 30, backgroundColor: 'white', borderRadius: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#004AAD', marginBottom: 15 },
  price: { fontSize: 18, fontWeight: 'bold', color: '#004AAD', marginBottom: 15 },
  label: { fontSize: 18, fontWeight: 'bold', color: '#004AAD', marginBottom: 10 },
  showtimeContainer: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 10 },
  showtimeButton: { padding: 10, margin: 5, borderWidth: 2, borderColor: '#004AAD', borderRadius: 10 },
  showtimeText: { fontSize: 16, fontWeight: 'bold', color: '#004AAD' },
  seatLayout: { alignItems: 'center', width: '100%', marginBottom: 20 },
  seatRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  seatButton: { padding: 10, borderWidth: 2, borderColor: '#004AAD', borderRadius: 10, alignItems: 'center', margin: 5, width: 60 },
  seatText: { fontSize: 14, fontWeight: 'bold', color: '#004AAD' },
  button: { backgroundColor: '#004AAD', flexDirection: 'row', padding: 18, borderRadius: 15, width: '85%', alignItems: 'center', justifyContent: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: 10 },
});

export default BookingScreen;
