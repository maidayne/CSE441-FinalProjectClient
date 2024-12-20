import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditTask = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          Alert.alert('Error', 'No token found. Please log in.');
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

        if (response.ok) {
          setTitle(data.data.board_title);
          setDescription(data.data.board_description);
          setCreatedAt(data.data.created_at);
        } else {
          Alert.alert('Error', data.message || 'Failed to fetch task details.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch task details.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No token found. Please log in.');
        return;
      }

      const response = await fetch('http://192.168.1.103:5000/api/board/updateBoard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          checkMessage: "Update board",
          board_id: taskId,
          board_update_details: {
            board_title: title,
            board_description: description,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Task updated successfully.');
        // navigation.navigate("Dashboard", { taskId });
        navigation.navigate("Dashboard");

      } else {
        Alert.alert('Error', data.message || 'Failed to update task.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update task.');
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      <Text style={styles.label}>Created At</Text>
      <TextInput
        value={createdAt}
        editable={false}
        style={[styles.input, styles.readOnlyInput]}
      />

      {/* <Button style={styles.button} title="Save Task" onPress={handleSave}/> */}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFE3',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#E35883',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  readOnlyInput: {
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
  button: {
    backgroundColor: '#8EA946',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: '#666',
    marginTop: 20,
  },
});


export default EditTask;
