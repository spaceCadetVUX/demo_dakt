import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Card, Menu, Divider, IconButton } from 'react-native-paper';

const App = () => {
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  const [menuVisible, setMenuVisible] = useState(null);

  const handleAddGroup = () => {
    if (groupName) {
      setGroups([...groups, { name: groupName, users: [] }]);
      setGroupName('');
    }
  };

  const handleAddUser = (groupIndex) => {
    if (userId && userName) {
      let updatedGroups = [...groups];
      updatedGroups[groupIndex].users.push({ id: userId, name: userName });
      setGroups(updatedGroups);
      setUserId('');
      setUserName('');
    }
  };

  const handleDeleteGroup = (index) => {
    let updatedGroups = [...groups];
    updatedGroups.splice(index, 1);
    setGroups(updatedGroups);
  };

  const handleRenameGroup = (index, newName) => {
    let updatedGroups = [...groups];
    updatedGroups[index].name = newName;
    setGroups(updatedGroups);
  };

  const toggleMenu = (index) => {
    setMenuVisible(menuVisible === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Group Input Form */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Group Name</Text>
          <TextInput
            style={styles.input}
            value={groupName}
            onChangeText={setGroupName}
            placeholder="Enter Group Name"
          />
          <Button title="Create Group" onPress={handleAddGroup} />
        </View>

        {/* Groups Dashboard */}
        <View style={styles.dashboardContainer}>
          <Text style={styles.dashboardTitle}>Groups Dashboard</Text>
          {groups.length > 0 ? (
            groups.map((group, groupIndex) => (
              <Card key={groupIndex} style={styles.groupCard}>
                <View style={styles.groupHeader}>
                  <Text style={styles.groupName}>{group.name}</Text>
                  <Menu
                    visible={menuVisible === groupIndex}
                    onDismiss={() => setMenuVisible(null)}
                    anchor={
                      <IconButton
                        icon="dots-vertical"
                        size={20}
                        onPress={() => toggleMenu(groupIndex)}
                      />
                    }
                  >
                    <Menu.Item
                      onPress={() => {
                        setMenuVisible(null);
                        let newName = prompt('Enter new group name');
                        if (newName) handleRenameGroup(groupIndex, newName);
                      }}
                      title="Rename Group"
                    />
                    <Menu.Item
                      onPress={() => {
                        setMenuVisible(null);
                        handleDeleteGroup(groupIndex);
                      }}
                      title="Delete Group"
                    />
                    <Menu.Item
                      onPress={() => {
                        setMenuVisible(null);
                        // Logic to show user input for adding to a specific group
                      }}
                      title="Add User"
                    />
                    <Divider />
                  </Menu>
                </View>

                {/* Show Users in the Group */}
                <View>
                  {group.users.length > 0 ? (
                    group.users.map((user, userIndex) => (
                      <Text key={userIndex} style={styles.userText}>
                        ID: {user.id} | Name: {user.name}
                      </Text>
                    ))
                  ) : (
                    <Text style={styles.noUsersText}>No users in this group yet</Text>
                  )}
                </View>

                {/* User Input Form */}
                <View style={styles.userInputContainer}>
                  <TextInput
                    style={styles.input}
                    value={userId}
                    onChangeText={setUserId}
                    placeholder="Enter User ID"
                  />
                  <TextInput
                    style={styles.input}
                    value={userName}
                    onChangeText={setUserName}
                    placeholder="Enter User Name"
                  />
                  <Button title="Add User" onPress={() => handleAddUser(groupIndex)} />
                </View>
              </Card>
            ))
          ) : (
            <Text style={styles.noGroupsText}>No groups created yet</Text>
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
  groupCard: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 3,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userText: {
    fontSize: 16,
    marginTop: 5,
  },
  noGroupsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
  noUsersText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#888',
  },
  userInputContainer: {
    marginTop: 20,
  },
});

export default App;
