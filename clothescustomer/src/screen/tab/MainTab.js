import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from '../main/Home';
import Ordered from '../main/Ordered';
import UserProfile from '../main/UserProfile';
import Cart from '../main/Cart';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          height: 60,
          width: '100%',
          flexDirection: 'column',
          alignSelf: 'center',
          elevation: 6,
          borderTopStartRadius: 15,
          borderTopEndRadius: 15,
          backgroundColor: '#FFC4D6',
        },
      }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/shop.png')}
              resizeMode="contain"
              style={{
                width: focused ? 30 : 25,
                height: focused ? 30 : 25,
                tintColor: focused ? '#6166C1' : '#4895EF',
              }}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#6166C1' : '#4895EF',
                fontSize: 14,
                fontWeight: focused ? 'bold' : 'normal',
              }}>
              Shop
            </Text>
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="Ordered"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/order.png')}
              resizeMode="contain"
              style={{
                width: focused ? 30 : 25,
                height: focused ? 30 : 25,
                tintColor: focused ? '#6166C1' : '#4895EF',
              }}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#6166C1' : '#4895EF',
                fontSize: 14,
                fontWeight: focused ? 'bold' : 'normal',
              }}>
              My Orders
            </Text>
          ),
        }}
        component={Ordered}
      />
      <Tab.Screen
        name="Cart"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/cart.png')}
              resizeMode="contain"
              style={{
                width: focused ? 30 : 25,
                height: focused ? 30 : 25,
                tintColor: focused ? '#6166C1' : '#4895EF',
              }}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#6166C1' : '#4895EF',
                fontSize: 14,
                fontWeight: focused ? 'bold' : 'normal',
              }}>
              Cart
            </Text>
          ),
        }}
        component={Cart}
      />
      <Tab.Screen
        name="UserProfile"
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/profile.png')}
              resizeMode="contain"
              style={{
                width: focused ? 30 : 25,
                height: focused ? 30 : 25,
                tintColor: focused ? '#6166C1' : '#4895EF',
              }}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                color: focused ? '#6166C1' : '#4895EF',
                fontSize: 14,
                fontWeight: focused ? 'bold' : 'normal',
              }}>
              Profile
            </Text>
          ),
        }}
        component={UserProfile}
      />
    </Tab.Navigator>
  );
};

export default MainTab;

const styles = StyleSheet.create({});
