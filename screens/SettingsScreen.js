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
	if (!this.state[arguments[0]]) {
	    this.state[arguments[0]] = false;
	}
	this.state[arguments[0]] = !this.state[arguments[0]];
	try {
		this.setPref(arguments[0]);
    	} catch (e) {
      		console.log(e);
    	}
  }
  static navigationOptions = {
    title: 'Preferences',
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
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>African</Text>
            <Switch title="african" onValueChange={() => this.handleChecked("african")} value={this.state.african}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Always Open</Text>
	    <Switch title="always_open" onValueChange={() => this.handleChecked("always_open")} value={this.state.always_open}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>American</Text>
	    <Switch title="american" onValueChange={() => this.handleChecked("american")} value={this.state.american}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Arts</Text>
	    <Switch title="arts" onValueChange={() => this.handleChecked("arts")} value={this.state.arts}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Bakery</Text>
	    <Switch title="bakery" onValueChange={() => this.handleChecked("bakery")} value={this.state.bakery}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Bars</Text>
	    <Switch title="bars" onValueChange={() => this.handleChecked("bars")} value={this.state.bars}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Beauty</Text>
	    <Switch title="beauty" onValueChange={() => this.handleChecked("beauty")} value={this.state.beauty}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Breakfast</Text>
	    <Switch title="breakfast" onValueChange={() => this.handleChecked("breakfast")} value={this.state.breakfast}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Burgers</Text>
	    <Switch title="burgers" onValueChange={() => this.handleChecked("burgers")} value={this.state.burgers}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Non-Food Businesses</Text>
	    <Switch title="business" onValueChange={() => this.handleChecked("business")} value={this.state.business}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Cafes</Text>
	    <Switch title="cafe" onValueChange={() => this.handleChecked("cafe")} value={this.state.cafe}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Charities</Text>
	    <Switch title="charity" onValueChange={() => this.handleChecked("charity")} value={this.state.charity}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Chicken</Text>
	    <Switch title="chicken" onValueChange={() => this.handleChecked("chicken")} value={this.state.chicken}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Chinese</Text>
	    <Switch title="chinese" onValueChange={() => this.handleChecked("chinese")} value={this.state.chinese}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Coffee</Text>
	    <Switch title="coffee" onValueChange={() => this.handleChecked("coffee")} value={this.state.coffee}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Concerts</Text>
	    <Switch title="concerts" onValueChange={() => this.handleChecked("concerts")} value={this.state.concerts}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Deli</Text>
	    <Switch title="deli" onValueChange={() => this.handleChecked("deli")} value={this.state.deli}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Delivery</Text>
	    <Switch title="delivery" onValueChange={() => this.handleChecked("delivery")} value={this.state.delivery}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Desserts</Text>
	    <Switch title="desserts" onValueChange={() => this.handleChecked("desserts")} value={this.state.desserts}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Diabetic Options</Text>
	    <Switch title="diabetic" onValueChange={() => this.handleChecked("diabetic")} value={this.state.diabetic}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Dim Sum</Text>
            <Switch title="dim_sum" onValueChange={() => this.handleChecked("dim_sum")} value={this.state.dim_sum}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Dine In</Text>
	    <Switch title="dine_in" onValueChange={() => this.handleChecked("dine_in")} value={this.state.dine_in}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Donuts</Text>
	    <Switch title="donuts" onValueChange={() => this.handleChecked("donuts")} value={this.state.donuts}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Education</Text>
	    <Switch title="educational" onValueChange={() => this.handleChecked("educational")} value={this.state.educational}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Farmers Markets</Text>
	    <Switch title="farmers_market" onValueChange={() => this.handleChecked("farmers_market")} value={this.state.farmers_market}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Fast Food</Text>
	    <Switch title="fast_food" onValueChange={() => this.handleChecked("fast_food")} value={this.state.fast_food}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Flea Markets</Text>
	    <Switch title="flea_market" onValueChange={() => this.handleChecked("flea_market")} value={this.state.flea_market}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Food Bank</Text>
	    <Switch title="food_bank" onValueChange={() => this.handleChecked("food_bank")} value={this.state.food_bank}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Food Trucks</Text>
	    <Switch title="food_truck" onValueChange={() => this.handleChecked("food_truck")} value={this.state.food_truck}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>French</Text>
	    <Switch title="french" onValueChange={() => this.handleChecked("french")} value={this.state.french}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>German</Text>
	    <Switch title="german" onValueChange={() => this.handleChecked("german")} value={this.state.german}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Gluten Free Options</Text>
	    <Switch title="gluten_free" onValueChange={() => this.handleChecked("gluten_free")} value={this.state.gluten_free}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Grocery Stores</Text>
	    <Switch title="grocer" onValueChange={() => this.handleChecked("grocer")} value={this.state.grocer}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Guatemalan</Text>
	    <Switch title="guatemalan" onValueChange={() => this.handleChecked("guatemalan")} value={this.state.guatemalan}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Halal Options</Text>
	    <Switch title="halal" onValueChange={() => this.handleChecked("halal")} value={this.state.halal}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Hawaiian</Text>
	    <Switch title="hawaiian" onValueChange={() => this.handleChecked("hawaiian")} value={this.state.hawaiian}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Hookah</Text>
	    <Switch title="hookah" onValueChange={() => this.handleChecked("hookah")} value={this.state.hookah}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Hotels and Lodgings</Text>
	    <Switch title="hotels" onValueChange={() => this.handleChecked("hotels")} value={this.state.hotels}/>
    	  </View>
	  <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Ice Cream</Text>
	    <Switch title="ice_cream" onValueChange={() => this.handleChecked("ice_cream")} value={this.state.ice_cream}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>International Cuisine</Text>
	    <Switch title="international" onValueChange={() => this.handleChecked("international")} value={this.state.international}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Italian</Text>
            <Switch title="italian" onValueChange={() => this.handleChecked("italian")} value={this.state.italian}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Japanese</Text>
	    <Switch title="japanese" onValueChange={() => this.handleChecked("japanese")} value={this.state.japanese}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Keto Options</Text>
	    <Switch title="keto" onValueChange={() => this.handleChecked("keto")} value={this.state.keto}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Korean</Text>
	    <Switch title="korean" onValueChange={() => this.handleChecked("korean")} value={this.state.korean}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Kosher Options</Text>
	    <Switch title="kosher" onValueChange={() => this.handleChecked("kosher")} value={this.state.kosher}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Lactose Free Options</Text>
	    <Switch title="lactose_free" onValueChange={() => this.handleChecked("lactose_free")} value={this.state.lactose_free}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Late Night</Text>
	    <Switch title="late_night" onValueChange={() => this.handleChecked("late_night")} value={this.state.late_night}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Locally Sourced</Text>
	    <Switch title="locally_sourced" onValueChange={() => this.handleChecked("locally_sourced")} value={this.state.locally_sourced}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Locksmith</Text>
	    <Switch title="locksmith" onValueChange={() => this.handleChecked("locksmith")} value={this.state.locksmith}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Markets</Text>
	    <Switch title="markets" onValueChange={() => this.handleChecked("markets")} value={this.state.markets}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Mexican</Text>
	    <Switch title="mexican" onValueChange={() => this.handleChecked("mexican")} value={this.state.mexican}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Middle Eastern</Text>
	    <Switch title="middle_eastern" onValueChange={() => this.handleChecked("middle_eastern")} value={this.state.middle_eastern}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Music Stores</Text>
	    <Switch title="music_stores" onValueChange={() => this.handleChecked("music_stores")} value={this.state.music_stores}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Nautral</Text>
	    <Switch title="natural" onValueChange={() => this.handleChecked("natural")} value={this.state.natural}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Persian</Text>
	    <Switch title="persian" onValueChange={() => this.handleChecked("persian")} value={this.state.persian}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Pet Store</Text>
	    <Switch title="pet_store" onValueChange={() => this.handleChecked("pet_store")} value={this.state.pet_store}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Photography</Text>
	    <Switch title="photography" onValueChange={() => this.handleChecked("photography")} value={this.state.photography}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Pizza</Text>
	    <Switch title="pizza" onValueChange={() => this.handleChecked("pizza")} value={this.state.pizza}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Ramen</Text>
	    <Switch title="ramen" onValueChange={() => this.handleChecked("ramen")} value={this.state.ramen}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Sandwiches</Text>
	    <Switch title="sandwiches" onValueChange={() => this.handleChecked("sandwiches")} value={this.state.sandwiches}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>South American</Text>
	    <Switch title="south_american" onValueChange={() => this.handleChecked("south_american")} value={this.state.south_american}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Specialty</Text>
	    <Switch title="specialty" onValueChange={() => this.handleChecked("specialty")} value={this.state.specialty}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Steak</Text>
	    <Switch title="steak" onValueChange={() => this.handleChecked("steak")} value={this.state.steak}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Sushi</Text>
	    <Switch title="sushi" onValueChange={() => this.handleChecked("sushi")} value={this.state.sushi}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Tea</Text>
	    <Switch title="tea" onValueChange={() => this.handleChecked("tea")} value={this.state.tea}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Thai</Text>
	    <Switch title="thai" onValueChange={() => this.handleChecked("thai")} value={this.state.thai}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Thrift Store</Text>
	    <Switch title="thrift_store" onValueChange={() => this.handleChecked("thrift_store")} value={this.state.thrift_store}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Tobacco</Text>
	    <Switch title="tobacco" onValueChange={() => this.handleChecked("tobacco")} value={this.state.tobacco}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Turkish</Text>
	    <Switch title="turkish" onValueChange={() => this.handleChecked("turkish")} value={this.state.turkish}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Vegan Options</Text>
	    <Switch title="vegan" onValueChange={() => this.handleChecked("vegan")} value={this.state.vegan}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Vegetarian Options</Text>
	    <Switch title="vegetarian" onValueChange={() => this.handleChecked("vegetarian")} value={this.state.vegetarian}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Venezuelan</Text>
	    <Switch title="venezuelan" onValueChange={() => this.handleChecked("venezuelan")} value={this.state.venezuelan}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Venues</Text>
	    <Switch title="venues" onValueChange={() => this.handleChecked("venues")} value={this.state.venues}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Vietnamese</Text>
	    <Switch title="vietnamese" onValueChange={() => this.handleChecked("vietnamese")} value={this.state.vietnamese}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Wine and Spirits</Text>
	    <Switch title="wine_and_spirits" onValueChange={() => this.handleChecked("wine_and_spirits")} value={this.state.wine_and_spirits}/>
    	    </View>
	    <View style={{flex: 1, flexDirection: 'row' }}>
	    <Text>Wings</Text>
	    <Switch title="wings" onValueChange={() => this.handleChecked("wings")} value={this.state.wings}/>
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
