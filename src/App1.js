// // // In App.js in a new project

// import * as React from 'react';
// import { View, Text,TouchableOpacity ,ScrollView,Button,Alert,ActivityIndicator} from 'react-native';
// import LoginScreen from "./screens/LoginScreen"

// import SyncStorage from 'sync-storage';
 
// console.log("my store:",store.getState())
 

// console.log(SyncStorage.getAllKeys())


// class App extends React.Component {
    
//   constructor() {
//     super();
// }
//   state={
//     token:null
//   }
//   _config=()=>{
    
//   }
//   componentDidMount() {
//     // _config();
//     RNLocation.requestPermission({
//       ios: "whenInUse",
//       android: {
//         detail: "fine",
//         rationale: {
//           title: "Location permission",
//           message: "We use your location to demo the library",
//           buttonPositive: "OK",
//           buttonNegative: "Cancel"
//         }
//       }
//     }).then(granted => {
//       if (granted) {
//         console.log("iiii")
//         this._startUpdatingLocation();
//       }
//     });
//     // this._startUpdatingLocation()
// }
// // RNLocation.configure({
// //   distanceFilter: 1, // Meters
// //   desiredAccuracy: {
// //     ios: "best",
// //     android: "highAccuracy"
// //   },
// //   // Android only
// //   androidProvider: "auto",
// //   interval: 50, // Milliseconds
// //   fastestInterval: 10, // Milliseconds
// //   maxWaitTime: 50, // Milliseconds
// //   // iOS Only
// //   activityType: "other",
// //   allowsBackgroundLocationUpdates: false,
// //   headingFilter: 1, // Degrees
// //   headingOrientation: "portrait",
// //   pausesLocationUpdatesAutomatically: false,
// //   showsBackgroundLocationIndicator: false,
// // })
//   UNSAFE_componentWillMount() {
    
    
    
   

//   }
  
//   _startUpdatingLocation = () => {
//     console.log("i am runing ")
//     this.locationSubscription = RNLocation.subscribeToLocationUpdates(
//       locations => {
//         console.log(locations)
//         // this.setState({ location: locations[0] });
//       }
//     );
//   };

//   _stopUpdatingLocation = () => {
//     this.locationSubscription && this.locationSubscription();
//     // this.setState({ location: null });
//   };

  

//  render(){
//   this._startUpdatingLocation();
//   const  Stack=createStackNavigator();
//   return (
//  <Provider store={store}  >
//    <NavigationContainer>
//    <Auth/>
//   </NavigationContainer>
//  </Provider>
//   );
//  }
// }
// const mapStateToProps=state=>({
//   sign:state.userSignIn
 
//  });
  

// export default App;

// import React, { Component } from 'react';
// import {
//   Alert,
//   Button,
//   Linking,
//   PermissionsAndroid,
//   Platform,
//   StyleSheet,
//   Switch,
//   Text,
//   ToastAndroid,
//   View,
// } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// import VIForegroundService from '@voximplant/react-native-foreground-service';
// import appConfig from '../app.json';

// export default class App extends Component<{}> {
//   watchId = null;

//   state = {
//     forceLocation: true,
//     highAccuracy: true,
//     loading: false,
//     showLocationDialog: true,
//     significantChanges: true,
//     updatesEnabled: false,
//     foregroundService: true,
//     location: {},
//   };

//   componentWillUnmount() {
//     this.removeLocationUpdates();
//   }

//   hasLocationPermissionIOS = async () => {
//     const openSetting = () => {
//       Linking.openSettings().catch(() => {
//         Alert.alert('Unable to open settings');
//       });
//     };
//     const status = await Geolocation.requestAuthorization('whenInUse');

//     if (status === 'granted') {
//       return true;
//     }

//     if (status === 'denied') {
//       Alert.alert('Location permission denied');
//     }

//     if (status === 'disabled') {
//       Alert.alert(
//         `Turn on Location Services to allow  to determine your location.`,
//         '',
//         [
//           { text: 'Go to Settings', onPress: openSetting },
//           { text: "Don't Use Location", onPress: () => {} },
//         ],
//       );
//     }

//     return false;
//   };

//   hasLocationPermission = async () => {
//     if (Platform.OS === 'ios') {
//       const hasPermission = await this.hasLocationPermissionIOS();
//       return hasPermission;
//     }

//     if (Platform.OS === 'android' && Platform.Version < 23) {
//       return true;
//     }

//     const hasPermission = await PermissionsAndroid.check(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     );

//     if (hasPermission) {
//       return true;
//     }

//     const status = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     );

//     if (status === PermissionsAndroid.RESULTS.GRANTED) {
//       return true;
//     }

//     if (status === PermissionsAndroid.RESULTS.DENIED) {
//       ToastAndroid.show(
//         'Location permission denied by user.',
//         ToastAndroid.LONG,
//       );
//     } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
//       ToastAndroid.show(
//         'Location permission revoked by user.',
//         ToastAndroid.LONG,
//       );
//     }

//     return false;
//   };

//   getLocation = async () => {
//     const hasLocationPermission = await this.hasLocationPermission();

//     if (!hasLocationPermission) {
//       return;
//     }

//     this.setState({ loading: true }, () => {
//       Geolocation.getCurrentPosition(
//         (position) => {
//           this.setState({ location: position, loading: false });
//           console.log(position);
//         },
//         (error) => {
//           this.setState({ location: error, loading: false });
//           console.log(error);
//         },
//         {
//           enableHighAccuracy: this.state.highAccuracy,
//           timeout: 15000,
//           fastestInterval:1000,
//           maximumAge: 10000,
//           distanceFilter: 0,
//           forceRequestLocation: this.state.forceLocation,
//           showLocationDialog: this.state.showLocationDialog,
//         },
//       );
//     });
//   };

//   getLocationUpdates = async () => {
//     const hasLocationPermission = await this.hasLocationPermission();

//     if (!hasLocationPermission) {
//       return;
//     }

//     if (Platform.OS === 'android' && this.state.foregroundService) {
//       await this.startForegroundService();
//     }

//     this.setState({ updatesEnabled: true }, () => {
//       this.watchId = Geolocation.watchPosition(
//         (position) => {
//           this.setState({ location: position });
//           Alert.alert("update",position.coords.latitude.toString())
//           console.log(position);
//         },
//         (error) => {
//           this.setState({ location: error });
//           console.log(error);
//         },
//         {
//           enableHighAccuracy: this.state.highAccuracy,
//           distanceFilter: 0,
//           interval: 50,
//           fastestInterval: 20,
//           forceRequestLocation: this.state.forceLocation,
//           showLocationDialog: this.state.showLocationDialog,
//           useSignificantChanges: this.state.significantChanges,
//         },
//       );
//     });
//   };

