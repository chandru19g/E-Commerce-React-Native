import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  deleteCategory,
  fetchAllCategories,
} from '../../../auth/helpers/categories';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
    preLoadCategories();
  }, []);

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      console.log(user);
      if (value !== null) {
        setUser(JSON.parse(value));
        console.log('value', value);
        console.log('User', user);
      } else {
        setUser(null);
      }
    } catch (e) {
      // error reading value
    }
  };

  const preLoadCategories = () => {
    fetchAllCategories()
      .then(result => {
        if (result.error) {
          console.error(result.error);
          return;
        }
        result.categories.map(c => {
          c.showEdit = false;
          setLoading(false);
        });

        setCategories(result.categories);
        console.log(categories);
        setLoading(false);
      })
      .catch(error => console.error(error));
  };

  const handleTrash = categoryId => {
    setLoading(true);
    deleteCategory(categoryId)
      .then(result => {
        // if (!result) {
        //   console.error(result);
        //   setLoading(false);
        //   return;
        // }
        Alert.alert('Category Deleted Successfully ');
        preLoadCategories();
        setLoading(false);
      })
      .catch(error => console.error(error));
  };

  return loading ? (
    <ActivityIndicator size="large" color="#000" animating={true} />
  ) : (
    categories.map((category, index) => {
      //setImage(category.link)
      return (
        <ScrollView style={{flex: 1}} key={category._id}>
          <React.Fragment>
            <View style={styles.ProductSection}>
              <Text style={styles.categorycontent}>{category.name}</Text>
              <Text>{'\t\t\t\t'}</Text>
              <View style={styles.Productcontent}>
                <Image
                  source={{
                    uri: `${category.link}`,
                  }}
                  style={{height: 70, width: 90}}
                />
              </View>
              <View
                style={{
                  alignContent: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginRight: 20,
                }}>
                <TouchableOpacity onPress={() => handleTrash(category._id)}>
                  <Image
                    source={require('../../../../assets/delete.png')}
                    style={{
                      height: 30,
                      width: 30,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </React.Fragment>
        </ScrollView>
      );
    })
  );
};

export default ManageCategories;

const styles = StyleSheet.create({
  ProductSection: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderBottomStartRadius: 5,
    borderBottomColor: '#8E9AAF',
    borderBottomWidth: 0.5,
  },
  categorycontent: {
    backgroundColor: '#fff',
    flex: 1,
    borderBottomColor: '#8E9AAF',
    borderBottomWidth: 0.5,
    marginLeft: 3,
    marginTop: 15,
    paddingTop: 15,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  Productcontent: {
    flex: 1,
    backgroundColor: '#fff',
    borderBottomColor: '#8E9AAF',
    borderBottomWidth: 0.5,
    borderRadius: 5,
  },
});
