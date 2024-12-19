import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Sidebar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
  },
  menuItem: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#F3DBE9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E35883',
    textAlign: 'center',
  },
});

export default Sidebar;