//   removeLocationUpdates = () => {
//     if (this.watchId !== null) {
//       this.stopForegroundService();
//       Geolocation.clearWatch(this.watchId);
//       this.watchId = null;
//       this.setState({ updatesEnabled: false });
//     }
//   };

//   startForegroundService = async () => {
//     if (Platform.Version >= 26) {
//       await VIForegroundService.createNotificationChannel({
//         id: 'locationChannel',
//         name: 'Location Tracking Channel',
//         description: 'Tracks location of user',
//         enableVibration: false,
//       });
//     }

//     return VIForegroundService.startService({
//       channelId: 'locationChannel',
//       id: 420,
//       title: appConfig.displayName,
//       text: 'Tracking location updates',
//       icon: 'ic_launcher',
//     });
//   };

//   stopForegroundService = () => {
//     if (this.state.foregroundService) {
//       VIForegroundService.stopService().catch((err) => err);
//     }
//   };

//   setAccuracy = (value) => this.setState({ highAccuracy: value });
//   setSignificantChange = (value) =>
//     this.setState({ significantChanges: value });
//   setLocationDialog = (value) => this.setState({ showLocationDialog: value });
//   setForceLocation = (value) => this.setState({ forceLocation: value });
//   setForegroundService = (value) => this.setState({ foregroundService: value });

//   render() {
//     const {
//       forceLocation,
//       highAccuracy,
//       loading,
//       location,
//       showLocationDialog,
//       significantChanges,
//       updatesEnabled,
//       foregroundService,
//     } = this.state;

//     return (
//       <View style={styles.container}>
//         <View style={styles.optionContainer}>
//           <View style={styles.option}>
//             <Text>Enable High Accuracy</Text>
//             <Switch onValueChange={this.setAccuracy} value={highAccuracy} />
//           </View>

//           {Platform.OS === 'ios' && (
//             <View style={styles.option}>
//               <Text>Use Significant Changes</Text>
//               <Switch
//                 onValueChange={this.setSignificantChange}
//                 value={significantChanges}
//               />
//             </View>
//           )}

//           {Platform.OS === 'android' && (
//             <>
//               <View style={styles.option}>
//                 <Text>Show Location Dialog</Text>
//                 <Switch
//                   onValueChange={this.setLocationDialog}
//                   value={showLocationDialog}
//                 />
//               </View>
//               <View style={styles.option}>
//                 <Text>Force Location Request</Text>
//                 <Switch
//                   onValueChange={this.setForceLocation}
//                   value={forceLocation}
//                 />
//               </View>
//               <View style={styles.option}>
//                 <Text>Enable Foreground Service</Text>
//                 <Switch
//                   onValueChange={this.setForegroundService}
//                   value={foregroundService}
//                 />
//               </View>
//             </>
//           )}
//         </View>
//         <View style={styles.buttonContainer}>
//           <Button
//             title="Get Location"
//             onPress={this.getLocation}
//             disabled={loading || updatesEnabled}
//           />
//           <View style={styles.buttons}>
//             <Button
//               title="Start Observing"
//               onPress={this.getLocationUpdates}
//               disabled={updatesEnabled}
//             />
//             <Button
//               title="Stop Observing"
//               onPress={this.removeLocationUpdates}
//               disabled={!updatesEnabled}
//             />
//           </View>

//           <View style={styles.result}>
//             <Text>{JSON.stringify(location, null, 4)}</Text>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#F5FCFF',
//     paddingHorizontal: 12,
//   },
//   optionContainer: {
//     paddingBottom: 24,
//   },
//   option: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingBottom: 12,
//   },
//   result: {
//     borderWidth: 1,
//     borderColor: '#666',
//     width: '100%',
//     paddingHorizontal: 16,
//   },
//   buttonContainer: {
//     alignItems: 'center',
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     marginVertical: 12,
//     width: '100%',
//   },
// });

// import React from "react";
// import {
//   Alert,
//   Linking,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   View
  
// } from "react-native";
// import NetInfo from "@react-native-community/netinfo";
// // import Toast from 'react-native-simple-toast';
// import Toast from 'react-native-toast-message'

// import RNLocation,{ subscribeToLocationUpdates} from "react-native-location";
// import moment from "moment";

// const repoUrl = "https://github.com/timfpark/react-native-location";
// import DeviceInfo from 'react-native-device-info';

// // or ES6+ destructured imports

// import { getUniqueId, getManufacturer } from 'react-native-device-info';
// export default class App extends React.PureComponent {
//   constructor() {
//     super();
//     this.state = {
//       location: null
//     };
//   }
//   componentDidMount(){
//     RNLocation.getLatestLocation({ timeout: 60000 })
//   .then(latestLocation => {
//    console.log("latest ",latestLocation)
//   })
//     DeviceInfo.getBatteryLevel().then(batteryLevel => {
//       // 0.759999
//       console.log("battry level ",batteryLevel )
//     });
 
//     NetInfo.fetch().then(state => {
     
//       console.log("Connection type", state.type);
//       console.log("Is connected?", state.isConnected);
//     })
//   }
// // componentWillUnmount(){
// //   RNLocation.subscribeToLocationUpdates(locations => {
// //     // /* Example location returned
// //     {
// //      console.log(locations)

// //     }
    
// //   })
 
// // }
//   UNSAFE_componentWillMount() {
 
//     RNLocation.configure({
//       distanceFilter: 0, // Meters
//       desiredAccuracy: {
//         ios: "best",
//         android: "highAccuracy"
//       },
//       // Android only
//       androidProvider: "auto",
//       interval: 500, // Milliseconds
//       fastestInterval: 100, // Milliseconds
//       maxWaitTime: 500, // Milliseconds
//       // iOS Only
//       activityType: "other",
//       allowsBackgroundLocationUpdates: false,
//       headingFilter: 1, // Degrees
//       headingOrientation: "portrait",
//       pausesLocationUpdatesAutomatically: false,
//       showsBackgroundLocationIndicator: false,
//   })
    
//     RNLocation.requestPermission({
//       ios: "whenInUse",
//       android: {
//         detail: "fine",
//         rationale: {
//           title: "Location permission",
//           message: "We use your location to demo the library",
//           buttonPositive: "OK",
//           buttonNegative: "Cancel"
//         }
//       }
//     }).then(granted => {
//       if (granted) {
//         this._startUpdatingLocation();
//       }
//     });
//   }

//   _startUpdatingLocation = () => {
//    RNLocation.subscribeToLocationUpdates(
//       locations => {
        
        
//         this.setState({ location: locations[0] });
//       }
//     );
//   };

