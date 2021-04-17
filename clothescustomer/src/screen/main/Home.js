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
import Search from '../../components/Search';
import Product from '../../components/product';
import {fetchAllCategories} from '../auth/helpers/categories';

const Home = ({navigation}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Whenever the this screen is focused useeffect runs
    navigation.addListener('focus', () => {
      fetchAllCategories().then(result => {
        if (result.error) {
          return;
        }
        setCategories(result.categories);
        setLoading(false);
      });
    });
  }, []);

  return loading ? (
    <ActivityIndicator size="large" color="#000" />
  ) : (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar backgroundColor="#FFA6C1" />
      <View
        style={{
          backgroundColor: '#FFC4D6',
          padding: 20,
          width: '100%',
          borderBottomEndRadius: 15,
          borderBottomStartRadius: 15,
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>E-Commerce{'\t'}</Text>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={styles.ProductSection}>
          <Product navigation={navigation} categories={categories} />
          {/* <Product navigation={navigation} />
          <Product navigation={navigation} />
          <Product navigation={navigation} />
          <Product navigation={navigation} />
          <Product navigation={navigation} />
          <Product navigation={navigation} /> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ProductSection: {
    marginLeft: 5,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
