import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getAllOrderAdmin, updateOrderStatus} from '../../../auth/helpers/order';

const ViewOrders = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('user', user);
    if (user !== null) {
      updateOrder();
    }
  }, [user]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      console.log('Working');
      const value = await AsyncStorage.getItem('key');
      console.log(value);
      if (value === null) {
        setUser(value);
        navigation.replace('Login');
      } else {
        setUser(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const updateOrder = () => {
    setLoading(true);

    getAllOrderAdmin(user.user._id)
      .then(result => {
        if (result.error) {
          console.error(result.error);
          return;
        }
        setLoading(false);
        setOrders(result.orders);
        console.log(result.orders);
      })
      .catch(error => console.error(error));
  };

  const handleClick = orderId => {
    updateOrderStatus(user.user._id, orderId)
      .then(result => {
        if (result.error) {
          console.error(result.error);
          return;
        }
        updateOrder();
      })
      .catch(error => console.error(error));
  };

  return loading ? (
    <ActivityIndicator size="large" color="#000" />
  ) : (
    <ScrollView>
      {orders.map((order, item) => {
        if (order.user)
          return (
            <View
              key={item}
              style={{
                backgroundColor: '#0E1428',
                padding: 5,
                margin: 5,
                borderRadius: 5,
                paddingTop: 5,
                marginLeft: 5,
              }}>
              <View
                style={{
                  backgroundColor: '#8B95C9',
                  padding: 4,
                  borderRadius: 5,
                  margin: 4,
                }}>
                <Text style={{color: '#FFF', fontSize: 16}}>
                  Invoice Number: {order._id}{' '}
                </Text>
              </View>
              <View>
                <Text style={{color: '#FFF', fontSize: 16}}>
                  <Text style={{fontWeight: 'bold'}}>User:</Text>{' '}
                  {order.user.name}{' '}
                </Text>
              </View>
              <View>
                <Text style={{color: '#FFF', fontSize: 16}}>
                  <Text style={{fontWeight: 'bold'}}>Phone Number: </Text>
                  {order.phoneNo}{' '}
                </Text>
              </View>
              <View>
                <Text style={{color: '#FFF', fontSize: 16}}>
                  <Text style={{fontWeight: 'bold'}}>Shipping Address:</Text>
                  {'\n'} {'\t'} {order.street}, {order.district},{order.state}
                </Text>
              </View>
              <View>
                {order.products.map(pro => {
                  console.log(pro);
                  return (
                    <View
                      key={pro._id}
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        padding: 5,
                        backgroundColor: '#8B95C9',
                        margin: 5,
                        borderRadius: 8,
                      }}>
                      <View>
                        <Image
                          source={{uri: `${pro.product.photo}`}}
                          style={{height: 150, width: 150, borderRadius: 5}}
                        />
                      </View>
                      <View
                        style={{
                          padding: 5,
                          marginLeft: 5,
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}>
                        <View>
                          <Text style={{color: '#FFF', fontSize: 16}}>
                            {pro.product.name}
                          </Text>
                        </View>
                        <View>
                          <Text style={{color: '#FFF', fontSize: 16}}>
                            Size: {pro.size}{' '}
                          </Text>
                        </View>
                        <View>
                          <Text style={{color: '#FFF', fontSize: 16}}>
                            Count: {pro.count}{' '}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
              <View>
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
                  Total Rs. {order.total}{' '}
                </Text>
              </View>
              <View
                style={
                  order.status === 'Pending'
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
                  {order.status}
                </Text>
              </View>
              <View>
                {order.status === 'Pending' ? (
                  <View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#FFB700',
                        padding: 5,
                        borderRadius: 5,
                        marginTop: 5,
                      }}
                      onPress={() => handleClick(order._id)}>
                      <Text
                        style={{
                          color: '#000',
                          justifyContent: 'center',
                          alignContent: 'center',
                          alignItems: 'center',
                          textAlign: 'center',
                          fontSize: 16,
                        }}>
                        Click here if the Product is delivered
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
            </View>
          );
      })}
    </ScrollView>
  );
};

export default ViewOrders;

const styles = StyleSheet.create({});
