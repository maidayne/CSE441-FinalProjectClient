// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

// const Settings = () => {
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleChangePassword = () => {
//     if (newPassword !== confirmPassword) {
//       alert('New passwords do not match');
//       return;
//     }

//     if (newPassword === currentPassword) {
//       alert('New password cannot be the same as the current password');
//       return;
//     }

//     // Logic to change the password
//     console.log('Password changed:', { currentPassword, newPassword });
//     // You can add your password change API call or further logic here
//   };

//   const handleLogout = () => {
//     console.log('User logged out');
//     // Add your logout logic here (clear tokens, redirect to login, etc.)
//   };

//   return (
//     <View style={styles.container}>      
//       <Text style={styles.label}>Current Password</Text>
//       <TextInput
//         placeholder="Enter Current Password"
//         value={currentPassword}
//         onChangeText={setCurrentPassword}
//         secureTextEntry
//         style={styles.input}
//       />
      
//       <Text style={styles.label}>New Password</Text>
//       <TextInput
//         placeholder="Enter New Password"
//         value={newPassword}
//         onChangeText={setNewPassword}
//         secureTextEntry
//         style={styles.input}
//       />
      
//       <Text style={styles.label}>Confirm New Password</Text>
//       <TextInput
//         placeholder="Confirm New Password"
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//         secureTextEntry
//         style={styles.input}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
//         <Text style={styles.buttonText}>Change Password</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutButtonText}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#FFF9EF',
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#8EAC78',
//     marginBottom: 20,
//     textAlign: 'left',
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#8EAC78',
//     marginBottom: 5,
//   },
//   input: {
//     height: 45,
//     borderWidth: 1,
//     borderColor: '#8EAC78',
//     borderRadius: 8,
//     paddingLeft: 10,
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     fontSize: 16,
//     color: '#A4806A',
//   },
//   button: {
//     backgroundColor: '#FFC57B', 
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   logoutButton: {
//     backgroundColor: '#FF7156',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   logoutButtonText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   }
// });

// export default Settings;


import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (newPassword === currentPassword) {
      Alert.alert('Error', 'New password cannot be the same as the current password');
      return;
    }

    // Lấy thông tin từ AsyncStorage
    const userEmail = await AsyncStorage.getItem('user_email');
    const token = await AsyncStorage.getItem('user_token');

    // Gửi yêu cầu thay đổi mật khẩu lên server
    try {
      const response = await fetch('http://192.168.1.102:5000/api/auth/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_email: userEmail,
          user_password: newPassword,
          user_last_password: currentPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Password changed successfully.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        Alert.alert('Error', data.message || 'Failed to change password.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  const handleLogout = async () => {
    // Thực hiện đăng xuất và xóa thông tin người dùng khỏi AsyncStorage
    await AsyncStorage.removeItem('user_token');
    await AsyncStorage.removeItem('user_email');

    Alert.alert('Logged out', 'You have been logged out successfully.');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current Password</Text>
      <TextInput
        placeholder="Enter Current Password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
        style={styles.input}
      />
      
      <Text style={styles.label}>New Password</Text>
      <TextInput
        placeholder="Enter New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      />
      
      <Text style={styles.label}>Confirm New Password</Text>
      <TextInput
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF9EF',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8EAC78',
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#8EAC78',
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#A4806A',
  },
  button: {
    backgroundColor: '#FFC57B', 
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#FF7156',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  }
});

export default Settings;
