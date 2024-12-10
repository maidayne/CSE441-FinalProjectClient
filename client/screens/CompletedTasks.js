import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Test APIs using Postman', status: 'Completed' },
    { id: '2', title: 'Research Redux', status: 'Completed' }
  ]);

  const handleDelete = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => handleDelete(item.id)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFE3',
    padding: 20,
  },
  taskContainer: {
    backgroundColor: '#DCEFAF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#040605',
  },
  button: {
    backgroundColor: '#F1B399', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#713E31',
    fontWeight: '600',
    fontSize: 16,
  }
});

export default CompletedTasks;