//   _stopUpdatingLocation = () => {
//     this.locationSubscription && this.locationSubscription();
//     this.setState({ location: null });
//   };
//  _getCurrentLocation=()=> {
//    console.log("click")
//    RNLocation.subscribeToLocationUpdates(locations => {
//     {   Alert.alert("location")
//     // /* Example location returned
    
//      console.log("U@@@@@@@@@: ",locations)

//     }
    
//   })

//   RNLocation.requestPermission({
//   ios: "whenInUse",
//   android: {
//     detail: "fine"
//   }
// }).then(granted => {
//     if (granted) {
//  RNLocation.subscribeToLocationUpdates(locations => {
//         // /* Example location returned
//         {
//          console.log(locations)
//         }
        
//       })
//     }
//   })

// }

//   _openRepoUrl = () => {
//     Linking.openURL(repoUrl).catch(err =>
//       console.error("An error occurred", err)
//     );
//   };

//   render() {
     

//     const { location } = this.state;
//     return (
   
//       <ScrollView style={styles.container}>
           
//         <SafeAreaView style={styles.innerContainer}>
//           <View style={{ alignItems: "center", marginTop: 30 }}>
//             <Text style={styles.title}>react-native-location</Text>
//             <TouchableHighlight
//               onPress={this._openRepoUrl}
//               underlayColor="#CCC"
//               activeOpacity={0.8}
//             >
//               <Text style={styles.repoLink}>{repoUrl}</Text>
//             </TouchableHighlight>
//           </View>

//           <View style={styles.row}>
//             <TouchableHighlight
//               onPress={this._startUpdatingLocation}
//               style={[styles.button, { backgroundColor: "#126312" }]}
//             >
//               <Text style={styles.buttonText}>Start</Text>
//             </TouchableHighlight>
//             <TouchableHighlight
//               onPress={this._getCurrentLocation}
//               style={[styles.button, { backgroundColor: "#1769aa" }]}
//             >
//               <Text style={styles.buttonText}>Stop</Text>
//             </TouchableHighlight>
//             <TouchableHighlight
//               onPress={this._stopUpdatingLocation}
//               style={[styles.button, { backgroundColor: "#881717" }]}
//             >
//               <Text style={styles.buttonText}>Stop</Text>
//             </TouchableHighlight>
//           </View>

//           {location && (
//             <React.Fragment>
//               <View style={styles.row}>
//                 <View style={[styles.detailBox, styles.third]}>
//                   <Text style={styles.valueTitle}>Course</Text>
//                   <Text style={[styles.detail, styles.largeDetail]}>
//                     {location.course}
//                   </Text>
//                 </View>

//                 <View style={[styles.detailBox, styles.third]}>
//                   <Text style={styles.valueTitle}>Speed</Text>
//                   <Text style={[styles.detail, styles.largeDetail]}>
//                     {location.speed}
//                   </Text>
//                 </View>

//                 <View style={[styles.detailBox, styles.third]}>
//                   <Text style={styles.valueTitle}>Altitude</Text>
//                   <Text style={[styles.detail, styles.largeDetail]}>
//                     {location.altitude}
//                   </Text>
//                 </View>
//               </View>

//               <View style={{ alignItems: "flex-start" }}>
//                 <View style={styles.row}>
//                   <View style={[styles.detailBox, styles.half]}>
//                     <Text style={styles.valueTitle}>Latitude</Text>
//                     <Text style={styles.detail}>{location.latitude}</Text>
//                   </View>

//                   <View style={[styles.detailBox, styles.half]}>
//                     <Text style={styles.valueTitle}>Longitude</Text>
//                     <Text style={styles.detail}>{location.longitude}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.row}>
//                   <View style={[styles.detailBox, styles.half]}>
//                     <Text style={styles.valueTitle}>Accuracy</Text>
//                     <Text style={styles.detail}>{location.accuracy}</Text>
//                   </View>

//                   <View style={[styles.detailBox, styles.half]}>
//                     <Text style={styles.valueTitle}>Altitude Accuracy</Text>
//                     <Text style={styles.detail}>
//                       {location.altitudeAccuracy}
//                     </Text>
//                   </View>
//                 </View>

//                 <View style={styles.row}>
//                   <View style={[styles.detailBox, styles.half]}>
//                     <Text style={styles.valueTitle}>Timestamp</Text>
//                     <Text style={styles.detail}>{location.timestamp}</Text>
//                   </View>

//                   <View style={[styles.detailBox, styles.half]}>
//                     <Text style={styles.valueTitle}>Date / Time</Text>
//                     <Text style={styles.detail}>
//                       {moment(location.timestamp).format("MM-DD-YYYY h:mm:ss")}
//                     </Text>
//                   </View>
//                 </View>

//                 <View style={styles.row}>
//                   <View style={[styles.detailBox, styles.full]}>
//                     <Text style={styles.json}>{JSON.stringify(location)}</Text>
//                   </View>
//                 </View>
//               </View>
//             </React.Fragment>
//           )}
//         </SafeAreaView>
//       </ScrollView>
   
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#CCCCCC"
//   },
//   innerContainer: {
//     marginVertical: 30
//   },
//   title: {
//     textAlign: "center",
//     fontSize: 30,
//     fontWeight: "bold"
//   },
//   repoLink: {
//     textAlign: "center",
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#0000CC",
//     textDecorationLine: "underline"
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     justifyContent: "space-between",
//     marginTop: 5,
//     marginBottom: 5
//   },
//   detailBox: {
//     padding: 15,
//     justifyContent: "center"
//   },
//   button: {
//     flex: 1,
//     marginHorizontal: 10,
//     marginTop: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 10
//   },
//   buttonText: {
//     fontSize: 30,
//     color: "#FFFFFF"
//   },
//   valueTitle: {
//     fontFamily: "Futura",
//     fontSize: 12
//   },
//   detail: {
//     fontSize: 15,
//     fontWeight: "bold"
//   },
//   largeDetail: {
//     fontSize: 20
//   },
//   json: {
//     fontSize: 12,
//     fontFamily: "Courier",
//     textAlign: "center",
//     fontWeight: "bold"
//   },
//   full: {
//     width: "100%"
//   },
//   half: {
//     width: "50%"
//   },
//   third: {
//     width: "33%"
//   }
// });
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@




// import React from 'react'
// import { Platform } from 'react-native'
// import PropTypes from 'prop-types'
// import { GiftedChat } from 'react-native-gifted-chat'
// import emojiUtils from 'emoji-utils'

// import SlackMessage from './SlackMessage'

// export default class App extends React.Component {
//   state = {
//     messages: [],
//   }

//   componentDidMount() {
//     this.setState({
//       messages: [
//         {
//           _id: 1,
//           text: 'Hello developer!!!',
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: 'React Native',
//             avatar: 'https://placeimg.com/140/140/any',
//           },
//         },
//       ],
//     })
//   }

