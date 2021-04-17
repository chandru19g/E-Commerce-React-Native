import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {savePasswordtoDB} from '../screen/auth/helpers/auth';

const {width, height} = Dimensions.get('screen');

const ChangePassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      setLoading(true);
      const value = await AsyncStorage.getItem('key');
      if (value === null) {
        setUser(value);
        navigation.replace('Login');
      } else {
        setUser(JSON.parse(value));
        console.log('Setting User');
        setLoading(false);
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  const handleClick = () => {
    getUser();
    if (password.length === 0 || cpassword.length === 0) {
      Alert.alert('Warning', 'All fields must be filled');
    }
    if (password.length < 6 || cpassword.length < 6) {
      Alert.alert('Warning', 'Password length should be atleast 6 characters');
    }
    if (password != cpassword) {
      Alert.alert('Warning', 'Password mismatch');
    } else {
      setLoading(true);
      console.log(user.user.email);
      let ip = {};
      ip['email'] = user.user.email;
      ip['password'] = password;
      savePasswordtoDB(ip)
        .then(result => {
          if (result.error) {
            setLoading(false);
            Alert.alert(result.error);
            return;
          }
          Alert.alert(result.message);
          setLoading(false);
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <View style={styles.container}>
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
            source={require('../assets/password.png')}
            resizeMode="contain"
            style={{height: 30, width: 30}}
          />{' '}
          Change Password
        </Text>
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}>
        <View style={{flex: 1}}>
          <View style={styles.action}>
            <TextInput
              placeholderTextColor="grey"
              style={styles.heading}
              placeholder="Enter New Password"
              secureTextEntry
              onChangeText={e => setPassword(e)}
            />
            <TextInput
              placeholderTextColor="grey"
              style={styles.heading}
              placeholder="Confirm New Password"
              secureTextEntry
              onChangeText={e => setCpassword(e)}
            />
          </View>
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={() => handleClick()}>
              Change Password{' '}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttoncancel}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonTextcancel}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    width: width,
    alignItems: 'center',
  },
  heading: {
    width: '93%',
    height: 60,
    elevation: 3,
    borderRadius: 6,
    backgroundColor: 'white',
    borderWidth: 2,
    color: '#12263A',
    padding: 10,
    borderColor: '#F4EDEA',
    fontSize: 15,
    marginTop: 15,
  },
  buttonSection: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#FFB700',
    width: '90%',
    padding: 5,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttoncancel: {
    backgroundColor: '#fff',
    width: '40%',
    padding: 5,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  buttonTextcancel: {
    color: '#0C717E',
    fontSize: 17,
    fontWeight: 'bold',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
