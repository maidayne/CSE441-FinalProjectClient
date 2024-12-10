import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const EditTask = ({ route }) => {
  const { taskId } = route.params;
  const [title, setTitle] = useState('Task 1');
  const [description, setDescription] = useState('Description here');
  const [dueDate, setDueDate] = useState('2024-12-07');
  const [priority, setPriority] = useState('High');
  const [status, setStatus] = useState('In Progress');

  const handleSave = () => {
    console.log('Task updated:', { taskId, title, description, dueDate, priority, status });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Edit Task</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        value={dueDate}
        onChangeText={setDueDate}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        value={priority}
        onChangeText={setPriority}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        value={status}
        onChangeText={setStatus}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <Button title="Save Task" onPress={handleSave} />
    </View>
  );
};

export default EditTask;
