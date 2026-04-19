import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, IconButton, Portal, Modal, Checkbox } from 'react-native-paper';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { theme } from '../theme';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully!');
      // Navigation is handled via App.js auth listener
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <IconButton 
          icon="information" 
          iconColor="white" 
          size={28} 
          onPress={() => setIsInfoVisible(true)} 
        />
      </View>

      <View style={styles.formContainer}>
        <Text variant="displaySmall" style={styles.title}>CampusConnect</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>Create your account</Text>

        <Card style={styles.card} mode="elevated">
          <Card.Content>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <TextInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              activeOutlineColor={theme.colors.primary}
            />
            
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry={!showPassword}
              style={styles.input}
              activeOutlineColor={theme.colors.primary}
            />

            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              secureTextEntry={!showPassword}
              style={styles.input}
              activeOutlineColor={theme.colors.primary}
            />

            <View style={styles.checkboxRow}>
              <Checkbox
                status={showPassword ? 'checked' : 'unchecked'}
                onPress={() => setShowPassword(!showPassword)}
                color={theme.colors.primary}
              />
              <Text variant="bodySmall" style={styles.checkboxLabel} onPress={() => setShowPassword(!showPassword)}>
                Show password
              </Text>
            </View>

            <Button
              mode="contained"
              onPress={handleRegister}
              loading={loading}
              disabled={loading}
              style={styles.button}
              buttonColor={theme.colors.primary}
            >
              Register
            </Button>
            
            <Button
              mode="text"
              onPress={() => navigation.goBack()}
              style={styles.linkButton}
              textColor={theme.colors.muted}
            >
              Already have an account? Log In
            </Button>
          </Card.Content>
        </Card>
      </View>

      <Portal>
        <Modal 
          visible={isInfoVisible} 
          onDismiss={() => setIsInfoVisible(false)} 
          contentContainerStyle={styles.modalContent}
        >
          <ScrollView>
            <Text variant="headlineSmall" style={styles.modalTitle}>About CampusConnect</Text>
            
            <View style={styles.infoSection}>
              <Text variant="labelLarge" style={styles.infoLabel}>Version</Text>
              <Text variant="bodyMedium">1.0.0 (Stable Release)</Text>
            </View>

            <View style={styles.infoSection}>
              <Text variant="labelLarge" style={styles.infoLabel}>Purpose</Text>
              <Text variant="bodyMedium">
                Integrated digital hub for Informatics College Consolacion students to manage schedules, notes, and campus navigation.
              </Text>
            </View>

            <View style={styles.infoSection}>
              <Text variant="labelLarge" style={styles.infoLabel}>Key Features</Text>
              <Text variant="bodyMedium">• Dynamic Class Scheduling</Text>
              <Text variant="bodyMedium">• Personal To-Do Tracker</Text>
              <Text variant="bodyMedium">• Real-time Campus Announcements</Text>
              <Text variant="bodyMedium">• Google Maps Integration</Text>
              <Text variant="bodyMedium">• Live Weather Updates (Mandaue/Consolacion)</Text>
            </View>

            <View style={styles.infoSection}>
              <Text variant="labelLarge" style={styles.infoLabel}>Developer</Text>
              <Text variant="bodyMedium">Junlee Marc M Pepito</Text>
              <Text variant="bodySmall" style={{ color: theme.colors.muted }}>App Dev Yr 2</Text>
            </View>

            <Button 
              mode="contained" 
              onPress={() => setIsInfoVisible(false)}
              style={{ marginTop: 24 }}
              buttonColor={theme.colors.primary}
            >
              Close
            </Button>

            <Text variant="labelSmall" style={styles.copyrightText}>
              (c) 2026 | JUNL.EE
            </Text>
          </ScrollView>
        </Modal>
      </Portal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  header: {
    height: 60,
    marginTop: Platform.OS === 'android' ? 30 : 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  formContainer: {
    flex: 1,
    padding: theme.spacing.medium,
    marginTop: -40, // Pull up to center better with the info icon above
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 32,
  },
  card: {
    backgroundColor: theme.colors.surface,
    paddingVertical: 16,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 8,
    paddingVertical: 4,
  },
  linkButton: {
    marginTop: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkboxLabel: {
    color: theme.colors.muted,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    margin: 20,
    borderRadius: 16,
    maxHeight: '80%',
  },
  modalTitle: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 20,
  },
  infoSection: {
    marginBottom: 16,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  copyrightText: {
    textAlign: 'center',
    marginTop: 16,
    color: theme.colors.muted,
  }
});
