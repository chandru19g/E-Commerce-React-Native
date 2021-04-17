import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';

const ParticularProduct = ({navigation, route}) => {
  const {
    id,
    name,
    sizes,
    categoryId,
    photo,
    stock,
    price,
    description,
  } = route.params;

  const [isSelected, setIsSelected] = useState(false);
  const [isSelectedm, setIsSelectedm] = useState(false);
  const [isSelectedl, setIsSelectedl] = useState(false);
  const [currCount, setCurrCount] = useState(1);
  const [availsizes, setAvailsizes] = useState('');
  const [cart, setCart] = useState([]);
  const [valcount, setValcount] = useState(1);
  const [currsize, setCurrsize] = useState('');

  const selectHandle = () => {
    setIsSelected(!isSelected);
    console.log(isSelected);
    console.log(availsizes);
  };

  const selectHandlem = () => {
    setIsSelectedm(!isSelectedm);
    console.log(isSelectedm);
    console.log(availsizes);
  };

  const selectHandlel = () => {
    setIsSelectedl(!isSelectedl);
    console.log(isSelectedl);
    console.log(availsizes);
  };
  console.log(availsizes);

  const setLocalStorage = async newcart => {
    try {
      console.log('Working good');
      let value = await AsyncStorage.setItem('cart', JSON.stringify(newcart));
      console.log(value);
    } catch (e) {
      // saving error
    }
  };

  const getLocalStorage = async () => {
    try {
      let oldCart = await AsyncStorage.getItem('cart');
      oldCart = JSON.parse(oldCart);
      console.log('OldCart', oldCart);
      setCart(oldCart);
    } catch (error) {}
  };

  useEffect(() => {
    getLocalStorage();
  }, []);

  const handleClick = () => {
    if (
      isSelected === false &&
      isSelectedl === false &&
      isSelectedm === false
    ) {
      Alert.alert('Please Select a size');
    } else {
      if (
        (isSelected && isSelectedl) ||
        (isSelected && isSelectedm) ||
        (isSelectedm && isSelectedl)
      ) {
        Alert.alert('Select any one size');
      } else {
        let newcart = cart;
        let exists = newcart.filter(pro => pro.product === id);
        if (exists.length >= 1) {
          console.log('Working product');
          newcart.forEach(pro => {
            if (pro.product === id) {
              console.log('Counting Product', pro.count);
              setValcount(pro.count++);
              console.log('Counting Product', valcount);
              Alert.alert('Product Already in the Cart');
            }
          });
        } else {
          console.log('Working');
          console.log(availsizes);
          newcart.push({
            product: id,
            cartname: name,
            cartprice: price,
            cartphoto: photo,
            count: currCount,
            size: availsizes,
            cartstock: stock,
          });

          console.log('Count', currCount);

          setCart(newcart);
          console.log('cart', cart);
          setLocalStorage(newcart);

          Alert.alert('Success', 'Added to cart');
        }
      }
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View
        style={{
          backgroundColor: '#FFC4D6',
          padding: 10,
          width: '100%',
          flexDirection: 'row',
          marginBottom: 1,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/left-arrow.png')}
            style={{
              height: 20,
              width: 20,
              marginTop: 5,
            }}
          />
        </TouchableOpacity>
        {/* <View
          style={{
            marginLeft: 280,
            marginRight: 15,
          }}>
          <TouchableOpacity onPress={() => navigation.replace('Cart')}>
            <Image
              source={require('../../assets/addcart.png')}
              style={{
                height: 25,
                width: 25,
              }}
            />
          </TouchableOpacity>
        </View>*/}
      </View>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={{uri: `${photo}`}} style={{height: 300, width: 300}} />
        </View>
        <View style={styles.content}>
          <View>
            <Text style={styles.TitleText}>{name} </Text>
          </View>
          <View>
            <Text
              style={
                stock === 0
                  ? {backgroundColor: 'red '}
                  : {color: '#169873', padding: 5, fontSize: 15}
              }>
              {stock === 0 ? 'OUT OF STOCK' : '50% OFF'}
            </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.Price}>Rs. {price}</Text>
            <Text style={styles.PriceStrike}>{Number(price) * 2 + 1}</Text>
          </View>
          <Text style={{fontSize: 18, margin: 5, fontWeight: 'bold'}}>
            Select Count
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              margin: 5,
            }}>
            <TouchableOpacity
              style={{width: 20, margin: 5}}
              onPress={() => {
                if (currCount < stock - 1) {
                  setCurrCount(currCount + 1);
                }
              }}>
              <Text style={{fontSize: 30}}>+</Text>
            </TouchableOpacity>
            <View
              style={{
                borderColor: '#000',
                borderWidth: 1,
                width: 30,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                margin: 5,
              }}>
              <Text style={{fontSize: 20}}>{currCount} </Text>
            </View>
            <TouchableOpacity
              style={{width: 20, margin: 5}}
              onPress={() => {
                if (currCount > 1) {
                  setCurrCount(currCount - 1);
                }
              }}>
              <Text style={{fontSize: 30}}>-</Text>
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 18, margin: 5, fontWeight: 'bold'}}>
            Select Size
          </Text>
          <View
            style={{
              flexDirection: 'row',
              margin: 5,
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={() => {
                selectHandle();

                setAvailsizes(sizes[0]);

                console.log('Value', isSelected);
              }}
              style={
                isSelected === true
                  ? {
                      backgroundColor: '#fff',
                      width: 50,
                      height: 30,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }
                  : {
                      backgroundColor: '#000',
                      width: 50,
                      height: 30,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }
              }>
              <Text
                style={
                  isSelected === true
                    ? {
                        color: '#000',
                        fontSize: 18,
                      }
                    : {
                        color: '#fff',
                        fontSize: 18,
                      }
                }>
                {sizes[0]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setAvailsizes(sizes[1]);

                selectHandlem();
              }}
              style={
                isSelectedm === true
                  ? {
                      backgroundColor: '#fff',
                      width: 50,
                      height: 30,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }
                  : {
                      backgroundColor: '#000',
                      width: 50,
                      height: 30,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }
              }>
              <Text
                style={
                  isSelectedm === true
                    ? {
                        color: '#000',
                        fontSize: 18,
                      }
                    : {
                        color: '#fff',
                        fontSize: 18,
                      }
                }>
                {sizes[1]}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                selectHandlel();

                setAvailsizes(sizes[2]);
              }}
              style={
                isSelectedl === true
                  ? {
                      backgroundColor: '#fff',
                      width: 50,
                      height: 30,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }
                  : {
                      backgroundColor: '#000',
                      width: 50,
                      height: 30,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }
              }>
              <Text
                style={
                  isSelectedl === true
                    ? {
                        color: '#000',
                        fontSize: 18,
                      }
                    : {
                        color: '#FFF',
                        fontSize: 18,
                      }
                }>
                {sizes[2]}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: '#000',
              flexDirection: 'row',
              width: 180,
              flexWrap: 'nowrap',
              marginTop: 20,
              borderRadius: 8,
              height: 40,
              padding: 5,
            }}>
            <TouchableOpacity
              onPress={() => handleClick()}
              style={{
                flexWrap: 'nowrap',
                flexDirection: 'row',
                width: 150,
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff', fontSize: 20}}>Add To Cart</Text>
              <Image
                source={require('../../assets/addcart.png')}
                resizeMode="contain"
                style={{
                  tintColor: '#FFF',
                  padding: 5,
                  marginLeft: 4,
                  height: 20,
                  width: 20,
                }}
              />
            </TouchableOpacity>
          </View>

          <View>
            <Text
              style={{
                fontSize: 18,
                margin: 5,
                fontWeight: 'bold',
                marginTop: 15,
              }}>
              About The Product
            </Text>
            <Text style={{fontSize: 16, margin: 5}}>{description}</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ParticularProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginLeft: 15,
    padding: 5,
  },
  TitleText: {
    fontSize: 25,
    color: '#111D4A',
  },
  Price: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  PriceStrike: {
    marginTop: 8,
    marginLeft: 15,
    fontSize: 20,
    paddingLeft: 8,
    color: '#8896AB',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
  },
});
