import React, { Component, useEffect, useState, useContext } from 'react'
import { fetchSignIn, removeUserToken, fetchOnlineUser,saveLocationconfig } from '../../Action/index';
import { useSelector, useDispatch, connect } from 'react-redux';
import { DrawerContent } from './DrawerContent';
import { createDrawerNavigator, useIsDrawerOpen } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import MapScreen from "./MapScreen"
import { View, Text, Button, Alert } from "react-native"
import socketIOClient from "socket.io-client";
import Geolocation from 'react-native-geolocation-service';
import { NativeModules, PermissionsAndroid } from 'react-native';
import SocketContext from '../../SocketContext'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import RestartAndroid from 'react-native-restart-android'

import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
 
import NetInfo from "@react-native-community/netinfo";
import RNLocation, { subscribeToLocationUpdates } from "react-native-location";
import moment from "moment";

const repoUrl = "https://github.com/timfpark/react-native-location";
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-simple-toast';

function MainTabScreen() {
  return <MapScreen />
}

// function Home(props){
//   const socket = useContext(SocketContext)

// let token=props.trueSign.token
//      const [t,setT]=useState(0)


//    useEffect(()=>{

//      props.getOnlineUser();

//      console.log("lemin token ",token)
//      if( Object.keys(token).length!==0){
//     socket.emit('setUsername',{token});
//      }else{
//        console.log("empty")
//      }

//    },[t])
//         const Drawer = createDrawerNavigator();
//         const  Stack=createStackNavigator();


//         console.log("token home " ,token)
//         // console.log("for remove", props.trueSign.token)
// const remove=()=>props.signIn()
// // _startUpdatingLocation();

//     return(

//       <Drawer.Navigator drawerContent={p => <DrawerContent {...p} signout={remove} />}>
//         <Drawer.Screen name="Home"     component={MainTabScreen} />
//       </Drawer.Navigator>



//     )
// }
// const mapStateToProps=state=>({
//     sign:state.userSignIn,
//    trueSign:state.trueSignin
//    });
// const mapDispatchToProps = (dispatch) => {
//     return {
//         signIn: () => dispatch(removeUserToken()),
//         getOnlineUser:()=>dispatch(fetchOnlineUser())
//     }
//  };
//  export default connect(mapStateToProps, mapDispatchToProps)(Home)

class App extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   location: null,
    //   token:this.props.sign.token,
    // socket:this.context
    // };
    this.state = {
      location: null,
      token: "",
      config: props.config
  
    }
  }
  
  static contextType = SocketContext;
   
//   componentWillRecieveProps({ config }) {
//     console.log("compinent reacive props $$$$$$$$$$$$$$$$$$$$444")
//     this.setState({ config });

