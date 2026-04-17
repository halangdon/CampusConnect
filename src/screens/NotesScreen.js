import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Portal, Modal, TextInput, Card, IconButton, Checkbox, Button } from 'react-native-paper';
import { auth, db } from '../services/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { theme } from '../theme';

export default function NotesScreen() {
  const [notes, setNotes] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      if (snapshot.exists() && snapshot.data().notes) {
        setNotes(snapshot.data().notes);
      } else {
        setNotes([]);
      }
    });
    return unsubscribe;
  }, [user]);

  const saveNotes = async (newNotes) => {
    try {
      if (!user) return;
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { notes: newNotes }, { merge: true });
    } catch (e) {
      console.error('Failed to save notes', e);
    }
  };

  const addNote = () => {
    if (!newNoteText.trim()) {
      return;
    }

    const newNote = {
      id: Date.now().toString(),
      text: newNoteText.trim(),
      completed: false,
    };

    const updatedNotes = [newNote, ...notes];
    saveNotes(updatedNotes);

    setNewNoteText('');
    setModalVisible(false);
  };

  const toggleComplete = (id) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, completed: !note.completed } : note
    );
    saveNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    Alert.alert('Delete Note', 'Are you sure you want to remove this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updatedNotes = notes.filter(item => item.id !== id);
          saveNotes(updatedNotes);
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notes.length === 0 ? (
          <View style={styles.emptyState}>
            <Text variant="bodyLarge" style={styles.emptyText}>
              No notes yet. Tap the + button to add one!
            </Text>
          </View>
        ) : (
          notes.map((note) => (
            <Card key={note.id} style={styles.card} mode="elevated" onPress={() => toggleComplete(note.id)}>
              <Card.Title
                title={note.text}
                titleVariant="bodyLarge"
                titleStyle={{
                  textDecorationLine: note.completed ? 'line-through' : 'none',
                  color: note.completed ? theme.colors.muted : theme.colors.text,
                }}
                titleNumberOfLines={4}
                left={(props) => (
                  <Checkbox
                    status={note.completed ? 'checked' : 'unchecked'}
                    onPress={() => toggleComplete(note.id)}
                    color={theme.colors.primary}
                  />
                )}
                right={(props) => (
                  <IconButton
                    {...props}
                    icon="delete-outline"
                    iconColor={theme.colors.error}
                    onPress={() => deleteNote(note.id)}
                  />
                )}
              />
            </Card>
          ))
        )}
      </ScrollView>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type a note..."
            value={newNoteText}
            onChangeText={setNewNoteText}
            mode="outlined"
            style={styles.input}
            activeOutlineColor={theme.colors.primary}
            onSubmitEditing={addNote}
          />
          <IconButton
            icon="plus-circle"
            iconColor={theme.colors.primary}
            size={36}
            onPress={addNote}
            disabled={!newNoteText.trim()}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.medium,
    paddingBottom: 100, // Space for input container
  },
  emptyState: {
    paddingTop: 50,
    alignItems: 'center',
  },
  emptyText: {
    color: theme.colors.muted,
  },
  card: {
    marginBottom: theme.spacing.small,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
  },
  keyboardAvoid: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    height: 48,
  },
});
