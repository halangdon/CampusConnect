import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, FAB, Portal, Modal, TextInput, Button, Card, IconButton, Chip } from 'react-native-paper';
import { auth, db } from '../services/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { theme } from '../theme';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function ScheduleScreen() {
  const [schedule, setSchedule] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  
  // Form State
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [room, setRoom] = useState('');
  const [selectedDays, setSelectedDays] = useState(['Mon']);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      if (snapshot.exists() && snapshot.data().schedule) {
        setSchedule(snapshot.data().schedule);
      } else {
        setSchedule([]);
      }
    });
    return unsubscribe;
  }, [user]);

  const saveSchedule = async (newSchedule) => {
    try {
      if (!user) return;
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, { schedule: newSchedule }, { merge: true });
    } catch (e) {
      console.error('Failed to save schedule', e);
    }
  };

  const addClass = () => {
    if (!subject.trim() || !time.trim() || !room.trim()) {
      Alert.alert('Missing Fields', 'Please fill in all fields (Subject, Time, Room).');
      return;
    }

    if (selectedDays.length === 0) {
      Alert.alert('Missing Fields', 'Please select at least one day.');
      return;
    }

    const newClasses = selectedDays.map(day => ({
      id: Date.now().toString() + '-' + day,
      subject,
      time,
      room,
      day: day,
    }));

    const updatedSchedule = [...schedule, ...newClasses];
    saveSchedule(updatedSchedule);

    // Reset Form
    setSubject('');
    setTime('');
    setRoom('');
    setSelectedDays(['Mon']);
    setModalVisible(false);
  };

  const deleteClass = (id) => {
    Alert.alert('Delete Class', 'Are you sure you want to remove this class?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Delete', 
        style: 'destructive',
        onPress: () => {
          const updatedSchedule = schedule.filter(item => item.id !== id);
          saveSchedule(updatedSchedule);
        }
      }
    ]);
  };

  // Group schedule by day
  const groupedSchedule = DAYS.map(day => ({
    day,
    classes: schedule.filter(item => item.day === day)
  })).filter(group => group.classes.length > 0);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {groupedSchedule.length === 0 ? (
          <View style={styles.emptyState}>
            <Text variant="bodyLarge" style={{ color: theme.colors.muted }}>
              No classes heavily scheduled yet. Tap + to add!
            </Text>
          </View>
        ) : (
          groupedSchedule.map((group) => (
            <View key={group.day} style={styles.dayGroup}>
              <Text variant="titleMedium" style={styles.dayHeader}>{group.day}</Text>
              {group.classes.map((cls) => (
                <Card key={cls.id} style={styles.card} mode="elevated">
                  <Card.Title 
                    title={cls.subject} 
                    titleVariant="titleMedium"
                    titleStyle={{ fontWeight: 'bold' }}
                    subtitle={`${cls.time} • ${cls.room}`}
                    right={(props) => (
                      <IconButton {...props} icon="delete-outline" iconColor={theme.colors.error} onPress={() => deleteClass(cls.id)} />
                    )}
                  />
                </Card>
              ))}
            </View>
          ))
        )}
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      />

      <Portal>
        <Modal visible={isModalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalContainer}>
          <Text variant="headlineSmall" style={styles.modalTitle}>Add New Class</Text>
          
          <View style={styles.daysGrid}>
            {DAYS.map(day => (
              <Chip
                key={day}
                mode="outlined"
                selected={selectedDays.includes(day)}
                onPress={() => {
                  if (selectedDays.includes(day)) {
                    setSelectedDays(selectedDays.filter(d => d !== day));
                  } else {
                    setSelectedDays([...selectedDays, day]);
                  }
                }}
                style={[styles.dayChip, selectedDays.includes(day) && styles.dayChipSelected]}
                textStyle={selectedDays.includes(day) && { color: 'white' }}
              >
                {day}
              </Chip>
            ))}
          </View>

          <TextInput
            label="Subject (e.g. Math 101)"
            value={subject}
            onChangeText={setSubject}
            mode="outlined"
            style={styles.input}
            activeOutlineColor={theme.colors.primary}
          />
          <TextInput
            label="Time (e.g. 08:00 AM)"
            value={time}
            onChangeText={setTime}
            mode="outlined"
            style={styles.input}
            activeOutlineColor={theme.colors.primary}
          />
          <TextInput
            label="Room (e.g. Room A10)"
            value={room}
            onChangeText={setRoom}
            mode="outlined"
            style={styles.input}
            activeOutlineColor={theme.colors.primary}
          />

          <View style={styles.modalActions}>
            <Button mode="text" onPress={() => setModalVisible(false)} textColor={theme.colors.muted}>Cancel</Button>
            <Button mode="contained" onPress={addClass} buttonColor={theme.colors.primary}>Save Class</Button>
          </View>
        </Modal>
      </Portal>
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
    paddingBottom: 100, // Space for FAB
  },
  emptyState: {
    paddingTop: 50,
    alignItems: 'center',
  },
  dayGroup: {
    marginBottom: theme.spacing.large,
  },
  dayHeader: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginBottom: theme.spacing.small,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  card: {
    marginBottom: theme.spacing.small,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.roundness,
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.primary,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 24,
    margin: 20,
    borderRadius: theme.roundness,
  },
  modalTitle: {
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.primary,
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
    justifyContent: 'center',
  },
  dayChip: {
    width: '30%',
    alignItems: 'center',
    marginVertical: 4,
  },
  dayChipSelected: {
    backgroundColor: theme.colors.primary,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 8,
  }
});
