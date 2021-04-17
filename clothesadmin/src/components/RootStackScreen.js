import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import Signup from '../screen/auth/Signup';
import Login from '../screen/auth/Login';
// import Profile from '../screen/main/Profile';
import ChangePassword from './ChangePassword';
import GiveFeedback from './GiveFeedback';
import Admin from '../screen/main/Admin/Admin';
import AdminProfile from '../screen/main/Admin/AdminProfile';
import ViewOrders from '../screen/main/Admin/admincomponents/ViewOrders';
import ManageCategories from '../screen/main/Admin/admincomponents/ManageCategories';
import AddCategory from '../screen/main/Admin/admincomponents/AddCategory';
import AddProducts from '../screen/main/Admin/admincomponents/AddProducts';
import ViewProduct from '../screen/main/Admin/admincomponents/ViewProduct';
import ForgotPassword from './ForgotPassword';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => {
  return (
    <RootStack.Navigator headerMode="none" initialRouteName="none">
      <RootStack.Screen name="AdminProfile" component={AdminProfile} />
      <RootStack.Screen name="Signup" component={Signup} />
      <RootStack.Screen name="Login" component={Login} />
      <RootStack.Screen name="Admin" component={Admin} />
      <RootStack.Screen name="ViewOrders" component={ViewOrders} />
      <RootStack.Screen name="ManageCategories" component={ManageCategories} />
      <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <RootStack.Screen name="AddProducts" component={AddProducts} />
      <RootStack.Screen name="ViewProduct" component={ViewProduct} />
      <RootStack.Screen name="ChangePassword" component={ChangePassword} />
      <RootStack.Screen name="GiveFeedback" component={GiveFeedback} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;

const styles = StyleSheet.create({});
