 const locationConfigReducer = (state = {
  config:{
    distanceFilter: '', // Meters
     androidProvider: "",
    interval: '', // Milliseconds
    fastestInterval: '', // Milliseconds
    maxWaitTime: '', // Milliseconds
  }
      
}, action) => {
    switch (action.type) {
        case 'CHANGE_LOCATION_CONFIG':
            console.log("for get location update ",action.data )
            let configs=JSON.parse(action.data)
            return { ...state, 
              config:configs };
    
        default:
            return state;
    }
};

export default locationConfigReducer
 



// case 'CHANGE_LOCATION_CONFIG':
//       console.log("for get location update ", action.data)
//       return {
//         ...state, 
//         distanceFilter: action.data.distanceFilter,
//         androidProvider: action.data.androidProvider,
//         interval: action.data.interval,
//         fastestInterval:action.data.fastestInterval,
//         maxWaitTime:action.data.maxWaitTime
//       };












 