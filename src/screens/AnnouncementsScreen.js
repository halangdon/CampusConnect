import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../services/firebase';
import { theme } from '../theme';

export default function AnnouncementsScreen() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

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
