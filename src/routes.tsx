import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Top, Best, Latest, Details} from './scenes';
import {StoryData} from 'components/molecules/list-item';

export type RootTabParamList = {
  Top: undefined;
  Best: undefined;
  Latest: undefined;
};

export type RootStackParamsList = {
  Tab: RootTabParamList;
  Details: {
    data: StoryData;
  };
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const Stack = createStackNavigator<RootStackParamsList>();

const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarIcon: ({color, size}) => {
          return <Ionicons name="logo-hackernews" size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6602',
        tabBarInactiveTintColor: '#8C8C8C',
        headerShown: false,
      })}>
      <Tab.Screen name="Top" component={Top} />
      <Tab.Screen name="Best" component={Best} />
      <Tab.Screen name="Latest" component={Latest} />
    </Tab.Navigator>
  );
};

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tab"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Tab" component={TabBar} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export default Routes;
