import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
	    <Image source={require('assets/images/calendar.png')}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  tableHeader: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "stretch",
  },
  tableTop: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
});
