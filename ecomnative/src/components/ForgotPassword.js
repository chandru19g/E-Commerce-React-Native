import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {getOTP, savePasswordtoDB} from '../screen/auth/helpers/auth';

const {width, height} = Dimensions.get('screen');

const ForgotPassword = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [ipOTP, setIpOTP] = useState('');
  const [crtOPT, setCrtOTP] = useState('');

  const [output, setOutput] = useState({
    error: false,
    message: '',
  });
  const verifyOTP = () => {
    if (ipOTP !== crtOPT) {
      Alert.alert('Warning', 'Wrong OTP');
      setShowPassword(false);
    } else {
      setShowPassword(true);
      Alert.alert('Success', 'OTP Matched');
    }
  };
  const [email, setEmail] = useState('');
  const handleClickOTP = () => {
    setLoading(true);
    getOTP({email: email})
      .then(result => {
        if (result.error) {
          setLoading(false);
          Alert.alert(result.error);
          return;
        }
        setCrtOTP(result.OTP);
        setShowOtp(true);
        Alert.alert(result.message);
        setLoading(false);
      })
      .catch(error => console.error(error));
  };
  const saveNewPassword = () => {
    setLoading(true);

    if (password.length < 6) {
      Alert.alert('Password must be atleast 6 characters');
    }
    if (password !== cpassword) {
      Alert.alert('Mismatch Password');
    } else {
      let ip = {};
      ip['email'] = email;
      ip['password'] = password;
      savePasswordtoDB(ip)
        .then(result => {
          if (result.error) {
            setLoading(false);
            Alert.alert(result.error);
            setOutput({...output, error: true, message: result.error});
            return;
          }
          setCrtOTP(result.OTP);
          Alert.alert(result.message);
          setOutput({...output, error: false, message: result.message});
          navigation.replace('Login');
          setLoading(false);
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" />
      <View style={styles.sectionContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Forgot Password</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.bodySection}>
            <TextInput
              style={styles.InputField}
              onChangeText={e => setEmail(e)}
              placeholder="Email"
              placeholderTextColor="grey"
              autoCapitalize="none"
            />
          </View>
          {!showOtp ? (
            <View style={styles.buttonSection}>
              <TouchableOpacity
                onPress={() => handleClickOTP()}
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.buttonText}>Get OTP</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View style={styles.bodySection}>
                <TextInput
                  style={styles.InputField}
                  onChangeText={e => setIpOTP(e)}
                  placeholder="Enter OTP"
                  placeholderTextColor="grey"
                />
              </View>
              <View style={styles.buttonSection}>
                <TouchableOpacity
                  onPress={() => verifyOTP()}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.buttonText}>Verify OTP</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {showPassword ? (
            <View>
              <View style={styles.bodySection}>
                <TextInput
                  style={styles.InputField}
                  onChangeText={e => setPassword(e)}
                  placeholder="Enter New Password"
                  placeholderTextColor="grey"
                  secureTextEntry
                />
              </View>
              <View>
                <TextInput
                  style={styles.InputField}
                  onChangeText={e => setCpassword(e)}
                  placeholder="Re-Enter New Password"
                  placeholderTextColor="grey"
                  secureTextEntry
                />
              </View>
              <View style={styles.buttonSection}>
                <TouchableOpacity
                  onPress={() => saveNewPassword()}
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.buttonText}>Save Password</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View></View>
          )}
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

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
    height: height / 1.8,
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
    justifyContent: 'center',
    alignContent: 'center',
  },
  InputField: {
    marginTop: 5,
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
