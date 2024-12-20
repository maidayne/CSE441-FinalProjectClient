// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// const CompletedTasks = () => {
//   const [tasks, setTasks] = useState([
//     { id: '1', title: 'Test APIs using Postman', status: 'Completed' },
//     { id: '2', title: 'Research Redux', status: 'Completed' }
//   ]);

//   const handleDelete = (taskId) => {
//     setTasks(tasks.filter(task => task.id !== taskId));
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={tasks}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.taskContainer}>
//             <Text style={styles.taskTitle}>{item.title}</Text>
//             <TouchableOpacity 
//               style={styles.button} 
//               onPress={() => handleDelete(item.id)}>
//               <Text style={styles.buttonText}>Delete</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFE3',
//     padding: 20,
//   },
//   taskContainer: {
//     backgroundColor: '#DCEFAF',
//     padding: 15,
//     borderRadius: 12,
//     marginBottom: 15,
//     shadowColor: '#FFFFFF',
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   taskTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 10,
//     color: '#040605',
//   },
//   button: {
//     backgroundColor: '#F1B399', 
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#713E31',
//     fontWeight: '600',
//     fontSize: 16,
//   }
// });

// export default CompletedTasks;

///////////////////////////
/// handle get completed tasks
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRoute } from '@react-navigation/native';

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch token from AsyncStorage and get completed tasks
  const fetchTasks = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No token found, please login');
        return;
      }

      const userId = await AsyncStorage.getItem('userId');  // Get userId from AsyncStorage

      const response = await fetch('http://192.168.1.103:5000/api/board/getBoardsByUserId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          checkMessage: "Get boards by user id",
          userId: userId,  // Include the userId if your server supports filtering by user
        }),
      });

      const data = await response.json();
      if (Array.isArray(data.data)) {
        // Filter the tasks to show only completed tasks
        const completedTasks = data.data.filter(task => task.isCompleted === true);
        setTasks(completedTasks);
        console.log(tasks);
        // Store only completed tasks
      } else {
        console.error('API response is not an array', data);
        Alert.alert('Error', 'Invalid data format received from the API');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      Alert.alert('Error', 'Failed to fetch tasks');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('1');
      fetchTasks();
    }, [])
  );
 // Empty dependency array ensures this runs only once
  
  
  const deleteTask = async (taskId) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch('http://192.168.1.103:5000/api/board/deleteBoard', {
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
        console.log('Delete Response:', result);

        if (result.success) {
          // Update the tasks list after deletion
          setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
          Alert.alert('Successfull', 'Success to delete task');
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

  // Debugging: Log tasks to ensure data is fetched and rendered
  // console.log('Tasks to display:', tasks);

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskTitle}>{item.board_title}</Text>
            <Text style={styles.taskDescription}>{item.board_description}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => deleteTask(item._id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text>No completed tasks available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  taskContainer: {
    backgroundColor: '#FFFFE3',
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
    color: '#8EA946',
  },
  taskDescription: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#7F8C8D',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#730220',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CompletedTasks;
