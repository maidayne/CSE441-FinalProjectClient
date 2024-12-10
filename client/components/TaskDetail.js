import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';

const TaskDetail = () => {
  const { params } = useRoute();
  const { taskId } = params;

  // Here you would fetch the task details by taskId
  const taskDetail = {
    title: 'Task 1',
    description: 'This is a detailed description of the task.',
    createdAt: '2024-12-06',
    notes: 'Some additional notes...',
    status: 'In Progress'
  };

  const handleDelete = () => {
    console.log('Task Deleted:', taskId);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{taskDetail.title}</Text>
        <Text style={styles.status}>{taskDetail.status}</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.text}>{taskDetail.description}</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Created At</Text>
        <Text style={styles.text}>{taskDetail.createdAt}</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Notes</Text>
        <Text style={styles.text}>{taskDetail.notes}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.completeButton]}>
          <Text style={styles.buttonText}>Mark as Complete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.editButton]}>
          <Text style={styles.buttonText}>Edit Task</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete Task</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ff9800', 
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 30,
    gap: 10,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});

export default TaskDetail;
