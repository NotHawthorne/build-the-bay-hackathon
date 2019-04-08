import React from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
 } from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: '?!🍣🍕🌮🍮🍻🍦!?',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
         <View style={styles.container}>
           <Text style={styles.settingsText}>
            [Insert Preference switches here]
           </Text>
           <Switch onValueChange = {console.log(this.state)}/>
         </View>
        </ScrollView>
    </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  settingsText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
});
