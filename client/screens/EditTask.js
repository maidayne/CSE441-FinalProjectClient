import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
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

        const response = await fetch('http://10.60.248.178:5000/api/board/getBoard', {
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

      const response = await fetch('http://10.60.248.178:5000/api/board/updateBoard', {
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
        navigation.navigate("TaskDetail", { taskId });
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

      <Button title="Save Task" onPress={handleSave}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  readOnlyInput: {
    backgroundColor: '#f0f0f0',
  },
});

export default EditTask;
