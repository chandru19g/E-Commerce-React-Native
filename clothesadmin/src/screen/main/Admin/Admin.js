import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import {isAuthenticated} from '../../auth/helpers/auth';
import AddCategory from './admincomponents/AddCategory';
import ManageCategories from './admincomponents/ManageCategories';
import ViewProduct from './admincomponents/ViewProduct';
import ViewOrders from './admincomponents/ViewOrders';
import AddProducts from './admincomponents/AddProducts';

const Admin = ({navigation}) => {
  const [view, setView] = useState('Manage Categories');
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      console.log('value role', value.user.role);
      console.log(user);
      if (value !== null) {
        setUser(value);
        console.log('value role', value.user.role);
      } else {
        navigation.replace('Login');
        setUser(null);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  const showAdminDashboard = () => {
    if (view === 'Manage Categories') return <ManageCategories />;
    else if (view === 'Add Category') return <AddCategory />;
    else if (view === 'Add products') return <AddProducts />;
    else if (view === 'View Product') return <ViewProduct />;
    else if (view === 'View All Orders') return <ViewOrders />;
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar backgroundColor="#FFA6C1" />
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
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
            marginLeft: 300,
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
            }}
            onPress={() => navigation.navigate('AdminProfile')}>
            <Image
              source={require('../../../assets/profile.png')}
              style={{height: 25, width: 25}}
            />
          </TouchableOpacity>
        </Text>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={styles.Section}>
          <Picker
            style={styles.picker}
            selectedValue={view}
            onValueChange={e => {
              setView(e);
            }}>
            <Picker.Item label="Manage Categories" value="Manage Categories" />
            <Picker.Item label="Add Category" value="Add Category" />
            <Picker.Item label="Add products" value="Add products" />
            <Picker.Item label="View Product" value="View Product" />
            <Picker.Item label="View All Orders" value="View All Orders" />
          </Picker>
        </View>
        {showAdminDashboard()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Section: {
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: 300,
    height: 45,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    color: '#fff',
  },
  buttonSection: {
    backgroundColor: '#FFB700',
    width: '50%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 30,
    borderRadius: 8,
  },
  buttonText: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
