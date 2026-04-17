import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { getWeather } from '../services/weatherService';
import { theme } from '../theme';

export default function AnnouncementsScreen() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    getWeather('Cebu').then(data => setWeather(data));
  }, []);

  useEffect(() => {
    // If the collection doesn't exist, this will just return empty.
    const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAnnouncements(data);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching announcements:', error);
      // Wait, if no index exists or permission denied, it will throw. 
      // The app will just show an empty list or console.error.
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {weather && (
            <Card style={styles.weatherCard} mode="elevated">
              <Card.Content style={styles.weatherContent}>
                <View>
                  <Text variant="titleLarge" style={styles.weatherCity}>{weather.name}</Text>
                  <Text variant="bodyMedium" style={{ color: 'white' }}>{weather.weather[0].main} • {weather.weather[0].description}</Text>
                </View>
                <View style={styles.weatherRight}>
                  <MaterialCommunityIcons name="weather-partly-cloudy" size={32} color="white" />
                  <Text variant="headlineMedium" style={styles.weatherTemp}>{Math.round(weather.main.temp)}°</Text>
                </View>
              </Card.Content>
            </Card>
          )}

          <Text variant="titleMedium" style={styles.sectionHeader}>Latest Updates</Text>

          {announcements.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20, color: theme.colors.muted }}>
              No announcements at the moment. Add some in Firebase Console!
            </Text>
          ) : (
            announcements.map((announcement) => (
              <Card key={announcement.id} style={styles.card} mode="elevated">
                <Card.Content>
                  <Text variant="titleMedium" style={styles.cardTitle}>
                    {announcement.title}
                  </Text>
                  <Text variant="labelSmall" style={styles.cardDate}>
                    {announcement.date}
                  </Text>
                  <Text variant="bodyMedium" style={styles.cardBody}>
                    {announcement.body}
                  </Text>
                </Card.Content>
              </Card>
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: theme.spacing.medium,
  },
  weatherCard: {
    marginBottom: theme.spacing.large,
    backgroundColor: '#0ea5e9',
    borderRadius: theme.roundness,
  },
  weatherContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weatherCity: {
    color: 'white',
    fontWeight: 'bold',
  },
  weatherRight: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  weatherTemp: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionHeader: {
    fontWeight: 'bold',
    marginBottom: 12,
    color: theme.colors.primary,
  },
  card: {
    marginBottom: theme.spacing.medium,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  cardDate: {
    color: theme.colors.muted,
    marginBottom: 8,
  },
  cardBody: {
    color: theme.colors.text,
    lineHeight: 20,
  },
});
