import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Dimensions,
  StatusBar,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState, useContext} from 'react';
import {login} from './helpers/login';

const {width, height} = Dimensions.get('screen');

const Login = ({navigation}) => {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const {user, setUser} = useState(null);
  const {setToken} = useState(null);
  const [output, setOutput] = useState({
    error: '',
    message: '',
    loading: false,
    redirect: false,
  });
  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      console.log('value log', value);
      value = JSON.parse(value);
      if (value !== null) {
        setUser(value.user);
        setToken(value.token);
        console.log('value role', value.user.role);
        navigation.replace('Home');
      } else {
        setUser(null);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  const setLocalStorage = async value => {
    try {
      await AsyncStorage.setItem('key', JSON.stringify(value));
      console.log('Setting Item', value);
    } catch (e) {
      // saving error
    }
  };
  const loginHandleListener = async () => {
    setOutput({...input, loading: true});
    login(input)
      .then(result => {
        let err = '';
        let msg = '';
        if (!result) {
          setLoading(false);
          Alert.alert('Error', 'Error in network');
          return;
        }
        console.log('result', result);
        if (result.error) {
          err = result.error;
        } else {
          msg = result.message;
          setLocalStorage(result);
          console.log('result role', result.user.role);
          navigation.replace('Home');
          //setOutput({...output, redirect: true});
        }
        setOutput({...output, message: msg, error: err, loading: false});
        console.log(result);
        // setLocalStorage(result);
      })
      .catch(error => console.error(error));
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.sectionContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Login{' '}
            <Image
              source={require('../../assets/login.png')}
              resizeMode="contain"
              style={{
                height: 20,
                width: 25,
              }}
            />
          </Text>
        </View>
        <View style={styles.bodySection}>
          <TextInput
            style={styles.InputField}
            onChangeText={e => setInput({...input, email: e})}
            placeholder="Email"
            placeholderTextColor="grey"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.bodySection}>
          <TextInput
            style={styles.InputField}
            onChangeText={e => setInput({...input, password: e})}
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.buttonSection}>
          <TouchableOpacity
            onPress={() => loginHandleListener()}
            style={{
              width: '100%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <Text style={{fontSize: 16}}>Don't have an Account?</Text>
        </View>
        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{color: '#00509D', fontSize: 15, fontWeight: 'bold'}}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={{color: '#00509D', fontSize: 15, fontWeight: 'bold'}}>
              Forget Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343A40',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    backgroundColor: '#EDF6F9',
    height: height / 2,
    width: width / 1.3,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  header: {
    backgroundColor: '#CED4DA',
    width: width / 1.3,
    height: 40,
    padding: 5,
    alignContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
  },
  bodySection: {
    backgroundColor: '#fff',
    marginTop: 15,
    height: 40,
    width: width / 1.5,
    borderRadius: 20,
  },
  InputField: {
    borderRadius: 20,
    paddingLeft: 10,
    color: '#05375a',
    backgroundColor: '#fff',
  },
  buttonSection: {
    backgroundColor: '#FFB700',
    marginTop: 10,
    borderRadius: 4,
    width: '50%',
    height: 35,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
