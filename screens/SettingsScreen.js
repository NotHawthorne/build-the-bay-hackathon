import React from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
 } from 'react-native';

import Amplify, { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';
export default class SettingsScreen extends React.Component {
  constructor() {
	super();
	this.state = {isChecked: false};
	this.handleChecked = this.handleChecked.bind(this);
  }
  handleChecked() {
	this.state[arguments[0]] = !this.state[arguments[0]];
	try {
		this.setPref(arguments[0]);
    	} catch (e) {
      		console.log(e);
    	}
  }
  static navigationOptions = {
    title: '?!🍣🍕🌮🍮🍻🍦!?',
  };
  async setPref(field) {
	user = await Auth.currentAuthenticatedUser();
	const path = "/prefs/" + user.attributes.email;
	console.log("attempt");
	try {
		const apiResponse = await API.get("prefsCRUD", path);
		this.setState({apiResponse});
		let newVals = {}
		newVals.body = apiResponse[0];
		newVals.body[field] = !newVals.body[field];
		const apiRequest = await API.put("prefsCRUD", "/prefs", newVals);
		this.setState({apiRequest});
		console.log(apiRequest);
	} catch (e) {
		console.log(e);
	}
  }
  async getPref() {
    user = await Auth.currentAuthenticatedUser();
    const path = "/prefs/" + user.attributes.email;
    try {
      const apiResponse = await API.get("prefsCRUD", path);
      this.setState({apiResponse});
      console.log("Testing user tobacco: " + apiResponse[0].tobacco + " is what we got.")
      console.log("response from getting note begin: " + JSON.stringify(this.state.apiResponse));
      if (typeof apiResponse[0] == "undefined") {
        let newVals = {
          body: {
            "email": user.attributes.email.trim(),
            "userlvl": 0,
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
            "dine_in": false,
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
            "ice_cream": false,
            "desserts": false,
            "hotels": false,
            "bars": false,
            "educational": false,
            "business": false,
            "bakery": false,
            "food_truck": false,
            "delivery": false,
            "tea": false,
            "vegan": false,
            "vegetarian": false,
            "gluten_free": false,
            "keto": false,
            "natural": false,
            "beauty": false,
            "grocer": false,
            "international": false,
            "wine_and_spirits": false,
            "hawaiian": false,
            "guatemalan": false,
            "steak": false,
            "breakfast": false,
            "late_night": false,
            "always_open": false,
            "specialty": false,
            "lactose_free": false,
            "locally_sourced": false,
            "diabetic": false,
            "halal": false,
            "kosher": false,
            "arts": false,
            "venues": false,
            "concerts": false,
            "music_stores": false,
            "middle_eastern": false,
            "south_american": false,
            "hookah": false,
            "tobacco": false,
            "ramen": false,
            "sushi": false,
            "dim_sum": false,
            "deli": false,
            "german": false,
            "french": false,
            "flea_market": false,
            "farmers_market": false,
            "food_bank": false,
            "charity": false,
            "thrift_store": false,
            "pet_store": false,
          }
        }
        try {
          const pathTwo = "/prefs"
          const apiResponseTwo = await API.put("prefsCRUD", pathTwo, newVals);
          this.setState({ apiResponse: apiResponseTwo});
          console.log("response from apiResponseTwo: " + JSON.stringify(this.apiResponseTwo));
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
           <Switch title="thai" onValueChange={() => this.handleChecked("thai")}/>
           {/* <Text>Response: {JSON.stringify(this.state.apiResponse.body.thai)}</Text> */}
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
