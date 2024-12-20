// import React, { useState } from 'react';
// import { View, TextInput, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';

// const AddTask = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [dueDate, setDueDate] = useState(new Date());
//   const [dueTime, setDueTime] = useState(new Date());
//   const [priority, setPriority] = useState('Medium');
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showTimePicker, setShowTimePicker] = useState(false);

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       setDueDate(selectedDate);
//     }
//   };

//   const handleTimeChange = (event, selectedTime) => {
//     setShowTimePicker(false);
//     if (selectedTime) {
//       setDueTime(selectedTime);
//     }
//   };

//   const formattedDate = dueDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
//   const formattedTime = dueTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format time as HH:MM AM/PM

//   const handleSave = () => {
//     console.log('Task saved:', { title, description, dueDate: formattedDate, dueTime: formattedTime, priority });
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Task Title"
//         value={title}
//         onChangeText={setTitle}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Description"
//         value={description}
//         onChangeText={setDescription}
//         style={styles.input}
//       />
//       <View style={styles.datePickerContainer}>
//         <Text style={styles.label}>Due Date:</Text>
//         <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
//           <Text style={styles.dateText}>{formattedDate}</Text>
//         </TouchableOpacity>
//         {showDatePicker && (
//           <DateTimePicker
//             value={dueDate}
//             mode="date"
//             display={Platform.OS === 'ios' ? 'inline' : 'default'}
//             onChange={handleDateChange}
//           />
//         )}
//       </View>
//       <View style={styles.timePickerContainer}>
//         <Text style={styles.label}>Due Time:</Text>
//         <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.dateButton}>
//           <Text style={styles.dateText}>{formattedTime}</Text>
//         </TouchableOpacity>
//         {showTimePicker && (
//           <DateTimePicker
//             value={dueTime}
//             mode="time"
//             display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//             onChange={handleTimeChange}
//           />
//         )}
//       </View>
//       <View style={styles.fieldContainer}>
//   <Text style={styles.label}>Priority</Text>
//   <View style={styles.pickerContainer}>
//     <Picker
//       selectedValue={priority}
//       onValueChange={(itemValue) => setPriority(itemValue)}
//       style={styles.picker}
//     >
//       <Picker.Item label="Select Priority" value="" />
//       <Picker.Item label="High" value="High" />
//       <Picker.Item label="Medium" value="Medium" />
//       <Picker.Item label="Low" value="Low" />
//     </Picker>
//   </View>
// </View>

//       <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//         <Text style={styles.saveButtonText}>Save Task</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#EEF9FA',
//     padding: 20,
//   },
//   input: {
//     height: 50,
//     borderColor: '#A6D5EC',
//     borderWidth: 1,
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     fontSize: 16,
//     backgroundColor: '#FFFFFF',
//   },
//   datePickerContainer: {
//     marginBottom: 20,
//   },
//   timePickerContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//     color: '#2C3E50',
//   },
//   dateButton: {
//     borderWidth: 1,
//     borderColor: '#A6D5EC',
//     borderRadius: 12,
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     backgroundColor: '#FFFFFF',
//   },
//   dateText: {
//     fontSize: 16,
//     color: '#2C3E50',
//   },
//   fieldContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     color: '#436007',
//     marginBottom: 5,
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#A6D5EC',
//     borderRadius: 12,
//     backgroundColor: '#FFFFFF',
//     overflow: 'hidden', 
//   },
//   picker: {
//     height: 50,
//     fontSize: 16,
//     color: '#2C3E50',
//     paddingHorizontal: 15,
//   },
//   saveButton: {
//     backgroundColor: '#94B58B',
//     paddingVertical: 15,
//     borderRadius: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   saveButtonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default AddTask;



////////////////////////////////

// import React, { useState } from 'react';
// import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from 'expo-router';

// const AddTask = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const navigation = useNavigation();

//   const handleSave = async () => {
//     if (!title.trim()) {
//       Alert.alert('Validation Error', 'Task title is required');
//       return;
//     }

//     const taskData = {
//       board_title: title,
//       board_description: description,
//       board_is_public: true,
//       board_collaborators: [],
//       board_list: [],
//       checkMessage: "Create new board"

//     };

//     try {
//       const token = await AsyncStorage.getItem('userToken');
//       // console.log('Token:', token);

//       const response = await fetch('http://192.168.1.101:5000/api/board/createBoard', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(taskData),
//       });

//       const responseData = await response.json();
//       console.log('Response Data:', responseData);

//       if (response.ok) {
//         Alert.alert('Success', 'Task added successfully');
//         setTitle('');
//         setDescription('');
//         navigation.navigate('Dashboard'); 
//       } else {
//         Alert.alert('Error', responseData.message || 'Failed to add task');
//       }
//     } catch (error) {
//       console.error('Error sending task to server:', error.message);
//       Alert.alert('Error', 'Failed to add the task');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         placeholder="Task Title"
//         value={title}
//         onChangeText={setTitle}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Task Description"
//         value={description}
//         onChangeText={setDescription}
//         style={styles.input}
//         multiline
//       />
//       <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//         <Text style={styles.saveButtonText}>Save Task</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     padding: 20,
//   },
//   label: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     color: '#333',
//   },
//   input: {
//     height: 50,
//     borderColor: '#CCC',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     fontSize: 16,
//     backgroundColor: '#FFF',
//   },
//   saveButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 15,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     color: '#FFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default AddTask;


import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddTask = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Task title is required');
      return;
    }

    const taskData = {
      board_title: title,
      board_description: description,
      board_is_public: true,
      board_collaborators: [],
      board_list: [],
      checkMessage: "Create new board"
    };

    try {
      const token = await AsyncStorage.getItem('userToken');

      const response = await fetch('http://192.168.1.103:5000/api/board/createBoard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      const responseData = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Task added successfully');
        setTitle('');
        setDescription('');
        taskData._id = responseData.data;

        // Notify the Dashboard to update its tasks
        navigation.navigate('Dashboard', { newTask: taskData }); // Pass the new task data

      } else {
        Alert.alert('Error', responseData.message || 'Failed to add task');
      }
    } catch (error) {
      console.error('Error sending task to server:', error.message);
      Alert.alert('Error', 'Failed to add the task');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFE3',
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#E35883',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#8EA946',
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddTask;
