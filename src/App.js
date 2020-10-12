
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import axios from "axios"
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import AllReducer from "../Reducer/index"

import { DrawerContent } from '../src/screens/DrawerContent';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Auth from "./screens/AuthScreen"





const store = createStore(AllReducer,
  applyMiddleware(thunk),
  // other store enhancers if any
);
import { useSelector, useDispatch, connect } from 'react-redux';

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



import NetInfo from "@react-native-community/netinfo";

import RNLocation, { subscribeToLocationUpdates } from "react-native-location";
import moment from "moment";

const repoUrl = "https://github.com/timfpark/react-native-location";
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';

// or ES6+ destructured imports

import { getUniqueId, getManufacturer } from 'react-native-device-info';
const Drawer = createDrawerNavigator();

export default class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      location: null
    };
  }

  // componentDidMount() {


  //   const a = null
  //   const battry = DeviceInfo.getBatteryLevel().then(batteryLevel => {
  //     return batteryLevel
  //     console.log(batteryLevel)
  //   })
  //   console.log("battry promis ", battry)
  //   // var something = async() => {
  //   //   let result = await functionThatReturnsPromiseA();
  //   //   return result + 1;
  //   // }

  //   // console.log("=>!",tokens)
  //   // let token=store.getState().trueSignin.token
  //   //  if(store.getState().trueSignin.loading!==true){

  //   //   console.log("token uuuuu ",token)
  //   //   socket.emit('setUsername',{token});

  //   //  }else{
  //   //    console.log("er uuuu")
  //   //  }


  //   // console.log("$%$#%#$%@#$5 ",tokens)
  //   BackgroundGeolocation.configure({
  //     desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
  //     stationaryRadius: 10,
  //     distanceFilter: 10,
  //     notificationTitle: 'Background tracking',
  //     notificationText: 'enabled',
  //     debug: true,
  //     startOnBoot: true,
  //     stopOnTerminate: false,
  //     locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
  //     interval: 10000,
  //     fastestInterval: 50000,
  //     startForeground: true,
  //     activitiesInterval: 10000,
  //     stopOnStillActivity: false,
  //     url: 'http://192.168.1.15:3333/locations',
  //     httpHeaders: {
  //       'X-FOO': 'bar'
  //     },

  //     // customize post properties
  //     postTemplate: {

  //       lat: '@latitude',
  //       lon: '@longitude',
  //       bearing: '@bearing',
  //       time: "@time",

  //     }
  //   });
  //   // BackgroundGeolocation.getLocations(
  //   //   function (locations) {
  //   //     console.log(locations);
  //   //   }
  //   // );

  //   BackgroundGeolocation.on("abort_requested", () => {
  //     console.log("reqested abroed")
  //   })
  //   //   BackgroundGeolocation.headlessTask(async (event) => {
  //   //     if (event.name === 'location') {
  //   //         var xhr = new XMLHttpRequest();
  //   //         xhr.open('POST', 'http://192.168.1.15:3333/fail');
  //   //         xhr.setRequestHeader('Content-Type', 'application/json');
  //   //         xhr.send(JSON.stringify(event.params));
  //   //     }
  //   // });
  //   // BackgroundGeolocation.on('location', (location) => {
  //   //       // BackgroundGeolocation.forceSync();
  //   //       // BackgroundGeolocation.getValidLocations((location=>console.log(location)))
  //   //       // BackgroundGeolocation.deleteAllLocations()
  //   //       // const socket = socketIOClient(ENDPOINT);
  //   // //              if(store.getState().trueSignin.loading!==true){
  //   // //         let token=store.getState().trueSignin.token;
  //   // //  DeviceInfo.getBatteryLevel().then(batteryLevel => {
  //   // //         socket.emit("updateTrafficLoc",


  //   // //          {location,batteryLevel, token}  

  //   // //       )     
  //   // //  }  )
  //   // // }
  //   //     //   socket.emit("msg",{
  //   //     //     data: "Nice code!"   
  //   //     // })
  //   // Toast.show("location updated"+location.latitude);
  //   //       console.log("locstion ",location )
  //   //       var xhr = new XMLHttpRequest();
  //   //       xhr.open('POST', 'http://192.168.1.15:3333/fail');
  //   //       xhr.setRequestHeader('Content-Type', 'application/json');
  //   //       xhr.send(JSON.stringify(location));
  //   //       // execute long running task
  //   //       // handle your locations here
  //   //       // to perform long running operation on iOS
  //   //       // you need to create background task
  //   //       BackgroundGeolocation.startTask(taskKey => {
  //   //         console.log("location changed")
  //   //         // var xhr = new XMLHttpRequest();
  //   //         // xhr.open('POST', 'http://192.168.1.15:3333/fail');
  //   //         // xhr.setRequestHeader('Content-Type', 'application/json');
  //   //         // xhr.send(JSON.stringify(location));
  //   //         // execute long running task
  //   //         // eg. ajax post location
  //   //         // IMPORTANT: task has to be ended by endTask
  //   //         // BackgroundGeolocation.endTask(taskKey);
  //   //       });
  //   // });

  //   BackgroundGeolocation.on('stationary', (stationaryLocation) => {
  //     // handle stationary locations here
  //     Toast.show("on stationary");
  //     // Actions.sendLocation(stationaryLocation);
  //   });

  //   BackgroundGeolocation.on('error', (error) => {

  //     Toast.show("on error");
  //     console.log('[ERROR] BackgroundGeolocation error:', error);
  //   });

  //   BackgroundGeolocation.on('start', () => {
  //     Toast.show("on start");
  //     console.log('[INFO] BackgroundGeolocation service has been started');
  //   });

  //   BackgroundGeolocation.on('stop', () => {
  //     Toast.show("on stop");
  //     console.log('[INFO] BackgroundGeolocation service has been stopped');
  //   });

  //   BackgroundGeolocation.on('authorization', (status) => {
  //     Toast.show("on start");
  //     console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
  //     if (status !== BackgroundGeolocation.AUTHORIZED) {
  //       // we need to set delay or otherwise alert may not be shown
  //       setTimeout(() =>
  //         Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
  //           { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
  //           { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
  //         ]), 1000);
  //     }
  //   });

  //   BackgroundGeolocation.on('background', () => {
  //     // BackgroundGeolocation.on('location', (location) => {
  //     //   var xhr = new XMLHttpRequest();
  //     //   xhr.open('POST', 'http://192.168.1.15:3333/fail');
  //     //   xhr.setRequestHeader('Content-Type', 'application/json');
  //     //   xhr.send(JSON.stringify(location));

  //     // });

  //     //       const ENDPOINT = "http://192.168.1.15:3333";

  //     // const socket = socketIOClient(ENDPOINT);
  //     Toast.show("on background");
  //     console.log('[INFO] App is in background');



  //   });

  //   BackgroundGeolocation.on('foreground', () => {
  //     Toast.show("on foreground");

  //     console.log('[INFO] App is in foreground');
  //   });

  //   BackgroundGeolocation.on('abort_requested', () => {
  //     console.log('[INFO] Server responded with 285 Updates Not Required');

  //     // Here we can decide whether we want stop the updates or not.
  //     // If you've configured the server to return 285, then it means the server does not require further update.
  //     // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
  //     // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
  //   });

  //   BackgroundGeolocation.on('http_authorization', () => {
  //     console.log('[INFO] App needs to authorize the http requests');
  //   });

  //   BackgroundGeolocation.checkStatus(status => {
  //     console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
  //     console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
  //     console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

  //     // you don't need to check status before start (this is just the example)
  //     if (!status.isRunning) {
  //       BackgroundGeolocation.start(); //triggers start on start event
  //     }
  //   });

  //   // you can also just start without checking for status
  //   BackgroundGeolocation.start();
  // }

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
  // componentWillUnmount() {
  //   RNLocation.subscribeToLocationUpdates(locations => {
  //     // /* Example location returned
  //     {
  //       console.log(locations)

  //     }

  //   })

  // }
  // UNSAFE_componentWillMount() {

  //   RNLocation.configure({
  //     distanceFilter: 10, // Meters
  //     desiredAccuracy: {
  //       ios: "best",
  //       android: "highAccuracy"
  //     },
  //     // Android only
  //     androidProvider: "auto",
  //     interval: 50000, // Milliseconds
  //     fastestInterval: 10000, // Milliseconds
  //     maxWaitTime: 50000, // Milliseconds
  //     // iOS Only
  //     // activityType: "other",
  //     // allowsBackgroundLocationUpdates: false,
  //     // headingFilter: 1, // Degrees
  //     // headingOrientation: "portrait",
  //     // pausesLocationUpdatesAutomatically: false,
  //     // showsBackgroundLocationIndicator: false,
  //   })

  //   RNLocation.requestPermission({
  //     ios: "whenInUse",
  //     android: {
  //       detail: "fine",
  //       rationale: {
  //         title: "Location permission",
  //         message: "We use your location to demo the library",
  //         buttonPositive: "OK",
  //         buttonNegative: "Cancel"
  //       }
  //     }
  //   }).then(granted => {
  //     if (granted) {
  //       this._startUpdatingLocation();
  //     }
  //   });
  // }

  // _startUpdatingLocation = async () => {
  //   await RNLocation.subscribeToLocationUpdates(
  //     locations => {

  //       if (store.getState().trueSignin.loading !== true && store.getState().trueSignin.token !== null) {
  //         console.log("######################################", store.getState().trueSignin.token)
  //         let token = store.getState().trueSignin.token;
  //         DeviceInfo.getBatteryLevel().then(batteryLevel => {
  //           //   socket.emit("updateTrafficLoc",


  //           //    {locations,batteryLevel, token}  

  //           // )    
  //           this.setState({ location: locations[0] })
  //         });


  //         Toast.show('This is a toast.' + locations[0].latitude + "  " + locations[0].longitude + " " + locations[0].speed);

  //         console.log('on socket ', locations)
  //         this.setState({ location: locations[0] });
  //       } else {
  //         console.log("is loading errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", store.getState().trueSignin.loading)
  //       }
  //     }
  //   );
  // };

  // _stopUpdatingLocation = () => {
  //   this.locationSubscription && this.locationSubscription();
  //   this.setState({ location: null });
  // };
  // _getCurrentLocation = () => {
  //   //  console.log("click")
  //   RNLocation.subscribeToLocationUpdates(locations => {
  //     {
  //       Alert.alert("location")
  //       // /* Example location returned

  //       //  console.log("U@@@@@@@@@: ",locations)

  //     }

  //   })

  //   RNLocation.requestPermission({
  //     ios: "whenInUse",
  //     android: {
  //       detail: "fine"
  //     }
  //   }).then(granted => {
  //     if (granted) {
  //       RNLocation.subscribeToLocationUpdates(locations => {
  //         // /* Example location returned
  //         {
  //           //  console.log(locations)
  //         }

  //       })
  //     }
  //   })

  // }

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


          <Auth location={location} />

        </NavigationContainer>

      </Provider>

    );
  }
} 