import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {addCategorytoDB} from '../../../auth/helpers/categories';

const AddCategory = ({navigation}) => {
  const [input, setInput] = useState({name: '', link: '', id: '', token: ''});
  const [output, setOutput] = useState({error: false, message: ''});

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      console.log('user', value);
      if (value === null) {
        setUser(value);
        navigation.replace('Login');
        console.log('setting user', value);
      } else {
        console.log('value', value);
        setUser(JSON.parse(value));
        console.log('users', user);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const API = 'https://ecomnativebackend.herokuapp.com/api';
  const addCategorytoDB = input => {
    return fetch(`${API}/add/category`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ///Authorization: `Bearer ${input.token}`,
      },
      body: JSON.stringify(input),
    })
      .then(result => result.json())
      .catch(error => console.error(error));
  };

  const AddCategoryClick = () => {
    setLoading(true);
    setOutput({...input});
    addCategorytoDB(input).then(result => {
      console.log('result', result);
      if (!result) {
        setOutput({...output, error: true, message: user.message});
        return;
      }
      //setOutput({...output, error: false, message: result.message});
      Alert.alert('Success', result.message);
      setInput({...input, name: '', link: ''});
      setLoading(false);
    });
    //.catch(error => console.error(error));
  };

  return user === null ? (
    <ActivityIndicator size="large" color="#000" />
  ) : (
    <View>
      <View
        style={{
          backgroundColor: '#FFC4D6',
          padding: 10,
          width: '100%',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
          }}>
          {' \t '}
          Add Category
        </Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            style={styles.InputField}
            placeholder="Enter the category"
            placeholderTextColor="grey"
            onChangeText={e => setInput({...input, name: e})}
          />
          <TextInput
            style={styles.InputField}
            placeholder="Enter the Image Link"
            placeholderTextColor="grey"
            onChangeText={e => setInput({...input, link: e})}
          />
          <TouchableOpacity
            style={styles.buttonSection}
            onPress={() => AddCategoryClick()}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  InputField: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '50%',
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
