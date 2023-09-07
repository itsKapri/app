import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Location } from 'expo-location';

function Userdata({ navigation }) {
  const [location, setLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Location:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your location"
        value={location ? location.coords.latitude + ', ' + location.coords.longitude : ''}
        onChangeText={(text) => setLocation(text)}
      />
      {errorMsg && <Text>{errorMsg}</Text>}
      <Button
        title="Map"
        onPress={() => navigation.navigate('Map')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
  },
});

export default Userdata;

