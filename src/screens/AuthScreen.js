 
import React,{useEffect,useContext} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import  Spinner from "react-native-spinkit"
import socketIOClient from "socket.io-client";

import {
    ActivityIndicator,
    Text,
    Button,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
  import Home from  "./HomeScreen"
 import Login from "./LoginScreen"
 import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { getUserToken ,removeUserToken,getLocationConfig,saveLocationconfig} from "../../Action/index";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './DrawerContent';
import ChatUi from "./chat/ChatUi"
import Icon from 'react-native-vector-icons/FontAwesome';
import SocketContext from "../../SocketContext"
const Drawer = createDrawerNavigator();
const ENDPOINT = "http://192.168.1.15:3333";
const socket = socketIOClient(ENDPOINT);

const AuthLoadingScreen =(props) =>{
//  const [token ,setToken]=React.useState(null)
 const [isLoading,setisLoading]=React.useState(true)

//  waiting for aynstorage 
 useEffect(() => {
  
   console.log("cofigration ",props.config)
   let config={
    distanceFilter: 0, // Meters
     androidProvider: "auto",
    interval: 500, // Milliseconds
    fastestInterval: 100, // Milliseconds
    maxWaitTime: 100, // Milliseconds
  }
  // props.saveLocationconfigs(JSON.stringify(config))
   setTimeout(()=>{
    
    props.getLocationconfig();
    props.getUserTokens();
    setisLoading(false)

   },3000)
  } ,[])
    
    console.log(props)
  const remove=()=>props.signOut()


        const  Stack=createStackNavigator();
 if(isLoading){
    
return (
<View style={styles.container}>
{/* <ActivityIndicator
    animating={true}
    color="#3d5afe
    "
    style={{height: 80, marginTop: 10}}
    size="large"/>  
      <StatusBar barStyle="default" /> */}
      <Spinner   isVisible={true} size={100} type="Wave" color='#f50057'/>

</View>)
 }else{


    console.log("passed ",props.token)
    if(props.token.token!==null&&props.token.isLoading!==true){
    
        console.log("any error",props.token)
  return( 
  
    //  <Drawer.Navigator drawerContent={p => <DrawerContent {...p} signout={remove} />}>
    <SocketContext.Provider value={socket}>

 <Stack.Navigator >
            <Stack.Screen name="Home"   component={Home}  />
             <Stack.Screen
          name="Chat"
           
          component={ChatUi}
       
        />
     </Stack.Navigator>
     </SocketContext.Provider>
        // </Drawer.Navigator> 
   
  )
    }else{
       
  return   (  <Stack.Navigator>
       <Stack.Screen name="SignIn" component={Login} options={{headerShown: true}}   />
      </Stack.Navigator>)
       
    }
 }
         
           
 
         
    }
 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const mapStateToProps = state => ({
    token: state.trueSignin,
    config:state.locationConfig,

});


const mapDispatchToProps = dispatch => {
  return {
    saveLocationconfigs:(data)=>dispatch(saveLocationconfig(data)),
    getLocationconfig:()=>dispatch(getLocationConfig()),
    getUserTokens: () => dispatch(getUserToken()),
    signOut: () => dispatch(removeUserToken())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);