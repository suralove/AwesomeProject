import React, { Component, useState ,useEffect,useContext} from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image, Linking } from 'react-native';
// import MapView from 'react-native-maps';  
import MapView, { Marker, Callout, CalloutSubview } from 'react-native-maps';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ChatUi from "./chat/ChatUi"
import OnlineUser from "./chat/OnlineUser"
import MapViewDirections from 'react-native-maps-directions';
import { Button, Card, ListItem, Icon, Header, Overlay } from 'react-native-elements';
import SocketContext from '../../SocketContext'



const origin = { latitude: 7.013191, longitude: 39.9746573 };
const destination = { latitude: 7.0128521, longitude: 39.9773163 };
const Tab = createMaterialBottomTabNavigator();
const OverlayExample = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Button title="Open Overlay" onPress={toggleOverlay} />

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>Hello from Overlay!</Text>
      </Overlay>
    </View>
  );
};
export default class App extends Component {
  render() {
    return (

      <Tab.Navigator>
        <Tab.Screen name="MapUi" component={MapUi} />

        <Tab.Screen name="OnlineUser" component={OnlineUser} />

      </Tab.Navigator>


    );
  }
}
// function MapUi(props) {
//   const socket = useContext(SocketContext)
//   let [detailView, setDetailView] = useState(true)
//   const [marker, setMarker] = useState([])
//   const users = [
//     {
//       name: 'brynn',
//       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
//     },

//   ]
//   let p1={accuracy: 1625,
//     altitude: 0,
//     altitudeAccuracy: 0,
//     course: 90,
//     courseAccuracy: 0,
//     fromMockProvider: false,
//     latitude: 7.0132719,
//     longitude: 39.9747545,
//     speed: 0,
//     speedAccuracy: 0,
//     timestamp: 1601339828629}
// //  const  getData = () => {
// //   socket.on("updatelocation", (data) => {
// //       let array = marker
// //       let markerss = array.filter(function (i) {
// //         console.log("fillter map ", i)
// //         return i.userId !== data.userId;
// //       });
// //      setMarker( [...markerss, data] );
// //     })
// //   }
// //   useEffect(()=>{
// //     // console.log("surafel marker ",marker)
// //     socket.on("updatelocation", (data) => {
      
// //       let array = marker
// //       let markerss = array.filter(function (i) {
// //         // console.log("fillter map ", i)
// //         return i.userId !== data.userId;
// //       });
// // // setMarker(data)
// // // console.log("changede ",markerss)
// //      setMarker(  [ ...markerss,data]  );
// //     //  console.log("marker @@@" ,marker)
// //     })
// //     // console.log("marker @@@" ,marker)
// //   },[marker])
//   const DetailScreen = () => {
//     return (
//       <View>
//         <Card>

//           <View style={{ width: 30, height: 35 }}>
//             <Button
//               onPress={() => {
//                 setDetailView(true)
//               }}
//               containerStyle={styles.buttonStyle}
//               buttonStyle={{
//                 backgroundColor: 'red'
//               }}
//               icon={
//                 <Icon
//                   name="clear"
//                   size={15}
//                   color="white"
//                 />
//               }

//             /></View>
//           <Card.Divider />
          
//           <Text style={{ marginBottom: 10 }}>
//             The idea with React Native Elements is more about component structure than actual design.
//     </Text>

//           <View style={{ flexDirection: 'row' }}>

//             <Button
//               icon={
//                 <Icon
//                   name="chat"
//                   size={25}
//                   color="green"
//                 />
//               }
//               type="outline"
//             />

//             <Button
//               containerStyle={styles.callButton}
//               icon={
//                 <Icon
//                   name="phone"
//                   size={25}
//                   color="green"
//                 />
//               }
//               type="outline"
//               onPress={() => { Linking.openURL('tel:0931003365'); }}
//             />

//           </View>
//         </Card>
//       </View>
//     )
//   }

//   return (<View style={styles.MainContainer}>

