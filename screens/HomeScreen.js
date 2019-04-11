import React from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import Amplify, { API } from 'aws-amplify';
import awsmobile from '../aws-exports';
import { Auth } from 'aws-amplify';
import { FileSystem } from 'expo'

Amplify.configure(awsmobile);

function intializeUser() {
	user = Auth.currentAuthenticatedUser();
	const path = "/prefs";
	response = ""
	try {
		fs.readFile('../categories.txt', (err, data) => {
			if (err) throw err;
			let newVals = {
				body: {
					"email": user.attributes.email,
					"likes": "",
					"dislikes": "",
					"neutral": data
				}
			}
			try {
				const apiResponse = API.put("prefsCRUD", path, newVals);
				console.log("response from saving note: " + apiResponse);
				response = apiResponse;
			} catch (e) {
				console.log(e);
			}
		})
	} catch (e) {
		console.log(e);
	}
}

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    apiResponse: null,
    noteId: ''
  };

  handleChangeNoteId = (event) => {
    this.setState({noteId: event});
  }

  async getNote() {
    user = await Auth.currentAuthenticatedUser();
    const path = "/prefs/" + user.attributes.email;
    try {
      const apiResponse = await API.get("prefsCRUD", path);
      console.log("response from getting note: " + JSON.stringify(apiResponse));
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
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>

          {/* Testing Database Call Button */}
          <View>
            <Button title="Send Request" onPress={this.getNote.bind(this)} />
            <Text>Response: {this.state.apiResponse && JSON.stringify(this.state.apiResponse)}</Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
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
});
