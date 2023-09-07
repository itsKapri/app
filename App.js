import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Userdata from './Components/Userdata';
import Map from './Components/Map';
// import Userdata from './Components/test';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name="Home"
    //       component={Userdata}
    //       options={{title: 'user'}}
    //     />
    //     <Stack.Screen name="Map" component={Map} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <>
    <Userdata/>
    </>
  );
};

export default App;