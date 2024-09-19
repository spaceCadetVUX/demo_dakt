import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Text, View, TextInput, Button, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import { storedUsers, addUserToStorage } from './users';

const App = () => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState(storedUsers);
  const [searchTerm, setSearchTerm] = useState(''); // For search functionality

  const handleAddUser = () => {
    if (userId && userName) {
      const userExists = users.some((user) => user.id === userId);
      if (userExists) {
        Alert.alert('Error', 'User with this ID already exists. Please use a different ID.');
      } else {
        const newUser = { id: userId, name: userName };
        setUsers([...users, newUser]);
        addUserToStorage(newUser);
        setUserId('');
        setUserName('');
      }
    } else {
      Alert.alert('Error', 'Please fill out both User ID and User Name.');
    }
  };

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* User Input Form */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>User ID</Text>
          <TextInput
            style={styles.input}
            value={userId}
            onChangeText={setUserId}
            placeholder="Enter User ID"
          />
          <Text style={styles.label}>User Name</Text>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder="Enter User Name"
          />
          <Button title="Add User" onPress={handleAddUser} />
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.label}>Search User by Name</Text>
          <TextInput
            style={styles.input}
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Enter User Name to Search"
          />
        </View>

        {/* Dashboard */}
        <View style={styles.dashboardContainer}>
          <Text style={styles.dashboardTitle}>User Dashboard</Text>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <Card key={index} style={styles.userCard}>
                <Text style={styles.userText}>ID: {user.id}</Text>
                <Text style={styles.userText}>Name: {user.name}</Text>
              </Card>
            ))
          ) : (
            <Text style={styles.noUsersText}>No users found</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    paddingTop:30,
  },
  formContainer: {
    marginBottom: 30,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  searchContainer: {
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  dashboardContainer: {
    marginTop: 20,
  },
  dashboardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userCard: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
  },
  userText: {
    fontSize: 16,
    fontWeight: '500',
  },
  noUsersText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
});

export default App;
