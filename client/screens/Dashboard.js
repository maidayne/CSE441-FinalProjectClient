// import React, { useState, useEffect } from 'react';
// import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const Dashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [searchText, setSearchText] = useState('');
//   const navigation = useNavigation();

//   // Fetch token from AsyncStorage and get tasks
//   const fetchTasks = async () => {
//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       if (!token) {
//         Alert.alert('Error', 'No token found, please login');
//         return;
//       }

//       // Replace with your actual API URL
//       // const response = await axios.post('http://10.60.248.178:5000/api/board/getBoardsByUserId', {
//       //   headers: { Authorization: `Bearer ${token}` },
//       //   body: JSON.stringify({
//       //     checkMessage: "Get boards by user id",
//       //   })
//       // });

//       const response = await fetch('http://192.168.1.101:5000/api/board/getBoardsByUserId', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           checkMessage: "Get boards by user id"
//         }),
//       });

//       const data = await response.json();
//       if (Array.isArray(data.data)) {
//         setTasks(data.data);
//       } else {
//         console.error('API response is not an array', data);
//         Alert.alert('Error', 'Invalid data format received from the API');
//       }
//       // Assuming response.data contains the tasks
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       Alert.alert('Error', 'Failed to fetch tasks');
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // Filter and sort tasks based on the search text
//   const filteredTasks = tasks
//     .filter(task => task.board_title.toLowerCase().includes(searchText.toLowerCase()))
//     .sort((a, b) => {
//       const aDate = new Date(a.created_at);
//       const bDate = new Date(b.created_at);
//       return bDate - aDate;
//     });

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Search tasks..."
//         value={searchText}
//         onChangeText={setSearchText}
//         style={styles.searchInput}
//       />
//       <FlatList
//         data={filteredTasks}
//         keyExtractor={item => item._id}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => navigation.navigate('TaskDetail', { taskId: item._id })}>
//             <View style={styles.taskCard}>
//               <Text style={styles.taskTitle}>{item.board_title}</Text>
//               <Text style={styles.taskDescription}>{item.board_description}</Text>
//               <Text style={styles.taskCreatedAt}>
//                 Created At: {new Date(item.created_at).toLocaleString()}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={styles.flatListContent}
//       />
//       <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddTask')}>
//         <Text style={styles.addButtonText}>+ Add Task</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     paddingBottom: 80,
//   },
//   searchInput: {
//     borderWidth: 2,
//     borderColor: '#56361E',
//     borderRadius: 25,
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     marginBottom: 20,
//     marginTop: 20,
//     backgroundColor: '#FFFFFF',
//     fontSize: 14,
//     height: 40,
//     width: '90%',
//     marginLeft: 15,
//   },
//   taskCard: {
//     marginBottom: 15,
//     padding: 15,
//     backgroundColor: '#FBEEE1',
//     borderRadius: 12,
//   },
//   taskTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#56361E',
//   },
//   taskDescription: {
//     fontSize: 14,
//     color: '#7F8C8D',
//     marginVertical: 5,
//     fontStyle: 'italic',
//   },
//   taskCreatedAt: {
//     fontSize: 14,
//     color: '#B84C63',
//     marginTop: 5,
//   },
//   flatListContent: {
//     paddingHorizontal: 20,
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     right: 20,
//     backgroundColor: '#7F9363',
//     paddingVertical: 15,
//     borderRadius: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   addButtonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default Dashboard;

/////////////////////////
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const route = useRoute(); // Get route params

  // Fetch token from AsyncStorage and get tasks
  const fetchTasks = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No token found, please login');
        return;
      }

      // Fetch the user ID (or get it from the token payload if needed)
      const userId = await AsyncStorage.getItem('userId');  // You might store this when user logs in

      const response = await fetch('http://10.60.248.178:5000/api/board/getBoardsByUserId', {
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
        setTasks(data.data);  // Store tasks filtered by user ID
      } else {
        console.error('API response is not an array', data);
        Alert.alert('Error', 'Invalid data format received from the API');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      Alert.alert('Error', 'Failed to fetch tasks');
    }
  };

  useEffect(() => {
    if (route.params?.newTask.type == 'delete') {
      setTasks((prevTasks) =>
        prevTasks.filter(task => task._id !== route.params.newTask.taskId)
      );
    }
    else if (route.params?.newTask) {
      setTasks((prevTasks) => [route.params.newTask, ...prevTasks]);
    }
  }, [route.params?.newTask]);

  useFocusEffect(
    React.useCallback(() => {
      console.log('1');
      fetchTasks();
    }, [])
  );

  // Filter and sort tasks based on the search text
  const filteredTasks = tasks
    .filter(task =>
      task.board_title.toLowerCase().includes(searchText.toLowerCase()) &&
      !task.isCompleted
    )
    .sort((a, b) => {
      const aDate = new Date(a.created_at);
      const bDate = new Date(b.created_at);
      return bDate - aDate;
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
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('TaskDetail', { taskId: item._id })}>
            <View style={styles.taskCard}>
              <Text style={styles.taskTitle}>{item.board_title}</Text>
              <Text style={styles.taskDescription}>{item.board_description}</Text>
              <Text style={styles.taskCreatedAt}>
                Created At: {new Date(item.created_at).toLocaleString()}
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
    borderColor: '#E35883',
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
    backgroundColor: '#F3DBE9',
    borderRadius: 12,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E35883',
  },
  taskDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginVertical: 5,
    fontStyle: 'italic',
  },
  taskCreatedAt: {
    fontSize: 14,
    color: '#8EA946',
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
    backgroundColor: '#8EA946',
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
