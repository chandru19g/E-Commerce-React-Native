import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

const {width, height} = Dimensions.get('screen');

const AdminProfile = ({navigation}) => {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      console.log('User', value);
      if (value === null) {
        setUser(value);
        navigation.replace('Login');
      } else {
        setUser(JSON.parse(value));
        console.log('user', value);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = async () => {
    console.log('Cam');
    try {
      await AsyncStorage.removeItem('key');
      getUser();
    } catch (e) {
      // saving error
    }
  };

  return user === null ? (
    <Text>loading</Text>
  ) : (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar backgroundColor="#FFA6C1" />
      <View
        style={{
          backgroundColor: '#FFC4D6',
          padding: 10,
          width: '100%',
          borderBottomEndRadius: 15,
          borderBottomStartRadius: 15,
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold', textAlign: 'center'}}>
          <Image
            source={require('../../../assets/adminacnt.png')}
            resizeMode="contain"
            style={{height: 30, width: 30}}
          />{' '}
          Profile
        </Text>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={styles.profilefield}>
          <Image
            source={require('../../../assets/account.png')}
            resizeMode="contain"
            style={{height: 50, width: 50, tintColor: '#AAAAB6', marginTop: 10}}
          />
          <Text style={styles.profiletext}>{user.user.name} </Text>
          <Text style={[styles.profiletext, {flexWrap: 'nowrap'}]}>
            {user.user.email}
          </Text>
          <View style={styles.buttonsection}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ChangePassword')}>
              <Text>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Admin')}>
              <Text style={styles.Questionbuttontext}>Admin Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => logout()}>
              <Text>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Login')}>
              <Text>Rate Us</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footertext}>
            V 0.1{'\t\t'}
            <Image
              source={require('../../../assets/copyright.png')}
              style={{height: 20, width: 20, tintColor: '#ADB5BD'}}
            />{' '}
            Chandru{' '}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AdminProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  profilefield: {
    backgroundColor: 'white',
    flex: 1,
    width: width / 1.1,
    height: height / 1.5,
    padding: 10,
    alignItems: 'center',
    borderColor: '#F4EDEA',
    borderWidth: 2,
    borderRadius: 8,
  },
  profiletext: {
    marginTop: 10,
    fontSize: 22,
  },
  buttonsection: {
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#FFB700',
    width: '50%',
    height: 35,
    padding: 5,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttontext: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  footer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  footertext: {
    color: '#ADB5BD',
  },
});
