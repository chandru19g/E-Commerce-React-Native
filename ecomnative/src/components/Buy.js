import AsyncStorage from '@react-native-async-storage/async-storage';
import {Textarea} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {placeOrder} from '../screen/auth/helpers/orders';

const Buy = ({navigation}) => {
  const [users, setUsers] = useState(null);
  const [cart, setCart] = useState([]);
  const [sum, setsum] = useState(0);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: '',
    location: '',
    pincode: '',
    phoneno: '',
    products: [],
    state: 'Tamilnadu',
    district: 'Tiruppur',
  });

  useEffect(() => {
    setLoading(true);
    let result = 0;
    cart.forEach(c => (result += Number(c.cartprice) * Number(c.count)));
    setsum(result);
    console.log(result);
    getUser();
    setLoading(true);
  }, [cart]);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    setLoading(true);
    const val = await AsyncStorage.getItem('cart');
    console.log('Value', val);
    if (val === null) {
      AsyncStorage.setItem('cart', JSON.stringify([]));
    }
    let newCart = JSON.parse(val);
    const Unique = Array.from(new Set(newCart));
    console.log('Unique Cart', Unique);
    setCart(newCart);
    setLoading(false);
  };
  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      console.log('User', value);
      if (value === null) {
        setUsers(value);
        navigation.replace('Login');
      } else {
        setUsers(JSON.parse(value));
        console.log('user', value);
        console.log('Name', users.user.name);
        setInput({
          ...input,
          name: users.user.name,
          products: cart,
        });
      }
    } catch (e) {
      // error reading value
    }
  };

  const orderClick = () => {
    setLoading(true);
    console.log(users.user._id);
    if (!input.phoneno || !input.location || !input.pincode) {
      Alert.alert('Warning', 'All Fields must be entered');
    } else {
      console.log('input.products', input.products);
      let myobject = {
        products: input.products,
        total: sum,
        user: users.user._id,
        street: input.location,
        state: input.state,
        district: input.district,
        phoneNo: input.phoneno,
      };
      console.log(myobject.products);
      placeOrder(users.user._id, myobject)
        .then(result => {
          if (!result) {
            // setOutput({...output, error: true, message: result.error});
            Alert.alert('Error');
            return;
          }
          if (result.error) {
            console.log('result.error', result);
            Alert.alert('Error', result.error);
          } else {
            Alert.alert('Success', 'Your order placed successfully');
            //setOutput({...output, error: false, message: result.message});
            console.log('Setting Cart Empty Order placed successfully');
            AsyncStorage.setItem('cart', JSON.stringify([]));
            setLoading(false);
            navigation.replace('Home');
          }
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View
        style={{
          backgroundColor: '#FFC4D6',
          width: '100%',
          flexDirection: 'row',
          marginBottom: 1,
        }}>
        <View style={{margin: 10}}>
          <Text style={{fontSize: 20}}>Fill Your Details </Text>
        </View>
      </View>
      <ScrollView style={{marginRight: 5}}>
        <View style={{margin: 5}}>
          <Text>Name</Text>
          <TextInput
            defaultValue={input.name}
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#FFF',
              margin: 5,
              color: '#000',
            }}
          />
        </View>
        <View style={{margin: 5}}>
          <Text>Phone Number</Text>
          <TextInput
            placeholder="Enter your mobile number"
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#FFF',
              margin: 5,
              color: '#000',
            }}
            placeholderTextColor="grey"
            onChangeText={e => setInput({...input, phoneno: e})}
            maxLength={10}
          />
        </View>
        <View style={{margin: 5}}>
          <Text>Location</Text>
          <Textarea
            placeholder="Enter the location"
            style={{
              width: '100%',

              backgroundColor: '#FFF',
              margin: 5,
              color: '#000',
            }}
            placeholderTextColor="grey"
            onChangeText={e => setInput({...input, location: e})}
          />
        </View>
        <View style={{margin: 5}}>
          <Text>Pincode</Text>
          <TextInput
            placeholder="Enter the pincode"
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#FFF',
              margin: 5,
              color: '#000',
            }}
            placeholderTextColor="grey"
            onChangeText={e => setInput({...input, pincode: e})}
          />
        </View>
        <View
          style={{
            margin: 5,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'grey'}}>*Cash On Delivery only available*</Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            margin: 5,
          }}>
          <View
            style={{
              backgroundColor: '#32292F',
              width: '60%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              height: 80,
              marginBottom: 3,
              borderRadius: 5,
            }}>
            <Text
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: '#FFF',
                fontSize: 15,
              }}>
              Total Amount Rs. {sum}
            </Text>
            <TouchableOpacity
              onPress={() => orderClick()}
              style={{
                backgroundColor: '#FFB700',
                margin: 4,
                marginTop: 8,
                padding: 4,
                borderRadius: 4,
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: '#FFF',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            margin: 5,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'grey'}}></Text>
        </View>
        <View>
          <TouchableOpacity>
            <Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Buy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
