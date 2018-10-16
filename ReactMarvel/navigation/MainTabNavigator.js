import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CharacterScreen from '../screens/CharacterScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const CharacterStack = createStackNavigator({
  Home: CharacterScreen,
});

CharacterStack.navigationOptions = {
  tabBarLabel: 'Characters',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  CharacterStack,
  LinksStack,
  SettingsStack,
});
