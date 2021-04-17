import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Image, View, Text} from 'react-native';

const Product = ({navigation, categories}) => {
  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {categories.map(category => {
        return (
          <TouchableOpacity
            key={category._id}
            onPress={() =>
              navigation.navigate('Category', {
                name: category.name,
                link: category.link,
                _id: category._id,
              })
            }>
            <Text style={styles.categorycontent}>{category.name}</Text>
            <View style={styles.Productcontent}>
              <Image
                source={{uri: `${category.link}`}}
                resizeMode="contain"
                style={{height: 150, width: 150}}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  categorycontent: {
    backgroundColor: '#FB747D',
    flex: 1,
    marginLeft: 15,
    marginTop: 15,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    padding: 5,
    fontSize: 20,
    textAlign: 'center',
    color: '#FFF',
  },
  Productcontent: {
    flex: 1,
    borderBottomColor: '#8E9AAF',
    borderBottomWidth: 0.5,
    marginLeft: 15,
    backgroundColor: '#fff',
  },
});
