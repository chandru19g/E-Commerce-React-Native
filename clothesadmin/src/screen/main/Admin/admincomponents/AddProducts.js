import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {fetchAllCategories} from '../../../auth/helpers/categories';
import {addProduct} from '../../../auth/helpers/products';
import {Textarea} from 'native-base';

const AddProducts = () => {
  const [size, setSize] = useState([]);
  const [input, setInput] = useState({
    name: '',
    category: 0,
    photo: '',
    stock: '',
    price: '',
    description: '',
  });
  const [categories, setCategories] = useState([]);
  const [output, setOutput] = useState({
    error: false,
    message: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    preLoadCategories();
  });

  const preLoadCategories = () => {
    fetchAllCategories().then(result => {
      if (!result) return;
      if (result.error) {
        setOutput({...output, error: true, message: result.error});
        return;
      }
      setCategories(result.categories);
      setLoading(false);
      // setInput({ ...input, formData: new FormData() });
    });
  };

  const handleClick = () => {
    let formData = new FormData();
    console.log(input.category);
    if (input.category === 0) {
      Alert.alert('Select Category');
      return;
    }
    setLoading(true);
    Alert.prompt('Adding The Product');
    console.log(input.name);
    console.log(size[2]);
    formData.append('name', input.name);
    formData.append('category', input.category);
    formData.append('photo', input.photo);
    formData.append('stock', input.stock);
    formData.append('price', input.price);
    formData.append('size', size[(0, 1, 2)]);
    formData.append('description', input.description);
    addProduct(formData).then(result => {
      Alert.alert('Success', 'Product Added successfully');
      // if (!result) {
      //   console.log(result);
      //   //setOutput({...output, error: true, message: result.error});
      //   return;
      // }

      //setOutput({...output, error: false, message: result.message});
      setInput({
        ...input,
        name: '',
        photo: '',
        stock: '',
        price: '',
        description: '',
      });

      setLoading(false);
    });
  };

  return loading ? (
    <ActivityIndicator size="large" color="#000" animating={true} />
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <Text style={styles.InputLabel}>Product Name</Text>
          <TextInput
            placeholder="Enter the Product Name"
            placeholderTextColor="grey"
            style={styles.InputField}
            onChangeText={e => {
              setInput({...input, name: e});
            }}
          />
        </View>
        <View>
          <Text style={styles.InputLabel}>Select Category</Text>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#fff',
              borderColor: '#000',
              borderWidth: 0.5,
              marginTop: 5,
              marginBottom: 8,
            }}>
            <Picker
              style={styles.picker}
              onValueChange={e => {
                setInput({...input, category: e});
              }}>
              <Picker.Item label="Select Category" />
              {categories.map(cate => {
                return (
                  <Picker.Item
                    key={cate._id}
                    label={cate.name}
                    value={cate._id}
                  />
                );
                // {
                //   console.log(cate._id);
                // }
              })}
            </Picker>
            <Image
              source={require('../../../../assets/down.png')}
              style={{
                height: 20,
                width: 20,
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                marginTop: 15,
                marginRight: 25,
              }}
            />
          </View>
        </View>
        <View>
          <Text style={styles.InputLabel}>Product Photo</Text>
          <TextInput
            placeholder="Enter the Image Link"
            placeholderTextColor="grey"
            style={styles.InputField}
            onChangeText={e => {
              setInput({...input, photo: e});
            }}
          />
        </View>
        <View>
          <Text style={styles.InputLabel}>Stock</Text>
          <TextInput
            placeholder="No of products available"
            placeholderTextColor="grey"
            style={styles.InputField}
            onChangeText={e => {
              setInput({...input, stock: e});
            }}
          />
        </View>
        <View>
          <Text style={styles.InputLabel}>Price</Text>
          <TextInput
            placeholder="Price of the product"
            placeholderTextColor="grey"
            style={styles.InputField}
            onChangeText={e => {
              setInput({...input, price: e});
            }}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.InputLabel, {marginTop: 13}]}>Sizes</Text>
          <TouchableOpacity
            style={
              size.includes('S')
                ? {
                    color: '#fff',
                    backgroundColor: '#131921',
                    marginTop: 10,
                    marginLeft: 10,
                    width: '15%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }
                : {
                    backgroundColor: 'white',
                    borderColor: '#000',
                    width: '15%',
                    marginTop: 10,
                    marginLeft: 10,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }
            }
            onPress={() => {
              if (size.includes('S')) {
                let newSize = size.filter(s => s !== 'S');
                setSize(newSize);
              } else {
                let newSize = size;
                newSize.push('S');
                setSize(newSize);
              }
            }}>
            <Text
              style={
                size.includes('S')
                  ? {
                      fontWeight: 'bold',
                      fontSize: 25,
                      color: '#fff',
                    }
                  : {
                      fontWeight: 'bold',
                      fontSize: 25,
                      color: '#000',
                    }
              }>
              S
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              size.includes('M')
                ? {
                    color: '#fff',
                    backgroundColor: '#131921',
                    marginTop: 10,
                    marginLeft: 10,
                    width: '15%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }
                : {
                    backgroundColor: 'white',
                    borderColor: '#000',
                    width: '15%',
                    marginTop: 10,
                    marginLeft: 10,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }
            }
            onPress={() => {
              if (size.includes('M')) {
                let newSize = size.filter(s => s !== 'M');
                setSize(newSize);
              } else {
                let newSize = size;
                newSize.push('M');
                setSize(newSize);
              }
            }}>
            <Text
              style={
                size.includes('M')
                  ? {
                      fontWeight: 'bold',
                      fontSize: 25,
                      color: '#fff',
                    }
                  : {
                      fontWeight: 'bold',
                      fontSize: 25,
                      color: '#000',
                    }
              }>
              M
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              size.includes('L')
                ? {
                    color: '#fff',
                    backgroundColor: '#131921',
                    marginTop: 10,
                    marginLeft: 10,
                    width: '15%',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }
                : {
                    backgroundColor: 'white',
                    borderColor: '#000',
                    width: '15%',
                    marginTop: 10,
                    marginLeft: 10,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }
            }
            onPress={() => {
              if (size.includes('L')) {
                let newSize = size.filter(s => s !== 'L');
                setSize(newSize);
              } else {
                let newSize = size;
                newSize.push('L');
                setSize(newSize);
              }
            }}>
            <Text
              style={
                size.includes('L')
                  ? {
                      fontWeight: 'bold',
                      fontSize: 25,
                      color: '#fff',
                    }
                  : {
                      fontWeight: 'bold',
                      fontSize: 25,
                      color: '#000',
                    }
              }>
              L
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={[styles.InputLabel, {marginTop: 15}]}>Description</Text>
          <Textarea
            placeholder="Details of the product"
            placeholderTextColor="grey"
            style={styles.InputField}
            onChangeText={e => {
              setInput({...input, description: e});
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.buttonSection}
            onPress={() => handleClick()}>
            <Text style={styles.buttonText}>Add Product</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  InputLabel: {
    fontSize: 18,
  },
  InputField: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
    marginBottom: 8,
    paddingLeft: 15,
    color: '#05375a',
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 0.5,
  },
  picker: {
    width: 300,
    height: 45,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    color: '#05375a',
    borderColor: '#000',
    borderWidth: 0.5,
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