//   onSend(messages = []) {
//     this.setState(previousState => ({
//       messages: GiftedChat.append(previousState.messages, messages),
//     }))
//   }

//   renderMessage(props) {
//     const {
//       currentMessage: { text: currText },
//     } = props

//     let messageTextStyle

//     // Make "pure emoji" messages much bigger than plain text.
//     if (currText && emojiUtils.isPureEmojiString(currText)) {
//       messageTextStyle = {
//         fontSize: 28,
//         // Emoji get clipped if lineHeight isn't increased; make it consistent across platforms.
//         lineHeight: Platform.OS === 'android' ? 34 : 30,
//       }
//     }

//     return <SlackMessage {...props} messageTextStyle={messageTextStyle} />
//   }

//   render() {
//     return (
//       <GiftedChat
//         messages={this.state.messages}
//         onSend={messages => this.onSend(messages)}
//         user={{
//           _id: 1,
//         }}
//         renderMessage={this.renderMessage}
//       />
//     )
//   }
// }





// import axios from "axios"
// import { Provider } from 'react-redux';
// import {createStore,applyMiddleware} from "redux" 
// import thunk from  "redux-thunk"
// import AllReducer from "../Reducer/index"
// import DeviceInfo from 'react-native-device-info';
// import { NavigationContainer } from '@react-navigation/native';
 
// import Auth from "./screens/AuthScreen"
// import socketIOClient from "socket.io-client";
 
// const ENDPOINT = "http://192.168.1.3:3333";


// const store = createStore(AllReducer,  
//   applyMiddleware(thunk),
//   // other store enhancers if any
// );
// import {useSelector,useDispatch,connect} from 'react-redux';

// import React from "react";
// import {
//   Linking,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   View,
  
// } from "react-native";
// import RNLocation from "react-native-location";
// import moment from "moment";
// const socket = socketIOClient(ENDPOINT);
// const repoUrl = "https://github.com/timfpark/react-native-location";
// const unsubscribe = RNLocation.subscribeToLocationUpdates(locations => {
//  console.log("out side loction ",locations)
// })

// // Unsubscribe
// unsubscribe();
// class App extends React.PureComponent {
//   constructor() {
//     super();
  
//     this.state = {
//       location: null,
//     };
//   }
  
//   componentDidMount(){
   
 
//   }
  
//   UNSAFE_componentWillMount() {
//     // this._startUpdatingLocation();
//     RNLocation.configure({
//       distanceFilter: 0, // Meters
//       desiredAccuracy: {
//         ios: "best",
//         android: "highAccuracy"
//       },
//       // Android only
//       androidProvider: "auto",
//       interval: 500, // Milliseconds
//       fastestInterval: 100, // Milliseconds
//       maxWaitTime: 500, // Milliseconds
//       // iOS Only
//       activityType: "other",
//       allowsBackgroundLocationUpdates: false,
//       headingFilter: 1, // Degrees
//       headingOrientation: "portrait",
//       pausesLocationUpdatesAutomatically: false,
//       showsBackgroundLocationIndicator: false,
//   })
    
//     RNLocation.requestPermission({
//       ios: "whenInUse",
//       android: {
//         detail: "fine",
//         rationale: {
//           title: "Location permission",
//           message: "We use your location to demo the library",
//           buttonPositive: "OK",
//           buttonNegative: "Cancel"
//         }
//       }
//     }).then(granted => {
//       if (granted) {
//         this._startUpdatingLocation();
//       }
//     });
//   }

//   _startUpdatingLocation = () => {
 
//     RNLocation.subscribeToLocationUpdates(
//       locations =>   { console.log("i am runing ")
//       let token=store.getState().trueSignin.token;
//  DeviceInfo.getBatteryLevel().then(batteryLevel => {
//         socket.emit("updateTrafficLoc",

      
//          {locations,batteryLevel, token}  
         
//       )    
//       this.setState({ location: locations[0] })
//             });    
    
//  console.log(locations)
//         // this.setState({ location: locations[0] });
//       }
//     );
//   };
 
   

//   render() {
 
//     const { location } = this.state;
//     console.log("location : ",location)
//     return (
//     <Provider store={store}  >
//          <NavigationContainer>
//          <Auth  location={location}/>
//         </NavigationContainer>
//       </Provider>
       
//     );
//   }
// }

//  export default   App;
 
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#CCCCCC"
//   },
//   innerContainer: {
//     marginVertical: 30
//   },
//   title: {
//     textAlign: "center",
//     fontSize: 30,
//     fontWeight: "bold"
//   },
//   repoLink: {
//     textAlign: "center",
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#0000CC",
//     textDecorationLine: "underline"
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     justifyContent: "space-between",
//     marginTop: 5,
//     marginBottom: 5
//   },
//   detailBox: {
//     padding: 15,
//     justifyContent: "center"
//   },
//   button: {
//     flex: 1,
//     marginHorizontal: 10,
//     marginTop: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 10
//   },
//   buttonText: {
//     fontSize: 30,
//     color: "#FFFFFF"
//   },
//   valueTitle: {
//     fontFamily: "Futura",
//     fontSize: 12
//   },
//   detail: {
//     fontSize: 15,
//     fontWeight: "bold"
//   },
//   largeDetail: {
//     fontSize: 20
//   },
//   json: {
//     fontSize: 12,
//     fontFamily: "Courier",
//     textAlign: "center",
//     fontWeight: "bold"
//   },
//   full: {
//     width: "100%"
//   },
//   half: {
//     width: "50%"
//   },
//   third: {
//     width: "33%"
//   }
// });




// import React from "react";
// import {
//   Linking,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   View
// } from "react-native";
// import RNLocation from "react-native-location";
// import moment from "moment";

// const repoUrl = "https://github.com/timfpark/react-native-location";

// export default class App extends React.PureComponent {
//   constructor() {
//     super();
//     this.state = {
//       location: null
//     };
//   }
//   componentDidMount(){
//     RNLocation.configure({
//       distanceFilter: 0, // Meters
//       desiredAccuracy: {
//         ios: "best",
//         android: "highAccuracy"
//       },
//       // Android only
//       androidProvider: "auto",
//       interval: 50, // Milliseconds
//       fastestInterval: 10, // Milliseconds
//       maxWaitTime: 50, // Milliseconds
//       // iOS Only
//       activityType: "other",
//       allowsBackgroundLocationUpdates: false,
//       headingFilter: 1, // Degrees
//       headingOrientation: "portrait",
//       pausesLocationUpdatesAutomatically: false,
//       showsBackgroundLocationIndicator: false,
//   })
//   }
//   UNSAFE_componentWillMount() {
    
//     RNLocation.configure({
//       distanceFilter: 5.0
//     });
    
