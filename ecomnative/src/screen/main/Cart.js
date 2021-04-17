import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';

const Cart = ({navigation}) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCart();
  }, [cart]);

  useEffect(() => {
    setLoading(true);
    let result = 0;
    cart.forEach(c => (result += Number(c.cartprice) * Number(c.count)));
    setTotal(result);
    setLoading(false);
  }, [cart]);

  const getCart = async () => {
    setLoading(true);
    const val = await AsyncStorage.getItem('cart');

    if (val === null) {
      AsyncStorage.setItem('cart', JSON.stringify([]));
    }

    let newCart = JSON.parse(val);

    const Unique = Array.from(new Set(newCart));

    setCart(newCart);
    setLoading(false);
  };

  const trashclick = product => {
    let newcart = cart.filter(c => c.product !== product.product);
    setCart(newcart);
    AsyncStorage.setItem('cart', JSON.stringify(newcart));
    Alert.alert('Product deleted from the cart');
  };

  return cart === [] ? (
    <Text>Nothing in the Cart</Text>
  ) : loading ? (
    <ActivityIndicator size="large" color="#000" />
  ) : (
    <KeyboardAvoidingView style={styles.container}>
      <View
        style={{
          backgroundColor: '#FFC4D6',
          padding: 10,
          width: '100%',
          flexDirection: 'row',
          marginBottom: 1,
        }}>
        <View style={{margin: 10}}>
          <Text style={{fontSize: 20}}>Shopping Cart</Text>
        </View>
      </View>

      <ScrollView>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {cart.map((c, i) => {
            return (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  margin: 5,
                  marginBottom: 15,
                  borderBottomColor: '#000',
                  borderBottomWidth: 1,
                  width: '100%',
                  paddingBottom: 15,
                }}>
                <View>
                  <Image
                    source={{uri: `${c.cartphoto}`}}
                    style={{height: 150, width: 100}}
                  />
                </View>
                <View
                  style={{
                    marginLeft: 15,
                    justifyContent: 'center',
                    alignContent: 'center',
                    flexWrap: 'wrap',
                  }}>
                  <View>
                    <Text style={{fontSize: 20, color: '#F4442E', padding: 3}}>
                      {c.cartname}
                    </Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 18, color: '#16C172', padding: 3}}>
                      Rs. {c.cartprice}
                    </Text>
                  </View>
                  <View>
                    <Text style={{fontSize: 18, padding: 3}}>
                      Count {c.count}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{padding: 3}}
                    onPress={() => trashclick(c)}>
                    <Image
                      source={require('../../assets/trash.png')}
                      style={{height: 30, width: 30}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
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
              {total === 0 ? (
                <Text>{total} products found in the cart</Text>
              ) : (
                <View>
                  <Text style={{color: '#FFF'}}>
                    Your Cart Total Rs. {total}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.replace('Buy')}
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
                      Procced to checkout
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
