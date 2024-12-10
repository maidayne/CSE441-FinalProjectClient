import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Sidebar = () => {
  const navigation = useNavigation();

  // Sample username
  const username = 'John Doe';

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.username}>{username}</Text>
      </View>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.menuText}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AddTask')}>
        <Text style={styles.menuText}>Add Task</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('CompletedTasks')}>
        <Text style={styles.menuText}>Completed Tasks</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Statistics')}>
        <Text style={styles.menuText}>Statistics</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Help')}>
        <Text style={styles.menuText}>Help</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1BA99',
    justifyContent: 'flex-start',
  },
  profileContainer: {
    marginBottom: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6E3C2F',
  },
  menuItem: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#FFFCF6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#713E31',
    textAlign: 'center',
  },
});

export default Sidebar;
