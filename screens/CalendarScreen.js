import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
//import { ExpoCalendarView } from '@expo/samples';

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Calendar layout */}
        <Text>Calendar will end up here one day...</Text>
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
