import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Help = () => {
  const handleContactSupport = () => {
    console.log('Contacting support...');
  };

  const handleFAQ = () => {
    console.log('Redirecting to FAQ page...');
  };

  const handleTroubleshoot = () => {
    console.log('Opening troubleshooting guide...');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.description}>
        For assistance, please refer to the following options:
      </Text>

      <TouchableOpacity style={styles.optionButton} onPress={handleFAQ}>
        <Text style={styles.buttonText}>Frequently Asked Questions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={handleTroubleshoot}>
        <Text style={styles.buttonText}>Troubleshooting Guide</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={handleContactSupport}>
        <Text style={styles.buttonText}>Contact Support</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Need more help? Visit our help center at support.example.com.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  optionButton: {
    backgroundColor: '#007BFF', 
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  footerText: {
    color: '#888',
    fontSize: 14,
  },
});

export default Help;
