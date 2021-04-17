import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import {getOrderByUserId} from '../auth/helpers/orders';

const Ordered = ({navigation}) => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState('');
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      setLoading(true);
      const value = await AsyncStorage.getItem('key');
      console.log('User', value);
      if (value === null) {
        setUser(value);
        navigation.replace('Login');
      } else {
        console.log('user', value);
        setUser(JSON.parse(value));
        console.log('Setting User');
        setLoading(false);
      }
    } catch (e) {
      // error reading value
    }
  };

  const getOrder = () => {
    setLoading(true);
    let userId = user.user._id;
    getOrderByUserId(userId)
      .then(result => {
        if (result.error) {
          console.error(result.error);
          return;
        }
        setOrder(result.orders);
        setLoading(false);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    console.log('Order User', user);
    if (user !== null) {
      getOrder();
      setLoading(false);
    }
  }, [user]);

  return loading ? (
    <ActivityIndicator size="large" color="#000" />
  ) : (
    <KeyboardAvoidingView style={styles.container}>
      <View
        style={{
          backgroundColor: '#FFC4D6',
          width: '100%',
          flexDirection: 'row',
          marginBottom: 1,
        }}>
        <View style={{margin: 10}}>
          <Text style={{fontSize: 20}}>Your Orders </Text>
        </View>
      </View>
      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          order.map((o, i) => {
            return (
              <View
                key={i}
                style={{
                  backgroundColor: '#0E1428',
                  padding: 5,
                  margin: 5,
                  borderRadius: 5,
                }}>
                <View>
                  <Text style={{color: '#FFF', fontSize: 16}}>
                    Invoice Number: <Text>{o._id} </Text>
                  </Text>
                </View>
                <Text style={{color: '#FFF', fontSize: 16, padding: 4}}>
                  Products:
                </Text>
                <View>
                  {o.products.map(product => {
                    return (
                      <View
                        key={product._id}
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          padding: 5,
                          backgroundColor: '#8B95C9',
                          margin: 5,
                          borderRadius: 8,
                        }}>
                        <Image
                          source={{uri: `${product.product.photo}`}}
                          style={{height: 100, width: 100, borderRadius: 8}}
                        />
                        <View
                          style={{
                            flexDirection: 'column',
                            margin: 5,
                            paddingLeft: 10,
                            justifyContent: 'center',
                          }}>
                          <Text style={{color: '#000', fontSize: 16}}>
                            {product.product.name}
                          </Text>
                          <Text style={{color: '#000', fontSize: 16}}>
                            Count: {product.count}{' '}
                          </Text>
                          <Text style={{color: '#000', fontSize: 16}}>
                            Size: {product.size}{' '}
                          </Text>
                          <Text style={{color: '#000', fontSize: 16}}>
                            Rs. {product.product.price}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                  <View style={{padding: 5}}>
                    <Text
                      style={{
                        color: '#FFF',
                        justifyContent: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: 16,
                        padding: 5,
                      }}>
                      Total Amount Rs. {o.total}
                    </Text>
                    <View
                      style={
                        o.status === 'Pending'
                          ? {
                              backgroundColor: '#E97A73',
                              padding: 5,
                              borderRadius: 5,
                            }
                          : {
                              backgroundColor: '#8bc34a',
                              padding: 5,
                              borderRadius: 5,
                            }
                      }>
                      <Text
                        style={{
                          color: '#FFF',
                          justifyContent: 'center',
                          alignContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          fontSize: 16,
                        }}>
                        {o.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Ordered;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
