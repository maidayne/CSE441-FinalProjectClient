import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Write report capston 1', status: 'Incomplete', priority: 'High', dueDate: '2024-12-20', dueTime: '10:00' },
    { id: '2', title: 'Fix colors in UI', status: 'Incomplete', priority: 'Medium', dueDate: '2024-12-12', dueTime: '15:30' },
    { id: '3', title: 'Test APIs using Postman', status: 'Completed', priority: 'Low', dueDate: '2024-12-15', dueTime: '09:00' },
    { id: '4', title: 'Prepare to presentation', status: 'Incomplete', priority: 'High', dueDate: '2024-12-10', dueTime: '08:00' },
  ]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  // Filter and sort tasks based on the search text
  const filteredTasks = tasks
    .filter(task => task.title.toLowerCase().includes(searchText.toLowerCase()))
    .sort((a, b) => {
      // Push completed tasks to the end
      if (a.status === 'Incomplete' && b.status === 'Completed') return -1;
      if (b.status === 'Incomplete' && a.status === 'Completed') return 1;

      // Sort by due date (earliest first)
      const aDate = new Date(`${a.dueDate}T${a.dueTime}`);
      const bDate = new Date(`${b.dueDate}T${b.dueTime}`);
      if (aDate < bDate) return -1;
      if (aDate > bDate) return 1;

      // Sort by priority (High > Medium > Low)
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search tasks..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
      />
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}>
            <View style={styles.taskCard}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskStatus}>{item.status}</Text>
              <Text style={styles.taskPriority}>Priority: {item.priority}</Text>
              <Text style={styles.taskDueDate}>
                Due: {item.dueDate} {item.dueTime}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.flatListContent}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
        <Text style={styles.addButtonText}>+ Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 80,
  },
  searchInput: {
    borderWidth: 2,
    borderColor: '#56361E',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    height: 40,
    width: '90%',
    marginLeft: 15,
  },
  taskCard: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#FBEEE1',
    borderRadius: 12,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#56361E',
  },
  taskStatus: {
    fontSize: 13,
    color: '#7F8C8D',
    marginVertical: 5,
    fontStyle: 'italic',
  },
  taskPriority: {
    fontSize: 14,
    color: '#96AC97',
  },
  taskDueDate: {
    fontSize: 14,
    color: '#B84C63',
    marginTop: 5,
  },
  flatListContent: {
    paddingHorizontal: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#7F9363',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Dashboard;
