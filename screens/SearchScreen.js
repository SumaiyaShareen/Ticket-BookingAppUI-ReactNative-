import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Image, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const HomeScreen = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      // New API (OMDb API - Change API Key if needed)
      const response = await axios.get('https://www.omdbapi.com/?s=avengers&apikey=564727fa');

      if (response.data.Search) {
        const movieData = response.data.Search.map((item) => ({
          id: item.imdbID,
          title: item.Title,
          poster: item.Poster !== "N/A" ? item.Poster : null, // Check if image exists
          releaseDate: item.Year || "Unknown",
        }));

        setMovies(movieData);
        setLoading(false);
      } else {
        console.error("No data found!");
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
      setLoading(false);
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ImageBackground
      source={{ uri: 'https://source.unsplash.com/1600x900/?cinema,movie' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>🎬 Movie Ticket Booking</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="🔍 Search by Movie Title..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <FlatList
            data={filteredMovies}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                {item.poster ? (
                  <Image source={{ uri: item.poster }} style={styles.poster} />
                ) : (
                  <Text style={styles.noImage}>🚫 No Image Available</Text>
                )}
                <Text style={styles.movieTitle}>{item.title}</Text>
                <Text style={styles.details}>📅 Release Date: {item.releaseDate}</Text>
              </View>
            )}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
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
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  noImage: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    paddingVertical: 50,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginTop: 3,
  },
});

export default HomeScreen;
