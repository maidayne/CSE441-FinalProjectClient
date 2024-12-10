import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Statistics = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Statistics</Text>
      <View style={styles.statBox}>
        <Text style={styles.label}>Today</Text>
        <Text style={styles.value}>5 tasks</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.label}>This Week</Text>
        <Text style={styles.value}>15 tasks</Text>
      </View>
      <View style={styles.statBox}>
        <Text style={styles.label}>This Month</Text>
        <Text style={styles.value}>30 tasks</Text>
      </View>
      <View style={[styles.statBox, styles.priorityBox]}>
        <Text style={styles.label}>Priority Breakdown</Text>
        <Text style={styles.priorityText}>High: 10</Text>
        <Text style={styles.priorityText}>Medium: 15</Text>
        <Text style={styles.priorityText}>Low: 5</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#8B9E5C',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    margin: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  statBox: {
    backgroundColor: '#f4f6f9',
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
    color: '#555',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#463C33',
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
