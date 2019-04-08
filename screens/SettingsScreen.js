import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Preferences',
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
         <View style={styles.container}>
           <Text style={style.settingsText}>
           ?!🍣🍕🌮🍮🍻🍦!?
           whatchu want fool
           </Text>
         </View>

         <View style={styles.container}>
           <Text style={styles.settingsText}>
             Select your preferences!!!
           </Text>
          </View>
        </ScrollView>

      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.settingsText}>What are we putting in this bottom bar, anything?</Text>
      </View>
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
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  }
});