// }
componentDidUpdate(){
  console.log("something happed ",this.props.config)
  console.log("something unhapped ",this.state.config)
   
}
 
  componentDidMount() {
    console.log("config file ",this.props.config.config)
    this.setState({ token: this.props.sign.token })
    console.log("home token  ", this.props.sign.token);
this.setState({config:this.props.config})
    this.props.getOnlineUser();
    const { socket } = this.context
  
    this.context.on("phoneconfig", (data) => {
      console.log("wwwwwwwwwwwwwwwwwww then phone under config ",data.config)
      let config={
        distanceFilter: data.config.distanceFilter, // Meters
         androidProvider: data.config.androidProvider,
        interval: data.config.interval, // Milliseconds
        fastestInterval:data.config.fastestInterval, // Milliseconds
        maxWaitTime: data.config.maxWaitTime, // Milliseconds
      }
      this.props.saveLocationconfigs(JSON.stringify(config))
      setTimeout(()=>{
        RestartAndroid.restart()
        },2000)
    })
    setTimeout(()=>{
      this.context.emit('setUsername', { token: this.props.sign.token });
 
    },3000)
    

    



    const a = null
    const battry = DeviceInfo.getBatteryLevel().then(batteryLevel => {
      return batteryLevel
      console.log(batteryLevel)
    })
    console.log("battry promis ", battry)
    // var something = async() => {
    //   let result = await functionThatReturnsPromiseA();
    //   return result + 1;
    // }

    // console.log("=>!",tokens)
    // let token=store.getState().trueSignin.token
    //  if(store.getState().trueSignin.loading!==true){

    //   console.log("token uuuuu ",token)
    //   socket.emit('setUsername',{token});

    //  }else{
    //    console.log("er uuuu")
    //  }


    // console.log("$%$#%#$%@#$5 ",tokens)
    // BackgroundGeolocation.configure({
    //   desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    //   stationaryRadius: 10,
    //   distanceFilter: 10,
    //   notificationTitle: 'Background tracking',
    //   notificationText: 'enabled',
    //   debug: true,
    //   startOnBoot: true,
    //   stopOnTerminate: false,
    //   locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
    //   interval: 10000,
    //   fastestInterval: 50000,
    //   startForeground: true,
    //   activitiesInterval: 10000,
    //   stopOnStillActivity: false,
    //   url: 'http://192.168.1.15:3333/locations',
    //   httpHeaders: {
    //     'X-FOO': 'bar'
    //   },

    //   // customize post properties
    //   postTemplate: {

    //     lat: '@latitude',
    //     lon: '@longitude',
    //     bearing: '@bearing',
    //     time: "@time",

    //   }
    // });
    // // BackgroundGeolocation.getLocations(
    // //   function (locations) {
    // //     console.log(locations);
    // //   }
    // // );

    // BackgroundGeolocation.on("abort_requested", () => {
    //   console.log("reqested abroed")
    // })
    // //   BackgroundGeolocation.headlessTask(async (event) => {
    // //     if (event.name === 'location') {
    // //         var xhr = new XMLHttpRequest();
    // //         xhr.open('POST', 'http://192.168.1.15:3333/fail');
    // //         xhr.setRequestHeader('Content-Type', 'application/json');
    // //         xhr.send(JSON.stringify(event.params));
    // //     }
    // // });
    // // BackgroundGeolocation.on('location', (location) => {
    // //       // BackgroundGeolocation.forceSync();
    // //       // BackgroundGeolocation.getValidLocations((location=>console.log(location)))
    // //       // BackgroundGeolocation.deleteAllLocations()
    // //       // const socket = socketIOClient(ENDPOINT);
    // // //              if(store.getState().trueSignin.loading!==true){
    // // //         let token=store.getState().trueSignin.token;
    // // //  DeviceInfo.getBatteryLevel().then(batteryLevel => {
    // // //         socket.emit("updateTrafficLoc",


    // // //          {location,batteryLevel, token}  

    // // //       )     
    // // //  }  )
    // // // }
    // //     //   socket.emit("msg",{
    // //     //     data: "Nice code!"   
    // //     // })
    // // Toast.show("location updated"+location.latitude);
    // //       console.log("locstion ",location )
    // //       var xhr = new XMLHttpRequest();
    // //       xhr.open('POST', 'http://192.168.1.15:3333/fail');
    // //       xhr.setRequestHeader('Content-Type', 'application/json');
    // //       xhr.send(JSON.stringify(location));
    // //       // execute long running task
    // //       // handle your locations here
    // //       // to perform long running operation on iOS
    // //       // you need to create background task
    // //       BackgroundGeolocation.startTask(taskKey => {
    // //         console.log("location changed")
    // //         // var xhr = new XMLHttpRequest();
    // //         // xhr.open('POST', 'http://192.168.1.15:3333/fail');
    // //         // xhr.setRequestHeader('Content-Type', 'application/json');
    // //         // xhr.send(JSON.stringify(location));
    // //         // execute long running task
    // //         // eg. ajax post location
    // //         // IMPORTANT: task has to be ended by endTask
    // //         // BackgroundGeolocation.endTask(taskKey);
    // //       });
    // // });

    // BackgroundGeolocation.on('stationary', (stationaryLocation) => {
    //   // handle stationary locations here
    //   Toast.show("on stationary");
    //   // Actions.sendLocation(stationaryLocation);
    // });

    // BackgroundGeolocation.on('error', (error) => {

    //   Toast.show("on error");
    //   console.log('[ERROR] BackgroundGeolocation error:', error);
    // });

    // BackgroundGeolocation.on('start', () => {
    //   Toast.show("on start");
    //   console.log('[INFO] BackgroundGeolocation service has been started');
    // });

    // BackgroundGeolocation.on('stop', () => {
    //   Toast.show("on stop");
    //   console.log('[INFO] BackgroundGeolocation service has been stopped');
    // });

    // BackgroundGeolocation.on('authorization', (status) => {
    //   Toast.show("on start");
    //   console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
    //   if (status !== BackgroundGeolocation.AUTHORIZED) {
    //     // we need to set delay or otherwise alert may not be shown
    //     setTimeout(() =>
    //       Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
    //         { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
    //         { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
    //       ]), 1000);
    //   }
    // });

    // BackgroundGeolocation.on('background', () => {
    //   // BackgroundGeolocation.on('location', (location) => {
    //   //   var xhr = new XMLHttpRequest();
    //   //   xhr.open('POST', 'http://192.168.1.15:3333/fail');
    //   //   xhr.setRequestHeader('Content-Type', 'application/json');
    //   //   xhr.send(JSON.stringify(location));

    //   // });

    //   //       const ENDPOINT = "http://192.168.1.15:3333";

    //   // const socket = socketIOClient(ENDPOINT);
    //   Toast.show("on background");
    //   console.log('[INFO] App is in background');



    // });

    // BackgroundGeolocation.on('foreground', () => {
    //   Toast.show("on foreground");

    //   console.log('[INFO] App is in foreground');
    // });

    // BackgroundGeolocation.on('abort_requested', () => {
    //   console.log('[INFO] Server responded with 285 Updates Not Required');

    //   // Here we can decide whether we want stop the updates or not.
    //   // If you've configured the server to return 285, then it means the server does not require further update.
    //   // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
    //   // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    // });

    // BackgroundGeolocation.on('http_authorization', () => {
    //   console.log('[INFO] App needs to authorize the http requests');
    // });

    // BackgroundGeolocation.checkStatus(status => {
    //   console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
    //   console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
    //   console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

    //   // you don't need to check status before start (this is just the example)
    //   if (!status.isRunning) {
    //     BackgroundGeolocation.start(); //triggers start on start event
    //   }
    // });

    // // you can also just start without checking for status
    // BackgroundGeolocation.start();
 
    setTimeout(()=>{
      console.log("configer finsh")
    RNLocation.configure({
      desiredAccuracy: {
       ios: "best",
       android: "highAccuracy"
     },
     // Android only
     distanceFilter: this.props.config.config.distanceFilter, // Meters
    androidProvider: this.props.config.config.androidProvider,
   interval: this.props.config.config.interval, // Milliseconds
   fastestInterval: this.props.config.config.fastestInterval, // Milliseconds
   maxWaitTime: this.props.config.config.maxWaitTime, // Milliseconds
     // iOS Only
     // activityType: "other",
     // allowsBackgroundLocationUpdates: false,
     // headingFilter: 1, // Degrees
     // headingOrientation: "portrait",
     // pausesLocationUpdatesAutomatically: false,
     // showsBackgroundLocationIndicator: false,
   })
  },200)

    

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
  UNSAFE_componentWillMount() {
    
    //   RNLocation.configure({
    //     desiredAccuracy: {
    //      ios: "best",
    //      android: "highAccuracy"
    //    },
    //    // Android only
    //    distanceFilter: this.props.config.config.distanceFilter, // Meters
    //   androidProvider: this.props.config.config.androidProvider,
    //  interval: this.props.config.config.interval, // Milliseconds
    //  fastestInterval: this.props.config.config.fastestInterval, // Milliseconds
    //  maxWaitTime: this.props.config.config.maxWaitTime, // Milliseconds
    //    // iOS Only
    //    // activityType: "other",
    //    // allowsBackgroundLocationUpdates: false,
    //    // headingFilter: 1, // Degrees
    //    // headingOrientation: "portrait",
    //    // pausesLocationUpdatesAutomatically: false,
    //    // showsBackgroundLocationIndicator: false,
    //  })
  
  
      
 
    // RNLocation.requestPermission({
    //   ios: "whenInUse",
    //   android: {
    //     detail: "fine",
    //     rationale: {
    //       title: "Location permission",
    //       message: "We use your location to demo the library",
    //       buttonPositive: "OK",
    //       buttonNegative: "Cancel"
    //     }
    //   }
    // }).then(granted => {
    //   if (granted) {
    //     this._startUpdatingLocation();
    //   }
    // });
  }

  _startUpdatingLocation = async () => {
    await RNLocation.subscribeToLocationUpdates(
      locations => {

        if (this.props.sign.loading !== true && this.props.sign.token !== null) {

          let token = this.props.sign.token;
          DeviceInfo.getBatteryLevel().then(batteryLevel => {
            this.context.emit("updateTrafficLoc",


              { locations, batteryLevel, token,config:this.props.config }

            )
            this.setState({ location: locations[0] })
          });
          this.setState({config:this.props.config})
console.log("my love @@@@@#@@#@#!@#@$35 ",this.props.config)
console.log("my hate @@@@@#@@#@#!@#@$35 ",this.state.config)

          Toast.show('This is a toast.' + locations[0].latitude + "  " + locations[0].longitude + " " + locations[0].speed);

          console.log('on socket ', locations)
          this.setState({ location: locations[0] });
        } else {
        }
      }
    );
  };

  _stopUpdatingLocation = () => {
    this.locationSubscription && this.locationSubscription();
    this.setState({ location: null });
  };
  _getCurrentLocation = () => {
    //  console.log("click")
    RNLocation.subscribeToLocationUpdates(locations => {
      {
        Alert.alert("location")
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


  render() {

    const Drawer = createDrawerNavigator();
    const Stack = createStackNavigator();
    const remove = () => this.props.signIn()
    return (
      <Drawer.Navigator drawerContent={p => <DrawerContent {...p} signout={remove} />}>
        <Drawer.Screen name="Home" component={MainTabScreen} />
      </Drawer.Navigator>
    )
  }


}
const mapStateToProps = state => ({
  config:state.locationConfig,
  sign: state.trueSignin
});
const mapDispatchToProps = (dispatch) => {
  return {
    saveLocationconfigs:(data)=>dispatch(saveLocationconfig(data)),

    signIn: () => dispatch(removeUserToken()),
    getOnlineUser: () => dispatch(fetchOnlineUser())
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App)