//     RNLocation.requestPermission({
//       ios: "whenInUse",
//       android: {
//         detail: "fine",
//         rationale: {
//           title: "Location permission",
//           message: "We use your location to demo the library",
//           buttonPositive: "OK",
//           buttonNegative: "Cancel"
//         }
//       }
//     }).then(granted => {
//       if (granted) {
//         this._startUpdatingLocation();
//       }
//     });
//   }

//   _startUpdatingLocation = () => {
//   RNLocation.subscribeToLocationUpdates(
//       locations => {
//         console.log(locations)
//         this.setState({ location: locations[0] });
//       }
//     );
//   };

//   _stopUpdatingLocation = () => {
//     this.locationSubscription && this.locationSubscription();
//     this.setState({ location: null });
//   };

//   _openRepoUrl = () => {
//     Linking.openURL(repoUrl).catch(err =>
//       console.error("An error occurred", err)
//     );
//   };

//   render() {

//     RNLocation.subscribeToLocationUpdates(
//       locations => {
//         this.setState({ location: locations[0] });
//       }
//     );
//     const { location } = this.state;
//     return (
//       <ScrollView style={styles.container}>
//         <SafeAreaView style={styles.innerContainer}>
//           <View style={{ alignItems: "center", marginTop: 30 }}>
//             <Text style={styles.title}>react-native-location</Text>
//             <TouchableHighlight
//               onPress={this._openRepoUrl}
//               underlayColor="#CCC"
//               activeOpacity={0.8}
//             >
//               <Text style={styles.repoLink}>{repoUrl}</Text>
//             </TouchableHighlight>
//           </View>

//           <View style={styles.row}>
//             <TouchableHighlight
//               onPress={this._startUpdatingLocation}
//               style={[styles.button, { backgroundColor: "#126312" }]}
//             >
//               <Text style={styles.buttonText}>Start</Text>
//             </TouchableHighlight>

//             <TouchableHighlight
//               onPress={this._stopUpdatingLocation}
//               style={[styles.button, { backgroundColor: "#881717" }]}
//             >
//               <Text style={styles.buttonText}>Stop</Text>
//             </TouchableHighlight>
//           </View>

//           {location && (
//             <React.Fragment>
//               <View style={styles.row}>
//                 <View style={[styles.detailBox, styles.third]}>
//                   <Text style={styles.valueTitle}>Course</Text>
//                   <Text style={[styles.detail, styles.largeDetail]}>
//                     {location.course}
//                   </Text>
//                 </View>

//                 <View style={[styles.detailBox, styles.third]}>
//                   <Text style={styles.valueTitle}>Speed</Text>
//                   <Text style={[styles.detail, styles.largeDetail]}>
//                     {location.speed}
//                   </Text>
//                 </View>

//                 <View style={[styles.detailBox, styles.third]}>
//                   <Text style={styles.valueTitle}>Altitude</Text>
//                   <Text style={[styles.detail, styles.largeDetail]}>
//                     {location.altitude}
//                   </Text>
//                 </View>
//               </View>

//               <View style={{ alignItems: "flex-start" }}>
//                 <View style={styles.row}>
//                   <View style={[styles.detailBox, styles.half]}>
//                     <Text style={styles.valueTitle}>Latitude</Text>
//                     <Text style={styles.detail}>{location.latitude}</Text>
//                   </View>

//                   <View style={[styles.detailBox, styles.half]}>
//                     <Text style={styles.valueTitle}>Longitude</Text>
//                     <Text style={styles.detail}>{location.longitude}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.row}>
//                   <View style={[styles.detailBox, styles.half]}>
//                     <Text style={styles.valueTitle}>Accuracy</Text>
//                     <Text style={styles.detail}>{location.accuracy}</Text>
//                   </View>

//                   <View style={[styles.detailBox, styles.half]}>
//                     <Text style={styles.valueTitle}>Altitude Accuracy</Text>
//                     <Text style={styles.detail}>
//                       {location.altitudeAccuracy}
//                     </Text>
//                   </View>
//                 </View>

//                 <View style={styles.row}>
//                   <View style={[styles.detailBox, styles.half]}>
//                     <Text style={styles.valueTitle}>Timestamp</Text>
//                     <Text style={styles.detail}>{location.timestamp}</Text>
//                   </View>

//                   <View style={[styles.detailBox, styles.half]}>
//                     <Text style={styles.valueTitle}>Date / Time</Text>
//                     <Text style={styles.detail}>
//                       {moment(location.timestamp).format("MM-DD-YYYY h:mm:ss")}
//                     </Text>
//                   </View>
//                 </View>

//                 <View style={styles.row}>
//                   <View style={[styles.detailBox, styles.full]}>
//                     <Text style={styles.json}>{JSON.stringify(location)}</Text>
//                   </View>
//                 </View>
//               </View>
//             </React.Fragment>
//           )}
//         </SafeAreaView>
//       </ScrollView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#CCCCCC"
//   },
//   innerContainer: {
//     marginVertical: 30
//   },
//   title: {
//     textAlign: "center",
//     fontSize: 30,
//     fontWeight: "bold"
//   },
//   repoLink: {
//     textAlign: "center",
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#0000CC",
//     textDecorationLine: "underline"
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     justifyContent: "space-between",
//     marginTop: 5,
//     marginBottom: 5
//   },
//   detailBox: {
//     padding: 15,
//     justifyContent: "center"
//   },
//   button: {
//     flex: 1,
//     marginHorizontal: 10,
//     marginTop: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 10
//   },
//   buttonText: {
//     fontSize: 30,
//     color: "#FFFFFF"
//   },
//   valueTitle: {
//     fontFamily: "Futura",
//     fontSize: 12
//   },
//   detail: {
//     fontSize: 15,
//     fontWeight: "bold"
//   },
//   largeDetail: {
//     fontSize: 20
//   },
//   json: {
//     fontSize: 12,
//     fontFamily: "Courier",
//     textAlign: "center",
//     fontWeight: "bold"
//   },
//   full: {
//     width: "100%"
//   },
//   half: {
//     width: "50%"
//   },
//   third: {
//     width: "33%"
//   }
// });




// ###################################3
 
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import axios from "axios"
import { Provider } from 'react-redux';
import {createStore,applyMiddleware} from "redux" 
import thunk from  "redux-thunk"
import AllReducer from "../Reducer/index"
 
import { NavigationContainer } from '@react-navigation/native';
 
import Auth from "./screens/AuthScreen"
import socketIOClient from "socket.io-client";
 
const ENDPOINT = "http://192.168.1.15:3333";


const store = createStore(AllReducer,  
  applyMiddleware(thunk),
  // other store enhancers if any
);
import {useSelector,useDispatch,connect} from 'react-redux';

