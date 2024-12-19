import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Statistics = () => {
  console.log('0');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalBoards, setTotalBoards] = useState('');
  const [completedBoards, setCompletedBoards] = useState('');

  const fetchUserStatistics = async () => {
    console.log('2');
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No token found, please login');
        return;
      }
      console.log('3');
      const response = await fetch('http://10.60.248.178:5000/api/user/getBasicBoardInfoByUserId', {
        method: 'POST',
        headers: {

          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          checkMessage: "Get basic boards info by user id",
        }),
      });
      console.log('4');
      const data = await response.json();
      console.log(data);
      console.log('5');
      setTotalBoards(data.data.totalBoards);
      setCompletedBoards(data.data.completedBoards);
      console.log('6');
      setLoading(false);
      console.log('7');
    } catch (err) {
      console.log(err);
      setError('Error fetching profile data');
      setLoading(false);
    }
  };

  // Fetch user profile data when the component mounts
  useFocusEffect(
    React.useCallback(() => {
      console.log('1');
      fetchUserStatistics();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Statistics</Text>
      <View style={styles.statBox}>
        <Text style={styles.label}>Total Task</Text>
        <Text style={styles.value}>{totalBoards}</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.label}>Total Completed Tasks</Text>
        <Text style={styles.value}>{completedBoards}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F3DBE9',
    borderRadius: 16,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // elevation: 5,
    margin: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E35883',
    marginBottom: 16,
    textAlign: 'center',
  },
  statBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  priorityBox: {
    backgroundColor: '#FEA666',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8EA946',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 8,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    marginTop: 4,
  },
});

export default Statistics;
