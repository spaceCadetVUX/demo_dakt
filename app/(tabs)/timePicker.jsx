// timePicker.jsx
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, CheckBox, Button, TextInput, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimePickerForm = () => {
  const [selectedDays, setSelectedDays] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
    Weekly: false,
    FullControl: false
  });

  const [time, setTime] = useState({
    Monday: { start: { hour: '', minute: '', ampm: 'AM' }, end: { hour: '', minute: '', ampm: 'PM' } },
    Tuesday: { start: { hour: '', minute: '', ampm: 'AM' }, end: { hour: '', minute: '', ampm: 'PM' } },
    Wednesday: { start: { hour: '', minute: '', ampm: 'AM' }, end: { hour: '', minute: '', ampm: 'PM' } },
    Thursday: { start: { hour: '', minute: '', ampm: 'AM' }, end: { hour: '', minute: '', ampm: 'PM' } },
    Friday: { start: { hour: '', minute: '', ampm: 'AM' }, end: { hour: '', minute: '', ampm: 'PM' } },
    Saturday: { start: { hour: '', minute: '', ampm: 'AM' }, end: { hour: '', minute: '', ampm: 'PM' } },
    Sunday: { start: { hour: '', minute: '', ampm: 'AM' }, end: { hour: '', minute: '', ampm: 'PM' } },
    Weekly: { start: { hour: '', minute: '', ampm: 'AM' }, end: { hour: '', minute: '', ampm: 'PM' } }
  });

  const handleDayChange = (day) => {
    setSelectedDays(prev => {
      const updatedDays = { ...prev, [day]: !prev[day] };

      if (day === 'Weekly') {
        // If Weekly is toggled, disable all other checkboxes
        Object.keys(updatedDays).forEach(key => {
          if (key !== 'Weekly' && key !== 'FullControl') {
            updatedDays[key] = false;
          }
        });
      } else if (day === 'FullControl') {
        // If FullControl is toggled, disable all other checkboxes
        Object.keys(updatedDays).forEach(key => {
          if (key !== 'FullControl') {
            updatedDays[key] = false;
          }
        });
      } else if (prev['Weekly'] || prev['FullControl']) {
        // Reset Weekly and FullControl if another day is selected
        updatedDays['Weekly'] = false;
        updatedDays['FullControl'] = false;
      }

      return updatedDays;
    });
  };

  const handleTimeChange = (day, type, field, value) => {
    setTime(prev => ({
      ...prev,
      [day]: { ...prev[day], [type]: { ...prev[day][type], [field]: value } }
    }));
  };

  const handleSet = () => {
    const schedule = Object.keys(selectedDays)
      .filter(day => selectedDays[day])
      .map(day => ({
        day,
        startTime: `${time[day].start.hour}:${time[day].start.minute} ${time[day].start.ampm}`,
        endTime: `${time[day].end.hour}:${time[day].end.minute} ${time[day].end.ampm}`
      }));
    
    Alert.alert('Times Set', JSON.stringify(schedule, null, 2));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Days of the week and special checkboxes */}
        {Object.keys(selectedDays).map(day => (
          <View key={day} style={styles.checkboxContainer}>
            <CheckBox
              value={selectedDays[day]}
              onValueChange={() => handleDayChange(day)}
              disabled={(day === 'Weekly' && selectedDays['Weekly']) || (day === 'FullControl' && selectedDays['FullControl'])}
            />
            <Text style={styles.label}>{day}</Text>
          </View>
        ))}

        {/* Time pickers */}
        {Object.keys(selectedDays).filter(day => selectedDays[day] && day !== 'Weekly' && day !== 'FullControl').map(day => (
          <View key={day} style={styles.timePickerContainer}>
            <Text style={styles.timePickerLabel}>{`${day} Start Time`}</Text>
            <View style={styles.timePickerInputs}>
              <TextInput
                style={styles.timeInput}
                value={time[day].start.hour}
                onChangeText={value => handleTimeChange(day, 'start', 'hour', value)}
                placeholder="Hour"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.timeInput}
                value={time[day].start.minute}
                onChangeText={value => handleTimeChange(day, 'start', 'minute', value)}
                placeholder="Minute"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.timeInput}
                value={time[day].start.ampm}
                onChangeText={value => handleTimeChange(day, 'start', 'ampm', value)}
                placeholder="AM/PM"
              />
            </View>

            <Text style={styles.timePickerLabel}>{`${day} End Time`}</Text>
            <View style={styles.timePickerInputs}>
              <TextInput
                style={styles.timeInput}
                value={time[day].end.hour}
                onChangeText={value => handleTimeChange(day, 'end', 'hour', value)}
                placeholder="Hour"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.timeInput}
                value={time[day].end.minute}
                onChangeText={value => handleTimeChange(day, 'end', 'minute', value)}
                placeholder="Minute"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.timeInput}
                value={time[day].end.ampm}
                onChangeText={value => handleTimeChange(day, 'end', 'ampm', value)}
                placeholder="AM/PM"
              />
            </View>
          </View>
        ))}

        {/* Weekly time pickers */}
        {selectedDays['Weekly'] && (
          <View style={styles.timePickerContainer}>
            <Text style={styles.timePickerLabel}>Weekly Start Time</Text>
            <View style={styles.timePickerInputs}>
              <TextInput
                style={styles.timeInput}
                value={time['Weekly'].start.hour}
                onChangeText={value => handleTimeChange('Weekly', 'start', 'hour', value)}
                placeholder="Hour"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.timeInput}
                value={time['Weekly'].start.minute}
                onChangeText={value => handleTimeChange('Weekly', 'start', 'minute', value)}
                placeholder="Minute"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.timeInput}
                value={time['Weekly'].start.ampm}
                onChangeText={value => handleTimeChange('Weekly', 'start', 'ampm', value)}
                placeholder="AM/PM"
              />
            </View>

            <Text style={styles.timePickerLabel}>Weekly End Time</Text>
            <View style={styles.timePickerInputs}>
              <TextInput
                style={styles.timeInput}
                value={time['Weekly'].end.hour}
                onChangeText={value => handleTimeChange('Weekly', 'end', 'hour', value)}
                placeholder="Hour"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.timeInput}
                value={time['Weekly'].end.minute}
                onChangeText={value => handleTimeChange('Weekly', 'end', 'minute', value)}
                placeholder="Minute"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.timeInput}
                value={time['Weekly'].end.ampm}
                onChangeText={value => handleTimeChange('Weekly', 'end', 'ampm', value)}
                placeholder="AM/PM"
              />
            </View>
          </View>
        )}

        {/* Full Control */}
        {selectedDays['FullControl'] && (
          <View style={styles.fullControlContainer}>
            <Text style={styles.fullControlLabel}>Full Control</Text>
          </View>
        )}

        <Button title="Set" onPress={handleSet} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
  },
  timePickerContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  timePickerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timePickerInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  fullControlContainer: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginVertical: 10,
  },
  fullControlLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TimePickerForm;