import React from "react";
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert
} from "react-native";
 
 
const socket = socketIOClient(ENDPOINT);


import NetInfo from "@react-native-community/netinfo";
// import Toast from 'react-native-simple-toast';
// import Toast from 'react-native-toast-message'

import RNLocation,{ subscribeToLocationUpdates} from "react-native-location";
import moment from "moment";

const repoUrl = "https://github.com/timfpark/react-native-location";
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';

// or ES6+ destructured imports

import { getUniqueId, getManufacturer } from 'react-native-device-info';
export default class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      location: null
    };
  }

  componentDidMount() {
const a=null
 const battry =  DeviceInfo.getBatteryLevel ().then(batteryLevel => {    
     return batteryLevel
     console.log(batteryLevel)
})
console.log("battry promis ",battry)
// var something = async() => {
//   let result = await functionThatReturnsPromiseA();
//   return result + 1;
// }
let tokens=store.getState().trueSignin.token;
console.log("$%$#%#$%@#$5 ",tokens)
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 0,
      distanceFilter: 0,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
      startOnBoot: true,
      stopOnTerminate: false,
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      interval: 10,
      fastestInterval: 50,
      startForeground:true,
      activitiesInterval: 10,
      stopOnStillActivity: false,
      url: 'http://192.168.1.15:3333/locations',
      httpHeaders: {
        'X-FOO': 'bar'
      },
      
      // customize post properties
      postTemplate: {

        lat: '@latitude',
        lon: '@longitude',
        bearing:'@bearing',
        time:"@time",
     
        userId:tokens
      }
    });
    // BackgroundGeolocation.getLocations(
    //   function (locations) {
    //     console.log(locations);
    //   }
    // );
    
    BackgroundGeolocation.on("abort_requested",()=>{
      console.log("reqested abroed")
    })
    BackgroundGeolocation.headlessTask(async (event) => {
      if (event.name === 'location') {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', 'http://192.168.1.15:3333/fail');
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(event.params));
      }
  });
    BackgroundGeolocation.on('location', (location) => {
//       // BackgroundGeolocation.forceSync();
//       // BackgroundGeolocation.getValidLocations((location=>console.log(location)))
//       // BackgroundGeolocation.deleteAllLocations()
//       // const socket = socketIOClient(ENDPOINT);
// //              if(store.getState().trueSignin.loading!==true){
// //         let token=store.getState().trueSignin.token;
// //  DeviceInfo.getBatteryLevel().then(batteryLevel => {
// //         socket.emit("updateTrafficLoc",

      
// //          {location,batteryLevel, token}  
         
// //       )     
// //  }  )
// // }
//     //   socket.emit("msg",{
//     //     data: "Nice code!"   
//     // })
      Toast.show("location updated"+location.latitude);
//       console.log("locstion ",location )
//       var xhr = new XMLHttpRequest();
//       xhr.open('POST', 'http://192.168.1.15:3333/fail');
//       xhr.setRequestHeader('Content-Type', 'application/json');
//       xhr.send(JSON.stringify(location));
//       // execute long running task
//       // handle your locations here
//       // to perform long running operation on iOS
//       // you need to create background task
//       BackgroundGeolocation.startTask(taskKey => {
//         console.log("location changed")
//         // var xhr = new XMLHttpRequest();
//         // xhr.open('POST', 'http://192.168.1.15:3333/fail');
//         // xhr.setRequestHeader('Content-Type', 'application/json');
//         // xhr.send(JSON.stringify(location));
//         // execute long running task
//         // eg. ajax post location
//         // IMPORTANT: task has to be ended by endTask
//         // BackgroundGeolocation.endTask(taskKey);
//       });
    });

    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      // handle stationary locations here
      Toast.show("on stationary");
      // Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on('error', (error) => {
     
      Toast.show("on error");
      console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.on('start', () => {
      Toast.show("on start");
      console.log('[INFO] BackgroundGeolocation service has been started');
    });

    BackgroundGeolocation.on('stop', () => {
      Toast.show("on stop");
      console.log('[INFO] BackgroundGeolocation service has been stopped');
    });

    BackgroundGeolocation.on('authorization', (status) => {
      Toast.show("on start");
      console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(() =>
          Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
            { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
            { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
          ]), 1000);
      }
    });

    BackgroundGeolocation.on('background', () => {
      // BackgroundGeolocation.on('location', (location) => {
      //   var xhr = new XMLHttpRequest();
      //   xhr.open('POST', 'http://192.168.1.15:3333/fail');
      //   xhr.setRequestHeader('Content-Type', 'application/json');
      //   xhr.send(JSON.stringify(location));

      // });

//       const ENDPOINT = "http://192.168.1.15:3333";
       
// const socket = socketIOClient(ENDPOINT);
      Toast.show("on background");
      console.log('[INFO] App is in background');



    });

    BackgroundGeolocation.on('foreground', () => {
      Toast.show("on foreground");

      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.on('abort_requested', () => {
      console.log('[INFO] Server responded with 285 Updates Not Required');

      // Here we can decide whether we want stop the updates or not.
      // If you've configured the server to return 285, then it means the server does not require further update.
      // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
      // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    });

    BackgroundGeolocation.on('http_authorization', () => {
      console.log('[INFO] App needs to authorize the http requests');
    });

    BackgroundGeolocation.checkStatus(status => {
      console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
      console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
      console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

      // you don't need to check status before start (this is just the example)
      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });

    // you can also just start without checking for status
    BackgroundGeolocation.start();
  }

//     componentWillUnmount() {
//     // unregister all event listeners
//     // BackgroundGeolocation.removeAllListeners();
//   }

  // componentDidMount(){
  //   RNLocation.getLatestLocation({ timeout: 60000 })
  // .then(latestLocation => {
  // //  console.log("latest ",latestLocation)
  // })
  //   DeviceInfo.getBatteryLevel().then(batteryLevel => {
  //     // 0.759999
  //     // console.log("battry level ",batteryLevel )
  //   });
 
  //   NetInfo.fetch().then(state => {
     
  //     // console.log("Connection type", state.type);
  //     // console.log("Is connected?", state.isConnected);
  //   })
  // }
componentWillUnmount(){
  RNLocation.subscribeToLocationUpdates(locations => {
    // /* Example location returned
    {
     console.log(locations)

    }
    
  })
 
}
  UNSAFE_componentWillMount() {
 
    RNLocation.configure({
      distanceFilter: 0, // Meters
      desiredAccuracy: {
        ios: "best",
        android: "highAccuracy"
      },
      // Android only
      androidProvider: "auto",
      interval: 500, // Milliseconds
      fastestInterval: 100, // Milliseconds
      maxWaitTime: 500, // Milliseconds
      // iOS Only
      // activityType: "other",
      // allowsBackgroundLocationUpdates: false,
      // headingFilter: 1, // Degrees
      // headingOrientation: "portrait",
      // pausesLocationUpdatesAutomatically: false,
      // showsBackgroundLocationIndicator: false,
  })
    
    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "fine",
        rationale: {
          title: "Location permission",
          message: "We use your location to demo the library",
          buttonPositive: "OK",
          buttonNegative: "Cancel"
        }
      }
    }).then(granted => {
      if (granted) {
        this._startUpdatingLocation();
      }
    });
  }

  _startUpdatingLocation = async() => {
  await RNLocation.subscribeToLocationUpdates(
      locations => {
        if(store.getState().trueSignin.loading!==true){
        let token=store.getState().trueSignin.token;
 DeviceInfo.getBatteryLevel().then(batteryLevel => {
        socket.emit("updateTrafficLoc",

      
         {locations,batteryLevel, token}  
         
      )    
      this.setState({ location: locations[0] })
            });    
    
 
            Toast.show('This is a toast.'+locations[0].latitude+"  "+locations[0].longitude+" "+locations[0].speed);

        console.log('on socket ',locations)
        this.setState({ location: locations[0] });
          }
      }
    );
  };

  _stopUpdatingLocation = () => {
    this.locationSubscription && this.locationSubscription();
    this.setState({ location: null });
  };
 _getCurrentLocation=()=> {
  //  console.log("click")
   RNLocation.subscribeToLocationUpdates(locations => {
    {   Alert.alert("location")
    // /* Example location returned
    
    //  console.log("U@@@@@@@@@: ",locations)

    }
    
  })

  RNLocation.requestPermission({
  ios: "whenInUse",
  android: {
    detail: "fine"
  }
}).then(granted => {
    if (granted) {
 RNLocation.subscribeToLocationUpdates(locations => {
        // /* Example location returned
        {
        //  console.log(locations)
        }
        
      })
    }
  })

}

  _openRepoUrl = () => {
    Linking.openURL(repoUrl).catch(err =>
      console.error("An error occurred", err)
    );
  };

  render() {
    // this._startUpdatingLocation();

    const { location } = this.state;
    // console.log("location ",location)
    return (
    <Provider store={store}  >
         <NavigationContainer>
         <Auth  location={location}/>
        </NavigationContainer>
      </Provider>
   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CCCCCC"
  },
  innerContainer: {
    marginVertical: 30
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  repoLink: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "#0000CC",
    textDecorationLine: "underline"
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5
  },
  detailBox: {
    padding: 15,
    justifyContent: "center"
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  buttonText: {
    fontSize: 30,
    color: "#FFFFFF"
  },
  valueTitle: {
    fontFamily: "Futura",
    fontSize: 12
  },
  detail: {
    fontSize: 15,
    fontWeight: "bold"
  },
  largeDetail: {
    fontSize: 20
  },
  json: {
    fontSize: 12,
    fontFamily: "Courier",
    textAlign: "center",
    fontWeight: "bold"
  },
  full: {
    width: "100%"
  },
  half: {
    width: "50%"
  },
  third: {
    width: "33%"
  }
});
// @@@@@@@@@@@@@@@@@@@@@@@@@@@2


