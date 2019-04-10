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

  async getPref(value) {
    user = await Auth.currentAuthenticatedUser();
    const path = "/prefs/" + user.attributes.email;
    try {
      const apiResponse = await API.get("prefsCRUD", path);
      console.log("response from getting note: " + JSON.stringify(this.apiResponse));
      this.setState({apiResponse});
      if (typeof apiResponse[0] == "undefined") {
        let newVals = {
          body: {
            "email": user.attributes.email.trim(),
            "american": false,
            "mexican": false,
            "chinese": false,
            "japanese": false,
            "italian": false,
            "korean": false,
            "thai": false,
            "african": false,
            "turkish": false,
            "persian": false,
            "venezuelan": false,
            "vietnamese": false,
            "fast": false,
            "food": false,
            "dine-in": false,
            "cafe": false,
            "coffee": false,
            "donuts": false,
            "burgers": false,
            "pizza": false,
            "wings": false,
            "sandwiches": false,
            "chicken": false,
            "markets": false,
            "locksmith": false,
            "photography": false,
            "ice cream": false,
            "desserts": false,
            "hotels": false,
            "bars": false,
            "educational": false,
            "business": false,
            "bakery": false,
            "food truck": false,
            "delivery": false,
            "tea": false,
            "vegan": false,
            "vegetarian": false,
            "gluten-free": false,
            "keto": false,
            "natural": false,
            "beauty": false,
            "grocer": false,
            "international": false,
            "wine and spirits": false,
            "hawaiian": false,
            "guatemalan": false,
            "steak": false,
            "breakfast": false,
            "late-night": false,
            "always-open": false,
            "specialty": false,
            "lactose-free": false,
            "locally sourced": false,
            "diabetic": false,
            "halal": false,
            "kosher": false,
            "arts": false,
            "venues": false,
            "concerts": false,
            "music stores": false,
            "middle eastern": false,
            "south american": false,
            "hookah": false,
            "tobacco": false,
            "ramen": false,
            "sushi": false,
            "dim sum": false,
            "deli": false,
            "german": false,
            "french": false,
            "flea market": false,
            "farmers market": false,
            "food bank": false,
            "charity": false,
            "thrift store": false,
            "pet store": false,
          }
        }
        try {
          const pathTwo = "/prefs"
          const apiResponseTwo = await API.put("prefsCRUD", pathTwo, newVals);
          this.setState({apiResponseTwo});
        }
        catch (e) {
          console.log(e);
        }
        console.log("initialized user " + user.attributes.email);
      }
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
         <View style={styles.container}>
           <Text style={styles.settingsText}>
            [Insert Preference switches here]
           </Text>
           <Switch title="thai" onValueChange = {this.state.apiResponse.body.thai = !this.state.apiResponse.body.thai} value = {this.state.apiResponse.body.thai}/>
           <Text>Response: {this.state.apiResponse.body.thai && JSON.stringify(this.state.apiResponse.body.thai)}</Text>
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
