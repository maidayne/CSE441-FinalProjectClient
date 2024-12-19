// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// const SignupScreen = ({ navigation }) => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSignup = () => {
//     // Basic validation
//     if (!username || !email || !password || !confirmPassword) {
//       Alert.alert('Error', 'Please fill all fields.');
//       return;
//     }
//     if (password !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match.');
//       return;
//     }

//     // If validation passes, you can perform the signup action (e.g., API call)
//     Alert.alert('Success', 'Account created successfully!');
//     navigation.navigate('Login'); // Navigate to Login screen after signup
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Sign Up</Text>

//       <TextInput
//         placeholder="Username"
//         value={username}
//         onChangeText={setUsername}
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Confirm Password"
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//         secureTextEntry
//         style={styles.input}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleSignup}>
//         <Text style={styles.buttonText}>Sign Up</Text>
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//         <Text style={styles.link}>Already have an account? Log in</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#EBE7BD',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#00285D',
//   },
//   input: {
//     width: '100%',
//     padding: 12,
//     marginBottom: 15,
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#7CA267',
//     paddingVertical: 12,
//     width: '100%',
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   link: {
//     marginTop: 15,
//     color: '#4A7168',
//     fontSize: 16,
//   },
// });

// export default SignupScreen;


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      // Send signup request to backend
      const response = await axios.post('http://10.60.248.178:5000/api/auth/register', {
        user_full_name: username,
        user_email: email,
        user_password: password,
        user_avatar_url: 'default_avatar',
        checkMessage: 'Register new account',
      });

      if (response.status === 201) {
        // Save user info into AsyncStorage
        const userData = {
          username,
          email,
          token: response.data.token, // Assuming the server returns a token
        };

        await AsyncStorage.setItem('@user_data', JSON.stringify(userData));
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Signup Error',
        error.response?.data?.message || 'Failed to create account. Try again later.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBE7BD',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00285D',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#8EA946',
    paddingVertical: 12,
    width: '100%',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    color: '#4A7168',
    fontSize: 16,
  },
});

export default SignupScreen;
