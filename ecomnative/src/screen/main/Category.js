import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getEachCategoryDetails} from '../auth/helpers/categories';
import {getEachProduct} from '../auth/helpers/products';

const Category = ({navigation, route}) => {
  const {name, link, _id} = route.params;
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let categoryId = _id;
    getEachCategoryDetails(categoryId).then(res => {
      if (res.error) {
        console.log(res.error);
        return;
      }
      console.log(res.category);
      setCategory(res.category);
    });
    getEachProduct(categoryId)
      .then(result => {
        if (result.error) {
          setLoading(false);
          console.log(result.error);
          return;
        }
        console.log(result.products);
        setProducts(result.products);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  return loading ? (
    <ActivityIndicator size="large" color="#000" />
  ) : (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar backgroundColor="#FFA6C1" />
      <View
        style={{
          backgroundColor: '#FFC4D6',
          padding: 10,
          width: '100%',
          flexDirection: 'row',
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
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginLeft: 20,
          }}>
          {'\t'}
          {name}
        </Text>
      </View>

      <ScrollView style={{flex: 1}}>
        {products.map(product => {
          return (
            <TouchableOpacity
              key={product._id}
              onPress={() =>
                navigation.navigate('ParticularProduct', {
                  id: product._id,
                  name: product.name,
                  sizes: product.size,
                  categoryId: product.category,
                  photo: product.photo,
                  stock: product.stock,
                  price: product.price,
                  description: product.description,
                })
              }>
              <View style={styles.ProductSection} key={product._id}>
                <Image
                  source={{uri: `${product.photo}`}}
                  style={{height: 150, width: 100}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: 7,
                    padding: 5,
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 20, padding: 5, flexWrap: 'wrap'}}>
                    {product.name}
                  </Text>
                  <View style={{flexDirection: 'row', padding: 5}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                      Rs. {product.price}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        paddingLeft: 8,
                        color: '#8896AB',
                        textDecorationLine: 'line-through',
                        textDecorationStyle: 'solid',
                        textDecorationColor: '#000',
                      }}>
                      {Number(product.price) * 2 + 1}
                    </Text>
                  </View>
                  <Text
                    style={
                      product.stock === 0
                        ? {backgroundColor: 'red '}
                        : {color: '#169873', padding: 5}
                    }>
                    {product.stock === 0 ? 'OUT OF STOCK' : '50% OFF'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ProductSection: {
    marginLeft: 5,
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 0.5,
    paddingBottom: 5,
  },
});
