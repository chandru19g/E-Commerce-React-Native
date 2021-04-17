import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import Signup from '../screen/auth/Signup';
import Login from '../screen/auth/Login';
import Home from '../screen/main/Home';
import MainTab from '../screen/tab/MainTab';
import Ordered from '../screen/main/Ordered';
import Buy from './Buy';
import Cart from '../screen/main/Cart';
import ChangePassword from './ChangePassword';
import GiveFeedback from './GiveFeedback';
import Category from '../screen/main/Category';
import UserProfile from '../screen/main/UserProfile';
import ParticularProduct from '../screen/main/ParticularProduct';
import ForgotPassword from './ForgotPassword';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => {
  return (
    <RootStack.Navigator headerMode="none" initialRouteName="none">
      <RootStack.Screen name="Home" component={MainTab} />
      <RootStack.Screen name="Signup" component={Signup} />
      <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <RootStack.Screen name="Login" component={Login} />
      <RootStack.Screen name="My Orders" component={Ordered} />
      <RootStack.Screen name="UserProfile" component={UserProfile} />
      <RootStack.Screen name="Cart" component={Cart} />
      <RootStack.Screen name="Buy" component={Buy} />
      <RootStack.Screen name="ChangePassword" component={ChangePassword} />
      <RootStack.Screen name="GiveFeedback" component={GiveFeedback} />
      <RootStack.Screen name="Category" component={Category} />
      <RootStack.Screen
        name="ParticularProduct"
        component={ParticularProduct}
      />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;

const styles = StyleSheet.create({});
