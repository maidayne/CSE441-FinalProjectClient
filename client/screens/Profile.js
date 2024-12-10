import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Profile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');

  const handleSave = () => {
    console.log('Profile updated:', { name, email });
  };

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
    backgroundColor: '#F2E2CE',
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F8E98C',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#737759',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#737759',
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#737759',
  },
  button: {
    backgroundColor: '#F28888',  
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
