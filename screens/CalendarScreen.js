import React from 'react';
import {
  
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Calendar layout */}
        <Text>Calendar will end up here one day... but for now as a test... if we make long strings... what happens?</Text>
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
});
