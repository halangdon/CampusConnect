import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, Card } from 'react-native-paper';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { theme } from '../theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
      <View style={styles.formContainer}>
        <Text variant="displaySmall" style={styles.title}>CampusConnect</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>Sign in to continue</Text>

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
              secureTextEntry
              style={styles.input}
              activeOutlineColor={theme.colors.primary}
            />
            
            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.button}
              buttonColor={theme.colors.primary}
            >
              Log In
            </Button>
            
            <Button
              mode="text"
              onPress={() => navigation.navigate('Register')}
              style={styles.linkButton}
              textColor={theme.colors.muted}
            >
              Don't have an account? Register
            </Button>
          </Card.Content>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.medium,
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
  errorText: {
    color: theme.colors.error,
    marginBottom: 16,
    textAlign: 'center',
  }
});
