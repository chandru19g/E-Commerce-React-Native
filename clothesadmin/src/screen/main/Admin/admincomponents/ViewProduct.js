import {Picker} from 'native-base';
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
import {fetchAllCategories} from '../../../auth/helpers/categories';
import {
  deleteProduct,
  getAllProducts,
  getEachProduct,
} from '../../../auth/helpers/products';

const ViewProduct = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchAllCategories().then(result => {
      if (result.error) {
        console.error(result.error);
        return;
      }
      setCategories(result.categories);
      console.log(result.categories);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (currentCategory == 0) {
      setLoading(true);
      getAllProducts()
        .then(result => {
          if (result.error) {
            console.error(result.error);
            return;
          }
          result.products.forEach(p => (p.showEdit = false));
          setProducts(result.products);
          setLoading(false);
        })
        .catch(error => console.error(error));
      return;
    } else {
      getEachProduct(currentCategory)
        .then(result => {
          if (result.error) {
            console.error(result.error);
            return;
          }
          setProducts(result.products);
          setLoading(false);
        })
        .catch(error => console.error(error));
    }
  }, [currentCategory, setCurrentCategory]);

  const handleClickTrash = productId => {
    setLoading(true);
    deleteProduct(productId).then(result => {
      if (result.error) {
        console.error(result.error);
        return;
      }
      setLoading(false);
      Alert.alert(
        'Product Deleted Successfully',
        "Please Refresh if didn't deleted ",
      );
      setCurrentCategory(currentCategory);
    });
  };

  return loading ? (
    <ActivityIndicator size="large" color="#000" animating={true} />
  ) : (
    <ScrollView>
      <View>
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
              setCurrentCategory(e);
            }}>
            <Picker.Item value={0} label="All" />
            {categories.map(cate => (
              <Picker.Item value={cate._id} key={cate._id} label={cate.name} />
            ))}
          </Picker>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            color: '#40434E',
          }}>
          <Text style={{color: '#40434E', fontSize: 20}}>
            Fetching{' '}
            <Text style={{color: '#EF6351', fontWeight: 'bold'}}>
              {products.length}{' '}
            </Text>
            products {'\n'}
          </Text>
        </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {products.map((product, index) => {
            return (
              <React.Fragment key={product._id}>
                <View style={styles.ProductSection}>
                  <View style={styles.ProductHeader}>
                    <Text style={{color: '#FFF', padding: 5}}>
                      {product.name}
                    </Text>
                  </View>
                  <View style={styles.ImageSection}>
                    <Image
                      source={{
                        uri: `${product.photo}`,
                      }}
                      style={{height: 90, width: 90}}
                    />
                  </View>
                  <View style={styles.Footer}>
                    <Text style={styles.ProductHeader}>
                      Stock {product.stock}
                    </Text>
                  </View>
                  <View style={styles.Footer}>
                    <Text style={styles.ProductHeader}>
                      Price {product.price}
                    </Text>
                    <TouchableOpacity
                      style={{width: 35}}
                      onPress={() => handleClickTrash(product._id)}>
                      <Image
                        source={require('../../../../assets/bin.png')}
                        style={{height: 25, width: 35}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </React.Fragment>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewProduct;

const styles = StyleSheet.create({
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
  ProductSection: {
    backgroundColor: '#FB747D',
    padding: 10,
    margin: 12,
    height: 240,
    width: 150,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  ProductHeader: {
    color: '#FFF',
    padding: 4,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  Footer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  ImageSection: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
});
