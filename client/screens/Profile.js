// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

// const Profile = () => {
//   const [name, setName] = useState('John Doe');
//   const [email, setEmail] = useState('johndoe@example.com');

//   const handleSave = () => {
//     console.log('Profile updated:', { name, email });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Name</Text>
//       <TextInput
//         value={name}
//         onChangeText={setName}
//         style={styles.input}
//       />
//       <Text style={styles.label}>Email</Text>
//       <TextInput
//         value={email}
//         style={styles.input}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleSave}>
//         <Text style={styles.buttonText}>Save Profile</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#F2E2CE',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#F8E98C',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 5,
//     color: '#737759',
//   },
//   input: {
//     height: 45,
//     borderWidth: 1,
//     borderColor: '#737759',
//     borderRadius: 8,
//     paddingLeft: 10,
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     fontSize: 16,
//     color: '#737759',
//   },
//   button: {
//     backgroundColor: '#F28888',  
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   }
// });

// export default Profile;


import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';  
import { useDerivedValue } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No token found, please login');
        navigation.replace('Login'); // Quay về màn hình đăng nhập
        return;
      }
      const response = await fetch('http://192.168.1.103:5000/api/user/getProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          checkMessage: "Get user profile",
        }),
      });
      const data = await response.json();
      console.log(data);
      // Adjust based on the response structure
      setName(data.data.user_full_name);
      setEmail(data.data.user_email);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError('Error fetching profile data');
      setLoading(false);
    }
  };

  // Fetch user profile data when the component mounts
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No token found. Please log in.');
        return;
      }
  
      const response = await fetch('http://192.168.1.103:5000/api/user/updateProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          checkMessage: "Update user info",
          user_update_details: {
            user_full_name: name,
            user_email: email,
          },
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        Alert.alert('Success', 'Profile updated successfully.');
      } else {
        Alert.alert('Error', data.message || 'Failed to update profile.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile.');
      console.error(error);
    }
  };
  

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#E35883',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#E35883',
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#7F8C8D',
  },
  button: {
    backgroundColor: '#8EA946',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  }
});

export default Profile;
