import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskDetail = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { taskId } = params;
  const [task, setTask] = useState({});

  const fetchTasks = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No token found, please login');
        return;
      }

      const response = await fetch('http://192.168.1.103:5000/api/board/getBoard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          checkMessage: "Get board",
          board_id: taskId,
        }),
      });

      const data = await response.json();
      setTask(data.data); // Assuming response.data contains the task
    } catch (error) {
      console.error('Error fetching tasks:', error);
      Alert.alert('Error', 'Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [taskId]);

  const handleMarkComplete = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await fetch('http://192.168.1.103:5000/api/board/updateBoard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          checkMessage: "Update board",
          board_id: taskId,
          board_update_details: { isCompleted: true },
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        const newTask = { type: 'delete', taskComplete: data.data };
        Alert.alert('Success', 'Task marked as complete');
        navigation.navigate('Dashboard', { newTask }); // Navigate back to the dashboard after marking a task as complete
      } else {
        Alert.alert('Error', 'Failed to mark task as complete');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // const handleDelete = async () => {
  //   const token = await AsyncStorage.getItem('userToken');
  //   if (!token) {
  //     Alert.alert('Error', 'No token found, please login');
  //     return;
  //   }

  //   try {
  //     // Make the DELETE request to the API (this assumes the backend handles it correctly)
  //     const response = await fetch('http://192.168.1.102:5000/api/board/deleteBoard', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         checkMessage: "Delete board",
  //         board_id: taskId, // Pass the taskId to delete the correct task
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.status === 200) {
  //       Alert.alert('Success', 'Task deleted successfully');
  //       navigation.navigate('Dashboard'); // Navigate back to the dashboard after deletion
  //     } else {
  //       Alert.alert('Error', `Failed to delete task: ${data.message || 'Unknown error'}`);
  //     }
  //   } catch (error) {
  //     console.error('Error deleting task:', error);
  //     Alert.alert('Error', 'Failed to delete task');
  //   }
  // };

  const deleteTask = async (taskId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`http://192.168.1.103:5000/api/board/deleteBoard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          checkMessage: "Delete board",
          board_id: taskId,
        }),
      });

      if (response.ok) {
        const result = await response.json(); // Parse as JSON only if the response is successful

        if (result.success) {
          const newTask = { type: 'delete', taskId: result.data };
          Alert.alert('Successfull', 'Success to delete task');
          navigation.navigate('Dashboard', { newTask });
        } else {
          Alert.alert('Error', 'Failed to delete task');
        }
      } else {
        const errorText = await response.text(); // Get raw response text if status is not ok
        console.error('Server Error:', errorText);
        Alert.alert('Error', 'Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      Alert.alert('Error', 'Failed to delete task');
    }
  };




  const handleEditTask = () => {
    navigation.navigate('EditTask', { taskId });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{task.board_title}</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.text}>{task.board_description}</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Created At</Text>
        <Text style={styles.text}>{task.created_at}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.completeButton]} onPress={handleMarkComplete}>
          <Text style={styles.buttonText}>Mark as Complete</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEditTask}>
          <Text style={styles.buttonText}>Edit Task</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => deleteTask(task._id)}>
          <Text style={styles.buttonText}>Delete Task</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    color: '#E35883',
    marginBottom: 5,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#8EA946',
  },
  text: {
    fontSize: 16,
    color: '#7F8C8D',
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
    backgroundColor: '#8EA946',
  },
  editButton: {
    backgroundColor: '#A7BDD9',
  },
  deleteButton: {
    backgroundColor: '#730220',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
});

export default TaskDetail;


