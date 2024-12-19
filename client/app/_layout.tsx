import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

import Dashboard from '../screens/Dashboard';
import AddTask from '../screens/AddTask';
import TaskDetail from '../screens/TaskDetail';
import EditTask from '../screens/EditTask';
import CompletedTasks from '../screens/CompletedTasks';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import Statistics from '../screens/Statistics';
import Help from '../screens/Help';
import Sidebar from '../components/Sidebar';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator
// const DrawerNavigator = () => (
//   <Drawer.Navigator drawerContent={() => <Sidebar />}>
//     <Drawer.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard', headerTintColor: '#845587' }} />
//     <Drawer.Screen name="AddTask" component={AddTask} options={{ title: 'Add Task', headerTintColor: '#43637E' }} />
//     <Drawer.Screen name="TaskDetail" component={TaskDetail} options={{ title: 'Task Detail', headerTintColor: '#713E31' }} />
//     <Drawer.Screen name="EditTask" component={EditTask} options={{ title: 'Edit Task', headerTintColor: '#713E31' }} />
//     <Drawer.Screen name="CompletedTasks" component={CompletedTasks} options={{ title: 'Completed Tasks', headerTintColor: '#8A9D60' }} />
//     <Drawer.Screen name="Profile" component={Profile} options={{ title: 'Profile', headerTintColor: '#737759' }} />
//     <Drawer.Screen name="Settings" component={Settings} options={{ title: 'Settings', headerTintColor: '#426850' }} />
//     <Drawer.Screen name="Statistics" component={Statistics} options={{ title: 'Statistics', headerTintColor: '#463C33' }} />
//     <Drawer.Screen name="Help" component={Help} options={{ title: 'Help', headerTintColor: '#713E31' }} />
//   </Drawer.Navigator>
// );

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status when the app loads
  useEffect(() => {
    const checkLoginStatus = async () => {
      const status = await AsyncStorage.getItem('isLoggedIn');
      if (status === 'true') {
        setIsLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <Drawer.Navigator initialRouteName={isLoggedIn ? 'Main' : 'Login'} drawerContent={() => <Sidebar />}>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'SignupScreen', headerTintColor: '#FFFFFF' }} />
      <Drawer.Screen name="Main" component={Dashboard} options={{ title: 'Dashboard', headerTintColor: '#E35883' }} />
      <Drawer.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard', headerTintColor: '#E35883' }} />

      <Drawer.Screen name="AddTask" component={AddTask} options={{ title: 'Add Task', headerTintColor: '#E35883' }} />

      <Drawer.Screen name="TaskDetail" component={TaskDetail} options={{ title: 'Task Detail', headerTintColor: '#E35883' }} />
      <Drawer.Screen name="EditTask" component={EditTask} options={{ title: 'Edit Task', headerTintColor: '#E35883' }} />
      <Drawer.Screen name="CompletedTasks" component={CompletedTasks} options={{ title: 'Completed Tasks', headerTintColor: '#E35883' }} />
      <Drawer.Screen name="Profile" component={Profile} options={{ title: 'Profile', headerTintColor: '#E35883' }} />
      <Drawer.Screen name="Settings" component={Settings} options={{ title: 'Settings', headerTintColor: '#E35883' }} />
      <Drawer.Screen name="Statistics" component={Statistics} options={{ title: 'Statistics', headerTintColor: '#E35883' }} />
      <Drawer.Screen name="Help" component={Help} options={{ title: 'Help', headerTintColor: '#E35883' }} />
    </Drawer.Navigator>
  );
};

export default App;