// import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
// import Toast from 'react-native-simple-toast';
// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
//   TouchableOpacity,
//   Platform,
//   Linking,
// } from 'react-native';
// import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

// import BackgroundJob from 'react-native-background-actions';
// import RNLocation,{ subscribeToLocationUpdates} from "react-native-location";

// const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));
// const _startUpdatingLocation = () => {
//    RNLocation.subscribeToLocationUpdates(
//       locations => {
//         console.log(locations)
        
// //         if(store.getState().trueSignin.loading!==true){
// //         let token=store.getState().trueSignin.token;
// //  DeviceInfo.getBatteryLevel().then(batteryLevel => {
// //         socket.emit("updateTrafficLoc",

      
// //          {locations,batteryLevel, token}  
         
// //       )    
// //       this.setState({ location: locations[0] })
// //             });    
    
 
// //             Toast.show('This is a toast.'+locations[0].latitude+"  "+locations[0].longitude+" "+locations[0].speed);

// //         console.log('on socket ',locations)
// //         this.setState({ location: locations[0] });
// //           }
//       }
//     );
//   };

// const taskRandom = async taskData => {
//   if (Platform.OS === 'ios') {
//     console.warn(
//       'This task will not keep your app alive in the background by itself, use other library like react-native-track-player that use audio,',
//       'geolocalization, etc. to keep your app alive in the background while you excute the JS from this library.',
//     );
//   }
//   await new Promise(async resolve => {
//     // For loop with a delay
//     const {delay} = taskData;
//     _startUpdatingLocation()
//     for (let i = 0; BackgroundJob.isRunning(); i++) {
//       console.log('Runned -> ', i);
//       await BackgroundJob.updateNotification({taskDesc: 'Runned -> ' + i});
//       await sleep(delay);
//     }
//   });
// };

// const options = {
//   taskName: 'Example',
//   taskTitle: 'ExampleTask title',
//   taskDesc: 'ExampleTask desc',
//   taskIcon: {
//     name: 'ic_launcher',
//     type: 'mipmap',
//   },
//   color: '#ff00ff',
//   linkingURI: 'exampleScheme://chat/jane',
//   parameters: {
//     delay: 1000,
//   },
// };


// function handleOpenURL(evt) {
//   console.log(evt.url);
//   // do something with the url
// }

// Linking.addEventListener('url', handleOpenURL);

// class App extends React.Component {
//   playing = BackgroundJob.isRunning();

//   /**
//    * Toggles the background task
//    */

//   componentDidMount(){
//     RNLocation.getLatestLocation({ timeout: 60000 })
//   .then(latestLocation => {
//   //  console.log("latest ",latestLocation)
//   })
//     // DeviceInfo.getBatteryLevel().then(batteryLevel => {
//     //   // 0.759999
//     //   // console.log("battry level ",batteryLevel )
//     // });
 
//     // NetInfo.fetch().then(state => {
     
//     //   // console.log("Connection type", state.type);
//     //   // console.log("Is connected?", state.isConnected);
//     // })
//   }
// // componentWillUnmount(){
// //   RNLocation.subscribeToLocationUpdates(locations => {
// //     // /* Example location returned
// //     {
// //      console.log(locations)

// //     }
    
// //   })
 
// // }
//   UNSAFE_componentWillMount() {
 