//     <MapView
//       style={styles.mapStyle}
//       showsUserLocation={false}
//       zoomEnabled={true}
//       zoomControlEnabled={true}
//       initialRegion={{
//         latitude: 7.013191,
//         longitude: 39.9746573,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       }}>

// {
//   marker.map((i)=>{
//     console.log("inside ",i)
//     return(
     
//       <MapView.Marker coordinate={{
//         latitude: i.latitude, longitude: i.longitude, latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421
//       }}
//         onPress={() => setDetailView(false)}

//       >
//         <MapView.Callout>
//           <Card containerStyle={{ padding: 0 }} onPress={() => setDetailView(false)} >



//         <Text>surfel</Text>
//             <Card.Divider />
//           </Card>
//         </MapView.Callout>
//       </MapView.Marker>
//     )
//   })
// }

     

//     </MapView>
//     {detailView ? null : <DetailScreen />}
//   </View>
//   )
// }
class MapUi extends React.Component{

  constructor() {
    super();

    this.state = {
      markers: [],
      isOpen: false,
      userData:{}
    
    }

  }

  // for socket context
  static contextType = SocketContext;

  getData = () => {
    this.context.on("updatelocation", (data) => {
      let array = this.state.markers
      let markerss = array.filter(function (i) {
        console.log("fillter map ", i)
        return i.userId !== data.userId;
      });
      this.setState({ markers: [...markerss, data] });
    })
  }

  componentDidMount() {
    this.getData()


  }
 
  render(){

    const  DetailScreen = () => {
      return (
        <View>
          <Card>
          <View style={{ flexDirection: 'row' }}>

            {/* <View style={{ width: 30, height: 35 }}> */}
              <Button
                onPress={() => {
                  this.setState({ isOpen: false });
  
                }}
                containerStyle={styles.buttonStyle}
                buttonStyle={{
                  backgroundColor: 'red'
                }}
                icon={
                  <Icon
                    name="clear"
                    size={15}
                    color="white"
                  />
                }
  
              /></View>
            <Card.Divider />
            
            <Text style={{ marginBottom: 10 }}>{this.state.userData.latitude}
              The idea with React Native Elements is more about component structure than actual design.
      </Text>
  
            <View style={{ flexDirection: 'row' }}>
  
              <Button
            onPress={() =>{ 

            this.props.navigation.navigate('Chat',{
              userId:this.state.userData.userId,
              
            })
          }} 
                icon={
                  <Icon
                    name="chat"
                    size={25}
                    color="green"
                  />
                }
                type="outline"
              />
  
              <Button
                containerStyle={styles.callButton}
                icon={
                  <Icon
                    name="phone"
                    size={25}
                    color="green"
                  />
                }
                type="outline"
                onPress={() => { Linking.openURL('tel:0931003365'); }}
              />
  
            </View>
          </Card>
        </View>
      )
    }
    return(    
  <View style={styles.MainContainer}>

  <MapView
    style={styles.mapStyle}
    showsUserLocation={false}
    zoomEnabled={true}
    zoomControlEnabled={true}
    initialRegion={{
      latitude: 7.013191,
      longitude: 39.9746573,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}>

{
this.state.markers.map((i)=>{
  console.log("inside ",i)
  return(
   
    <MapView.Marker coordinate={{
      latitude: i.latitude, longitude: i.longitude, latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }}
      onPress={() => {this.setState({ isOpen: true })
    this.setState({userData:i})
    }}

    >
      <MapView.Callout>
        <Card containerStyle={{ padding: 0 }} onPress={() => setDetailView(false)} >



      <Text>surfel</Text>
          <Card.Divider />
        </Card>
      </MapView.Callout>
    </MapView.Marker>
  )
})
}

   

  </MapView>
  {this.state.isOpen ? <DetailScreen /> :null }
</View>
 
    )
 
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerContainer: {
    height: Platform.select({
      android: 50,
      default: 44,
    }),
  },
  buttonStyle: {
    left: "800%",
   aspectRatio:2/1
  },
  callButton: {
    left: 100,
  }
});  