import React from 'react';
import {View, StyleSheet, Image, TextInput} from 'react-native';

const Search = () => {
  return (
    <View style={styles.searchSection}>
      <Image
        source={require('../assets/search.png')}
        style={styles.searchIcon}
      />
      <TextInput
        placeholderTextColor="#000"
        style={styles.input}
        placeholder="Search"
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchSection: {
    flexDirection: 'row',
    width: 200,
    height: 30,
    backgroundColor: '#FDFFFC',
    borderRadius: 5,
    marginTop: 15,
  },
  searchIcon: {
    height: 25,
    width: 25,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    fontWeight: 'bold',
    padding: 2,
    width: 150,
  },
});