//     RNLocation.configure({
//       distanceFilter: 0, // Meters
//       desiredAccuracy: {
//         ios: "best",
//         android: "highAccuracy"
//       },
//       // Android only
//       androidProvider: "auto",
//       interval: 500, // Milliseconds
//       fastestInterval: 100, // Milliseconds
//       maxWaitTime: 500, // Milliseconds
//       // iOS Only
//       // activityType: "other",
//       // allowsBackgroundLocationUpdates: false,
//       // headingFilter: 1, // Degrees
//       // headingOrientation: "portrait",
//       // pausesLocationUpdatesAutomatically: false,
//       // showsBackgroundLocationIndicator: false,
//   })
    
//     RNLocation.requestPermission({
//       ios: "whenInUse",
//       android: {
//         detail: "fine",
//         rationale: {
//           title: "Location permission",
//           message: "We use your location to demo the library",
//           buttonPositive: "OK",
//           buttonNegative: "Cancel"
//         }
//       }
//     }).then(granted => {
//       if (granted) {
//         // this._startUpdatingLocation();
//       }
//     });
//   }

  
//   _stopUpdatingLocation = () => {
//     this.locationSubscription && this.locationSubscription();
//     this.setState({ location: null });
//   };
//  _getCurrentLocation=()=> {
//   //  console.log("click")
//    RNLocation.subscribeToLocationUpdates(locations => {
//     {   Alert.alert("location")
//     // /* Example location returned
    
//     //  console.log("U@@@@@@@@@: ",locations)

//     }
    
//   })

//   RNLocation.requestPermission({
//   ios: "whenInUse",
//   android: {
//     detail: "fine"
//   }
// }).then(granted => {
//     if (granted) {
//  RNLocation.subscribeToLocationUpdates(locations => {
//         // /* Example location returned
//         {
//         //  console.log(locations)
//         }
        
//       })
//     }
//   })

// }
//   toggleBackground = async () => {
//     this.playing = !this.playing;
//     if (this.playing) {
//       try {
//         console.log('Trying to start background service');
//         await BackgroundJob.start(taskRandom, options);
//         console.log('Successful start!');
//       } catch (e) {
//         console.log('Error', e);
//       }
//     } else {
//       console.log('Stop background service');
//       await BackgroundJob.stop();
//     }
//   };
//   render() {
//     return (
//       <>
//         <StatusBar barStyle="dark-content" />
//         <SafeAreaView>
//           <ScrollView
//             contentInsetAdjustmentBehavior="automatic"
//             style={styles.scrollView}>
//             <Header />
//             {global.HermesInternal == null ? null : (
//               <View style={styles.engine}>
//                 <Text style={styles.footer}>Engine: Hermes</Text>
//               </View>
//             )}
//             <View style={styles.body}>
//               <TouchableOpacity
//                 style={{height: 100, width: 100, backgroundColor: 'red'}}
//                 onPress={this.toggleBackground}></TouchableOpacity>
//             </View>
//           </ScrollView>
//         </SafeAreaView>
//       </>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

// export default App;




// import React, { Component } from 'react';
// import { Alert,View,Text } from 'react-native';
// import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
// import Toast from 'react-native-simple-toast';

// class BgTracking extends Component {
//   componentDidMount() {
//     BackgroundGeolocation.configure({
//       desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
//       stationaryRadius: 0,
//       distanceFilter: 0,
//       notificationTitle: 'Background tracking',
//       notificationText: 'enabled',
//       debug: true,
//       startOnBoot: true,
//       stopOnTerminate: false,
//       locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER ,
//       interval: 10,
//       fastestInterval: 50,
//       startForeground:true,
//       activitiesInterval: 10,
//       stopOnStillActivity: false,
//       url: 'http://192.168.1.15:3333/',
//       httpHeaders: {
//         'X-FOO': 'bar'
//       },
//       // customize post properties
//       postTemplate: {
//         lat: '@latitude',
//         lon: '@longitude',
//         foo: 'bar' // you can also add your own properties
//       }
//     });
//     // BackgroundGeolocation.getLocations(
//     //   function (locations) {
//     //     console.log(locations);
//     //   }
//     // );
//     BackgroundGeolocation.on('location', (location) => {
//       Toast.show("location updated"+location.latitude);
//       console.log("locstion ",location.latitude )
//       // handle your locations here
//       // to perform long running operation on iOS
//       // you need to create background task
//       BackgroundGeolocation.startTask(taskKey => {
//         console.log("location changed")
//         // execute long running task
//         // eg. ajax post location
//         // IMPORTANT: task has to be ended by endTask
//         BackgroundGeolocation.endTask(taskKey);
//       });
//     });

//     BackgroundGeolocation.on('stationary', (stationaryLocation) => {
//       // handle stationary locations here
//       Toast.show("on stationary");
//       Actions.sendLocation(stationaryLocation);
//     });

//     BackgroundGeolocation.on('error', (error) => {
//       Toast.show("on error");
//       console.log('[ERROR] BackgroundGeolocation error:', error);
//     });

//     BackgroundGeolocation.on('start', () => {
//       Toast.show("on start");
//       console.log('[INFO] BackgroundGeolocation service has been started');
//     });

//     BackgroundGeolocation.on('stop', () => {
//       Toast.show("on stop");
//       console.log('[INFO] BackgroundGeolocation service has been stopped');
//     });

//     BackgroundGeolocation.on('authorization', (status) => {
//       Toast.show("on start");
//       console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
//       if (status !== BackgroundGeolocation.AUTHORIZED) {
//         // we need to set delay or otherwise alert may not be shown
//         setTimeout(() =>
//           Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
//             { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
//             { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
//           ]), 1000);
//       }
//     });

//     BackgroundGeolocation.on('background', () => {
//       Toast.show("on background");
//       console.log('[INFO] App is in background');
//     });

//     BackgroundGeolocation.on('foreground', () => {
//       Toast.show("on foreground");

//       console.log('[INFO] App is in foreground');
//     });

//     BackgroundGeolocation.on('abort_requested', () => {
//       console.log('[INFO] Server responded with 285 Updates Not Required');

//       // Here we can decide whether we want stop the updates or not.
//       // If you've configured the server to return 285, then it means the server does not require further update.
//       // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
//       // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
//     });

//     BackgroundGeolocation.on('http_authorization', () => {
//       console.log('[INFO] App needs to authorize the http requests');
//     });

//     BackgroundGeolocation.checkStatus(status => {
//       console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
//       console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
//       console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

//       // you don't need to check status before start (this is just the example)
//       // if (!status.isRunning) {
//       //   BackgroundGeolocation.start(); //triggers start on start event

//       // }
//     });

//     // you can also just start without checking for status
//     BackgroundGeolocation.start();
//   }

//   // componentWillUnmount() {
//   //   // unregister all event listeners
//   //   BackgroundGeolocation.removeAllListeners();
//   // }
//   render(){
//     return(
// <View><Text>kjdkfgfk</Text></View>
//     )
//   }
// }

// export default BgTracking;