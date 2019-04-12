import React from 'react';
import {
  Alert,
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import Amplify, { API } from 'aws-amplify';
import awsmobile from '../aws-exports';
import { Auth } from 'aws-amplify';
import { FileSystem } from 'expo'

Amplify.configure(awsmobile);

var AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: 'AKIA4ZYADIUIPAMVVV56',
    secretAccessKey: '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',
    region: 'us-east-1'
});

var docClient = new AWS.DynamoDB.DocumentClient({
        dynamoDbCrc32: false
});
const viewObj = ({ name }) => {
        return (
        <TouchableHighlight underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>{name}</Text>
          </View>
        </TouchableHighlight>
        );
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    apiResponse: null,
    noteId: '',
    arr: []
  };
    _onPressButton(){
	Alert.alert ('Ya did the thing!')
    }
    _onLongPressButton(){
	Alert.alert('button?', 'how do you like this button?',
		    [
			{text: 'Neautral', onPress: () => console.log('meh')},
			{
			    text: 'Dislike', onPress: () => console.log('no'),
			    style: 'cancel'
			},
			{text: 'Like', onPress: () => console.log('Oakeye')}
		    ])
    }
  handleChangeNoteId = (event) => {
    this.setState({noteId: event});
  }
  getBusinesses = async () => {
        const params = {
                TableName: "app-mobilehub-1215033787-test",
        };
        let scanResults = [
                {}
        ];
        let items;
        do {
                items = await docClient.scan(params).promise();
                items.Items.forEach((item) => scanResults.push(item));
                params.ExclusiveStartKey = items.LastEvaluatedKey;
        } while (typeof items.LastEvaluatedKey != "undefined");
	scanResults.shift();
	this.setState({arr: scanResults});
  }
  async getNote() {
    await this.getBusinesses();
    user = await Auth.currentAuthenticatedUser();
    const path = "/prefs/" + user.attributes.email;
    try {
      const apiResponse = await API.get("prefsCRUD", path);
      this.setState({apiResponse});
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
	console.log(newVals);
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
    if (typeof this.state.arr[0] == "undefined") {
	this.getNote();
    }
      let todoItems = this.state.arr.map(({a, name, desc, date}) => {
      return (
	<TouchableHighlight underlayColor="white" key={a}>
          <View style={styles.button} key={a}>
              <Text style={styles.buttonText} key={a}>
	      {a}{"\n"}
	  {name}{"\n"}
	  {desc}{"\n"}
	  {date}
	  </Text>
          </View>
        </TouchableHighlight>
	);
    });
    return (
	    <View style={styles.container}>
	    <TouchableHighlight onPress={this._onPressButton} onLongPress={this._onLongPressButton} underlayColor="red">
	    <View style={styles.buttonT}>
	    <Text style={styles.buttonText}>Deal of the Day</Text>
	    </View>
	            </TouchableHighlight> 
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
	  <View>
		{todoItems}
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
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
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
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  button: {
    marginBottom: 5,
    height: 200,
    alignItems: 'center',
    backgroundColor: 'skyblue'
  },
   buttonT: {
    marginBottom: 5,
    height: 70,
    alignItems: 'center',
    backgroundColor: 'blue'
  },

  buttonText: {
    fontSize: 20,
    padding: 40,
    color: '#202020'
  }
});
