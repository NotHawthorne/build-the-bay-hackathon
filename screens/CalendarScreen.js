import React from 'react';
import {
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
        {/* Calendar layout */}
        <Text>Calendar will end up here one day... but for now as a test... if we make long strings... what happens?</Text>
        <View style={{ flex: 1, flexDirection: "row", alignSelf: "stretch" }}>
	        <View style={{ flex: 1, alignSelf: 'stretch' }} />
	        <View style={{ flex: 1, alignSelf: 'stretch' }} />
	        <View style={{ flex: 1, alignSelf: 'stretch' }} />
        </View>
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
