import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import axios from 'axios';

const MyBookingsScreen = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // Placeholder API for movies (Replace this with real booking API)
      const response = await axios.get('https://www.omdbapi.com/?s=avengers&apikey=564727fa');

      if (response.data.Search) {
        const bookingData = response.data.Search.slice(0, 5).map((item, index) => ({
          id: item.imdbID,
          title: item.Title,
          date: `2025-0${index + 1}-15`, // Dummy date (Format: YYYY-MM-DD)
          status: index % 2 === 0 ? 'Confirmed' : 'Pending', // Alternate status
          poster: item.Poster !== "N/A" ? item.Poster : null,
        }));

        setBookings(bookingData);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchBookings();
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎟 My Bookings</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.poster ? (
                <Image source={{ uri: item.poster }} style={styles.poster} />
              ) : (
                <Text style={styles.noImage}>🚫 No Image Available</Text>
              )}
              <View style={styles.details}>
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.info}>📅 Date: {item.date}</Text>
                <Text style={[styles.status, item.status === 'Confirmed' ? styles.confirmed : styles.pending]}>
                  {item.status}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  noImage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    paddingVertical: 50,
  },
  details: {
    flex: 1,
    marginLeft: 15,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#555',
    marginTop: 3,
  },
  status: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    textAlign: 'center',
    width: 100,
  },
  confirmed: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  pending: {
    backgroundColor: '#FFC107',
    color: '#fff',
  },
});

export default MyBookingsScreen;
