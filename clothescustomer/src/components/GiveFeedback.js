import React from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

const {width} = Dimensions.get('screen');

const GiveFeedback = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#FFC4D6',
          padding: 10,
          width: '100%',
          borderBottomEndRadius: 15,
          borderBottomStartRadius: 15,
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold', textAlign: 'center'}}>
          Give Feedback
        </Text>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={styles.action}>
            <TextInput
              placeholderTextColor="grey"
              style={styles.heading}
              placeholder="Give Feedback"
              multiline={true}
            />
          </View>
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              Alert.alert('Success', 'Feedback Submitted Successfully')
            }>
            <Text style={styles.buttonText}>Submit Feedback</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttoncancel}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonTextcancel}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default GiveFeedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  action: {
    width: width,
    alignItems: 'center',
  },
  heading: {
    width: '93%',
    height: 100,
    elevation: 3,
    borderRadius: 6,
    backgroundColor: 'white',
    borderWidth: 2,
    color: '#12263A',
    padding: 10,
    borderColor: '#F4EDEA',
    fontSize: 15,
    marginTop: 15,
  },
  buttonSection: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#FFB700',
    width: '90%',
    padding: 5,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttoncancel: {
    backgroundColor: '#fff',
    width: '40%',
    padding: 5,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: '#000',
    fontSize: 17,
    fontWeight: 'bold',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  buttonTextcancel: {
    color: '#0C717E',
    fontSize: 17,
    fontWeight: 'bold',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});
