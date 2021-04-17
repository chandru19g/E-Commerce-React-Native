import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  View,
  Image,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState, useContext} from 'react';
import {register} from './helpers/login';

const {width, height} = Dimensions.get('screen');

const Signup = ({navigation}) => {
  const [input, setInput] = useState({
    name: '',
    password: '',
    re_enter: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState({
    error: false,
    message: '',
  });
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      console.log('value', value.user.role);
      if (value !== null) {
        setUser(value);
        navigation.replace('Home');
        // console.log('context', context);
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
    } catch (e) {
      // saving error
    }
  };

  const handleCreateAccountListener = async () => {
    console.log('Create Account running');
    if (input.name.length <= 3) {
      setOutput({
        ...output,
        error: true,
        message: 'Name must be atleast 3 char',
      });
      return;
    }
    if (input.password.length === 0) {
      setOutput({...output, error: true, message: 'Enter password'});
      return;
    }
    if (input.password.length < 6) {
      setOutput({
        ...output,
        error: true,
        message: 'password must be atleast of 6 char',
      });
      return;
    }
    if (input.email.length <= 6) {
      setOutput({...output, error: true, message: 'Enter a Valid Email'});
      return;
    }
    // if (input.phoneNo.length !== 10) {
    //   setOutput({
    //     ...output,
    //     error: true,
    //     message: 'Enter a valid Phone Number',
    //   });
    //   return;
    // }
    if (input.password.length < 6) {
      setOutput({
        ...output,
        error: true,
        message: 'password must be atleast 6 char ',
      });
      return;
    }
    setLoading(true);
    register(input)
      .then(result => {
        result = input;
        if (!result) {
          setLoading(false);
          Alert.alert('Error', 'Error in network');
          return;
        }
        if (result.error) {
          setOutput({...output, error: true, message: result.error});
          Alert.alert('Error', result.error);
          setLoading(false);
          return;
        }
        setInput({...input, name: '', password: '', email: '', re_enter: ''});

        setLoading(false);
        setLocalStorage(result);
        console.log('local_storage', setLocalStorage());
        navigation.replace('Home');
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.sectionContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            <Image
              source={require('../../assets/createacnt.png')}
              resizeMode="contain"
              style={{
                height: 20,
                width: 20,
              }}
            />
            {' \t'}
            Create Account
          </Text>
        </View>
        <View style={styles.bodySection}>
          <TextInput
            style={styles.InputField}
            placeholder="Username"
            onChangeText={e => setInput({...input, name: e})}
            placeholderTextColor="grey"
          />
        </View>

        <View style={styles.bodySection}>
          <TextInput
            style={styles.InputField}
            placeholder="Email"
            placeholderTextColor="grey"
            onChangeText={e => setInput({...input, email: e})}
          />
        </View>
        <View style={styles.bodySection}>
          <TextInput
            style={styles.InputField}
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={e => setInput({...input, password: e})}
          />
        </View>
        <View style={styles.bodySection}>
          <TextInput
            style={styles.InputField}
            placeholder="Confirm Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={e => {
              console.log(e);
              setInput({...input, re_enter: e});
            }}
          />
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity
            onPress={() => handleCreateAccountListener()}
            style={{
              width: '100%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <Text style={{fontSize: 16}}>Already have an Account?</Text>
        </View>
        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: '#00509D', fontSize: 18, fontWeight: 'bold'}}>
              Login here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;

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
    height: height / 1.5,
    width: width / 1.3,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  header: {
    backgroundColor: '#CED4DA',
    width: width / 1.3,
    height: 35,
    padding: 5,
    alignContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
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
    marginTop: 15,
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
    fontSize: 15,
    padding: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
