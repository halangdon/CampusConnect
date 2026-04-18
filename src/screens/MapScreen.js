import React from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { Text, Button, Card, List } from 'react-native-paper';
import { theme } from '../theme';

export default function MapScreen() {
  const openMaps = () => {
    Linking.openURL('https://maps.google.com/?q=Informatics+College+Consolacion');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>Campus Map</Text>
        
        <Card style={styles.card} mode="elevated">
          <Card.Content style={styles.cardContent}>
            <Text variant="titleMedium" style={styles.subtitle}>Open in Navigation App</Text>
            <Text variant="bodyMedium" style={styles.cardText}>
              Get detailed directions to Informatics College Consolacion using Google Maps. 
            </Text>
            <Text variant="bodySmall" style={styles.noteText}>
              Note: The Google Maps pin is slightly inaccurate. The campus is located right beside Paengs Chicken Consolacion.
            </Text>
            <Button 
              icon="map-search" 
              mode="contained" 
              onPress={openMaps} 
              style={styles.button}
              buttonColor={theme.colors.primary}
            >
              Open Google Maps
            </Button>
          </Card.Content>
        </Card>

        <Text variant="titleLarge" style={styles.listTitle}>Key Locations</Text>
        <Card mode="outlined" style={styles.listCard}>
          <List.Item
            title="Main Library"
            description="Building A"
            left={props => <List.Icon {...props} icon="book-open-variant" color={theme.colors.primary} />}
          />
          <List.Item
            title="Student Canteen"
            description="Building A"
            left={props => <List.Icon {...props} icon="food" color="#d97706" />}
          />
          <List.Item
            title="Admin Office"
            description="Building A"
            left={props => <List.Icon {...props} icon="office-building" color="#7c3aed" />}
          />
          <List.Item
            title="IT Department"
            description="Building A"
            left={props => <List.Icon {...props} icon="laptop" color="#0d9488" />}
          />
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.medium,
  },
  title: {
    marginBottom: theme.spacing.medium,
    color: theme.colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    marginBottom: theme.spacing.large,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  subtitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    textAlign: 'center',
    marginBottom: 8,
    color: theme.colors.text,
  },
  noteText: {
    textAlign: 'center',
    marginBottom: 16,
    color: theme.colors.error,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    borderRadius: 8,
  },
  listTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    color: theme.colors.text,
  },
  listCard: {
    backgroundColor: theme.colors.surface,
  }
});
