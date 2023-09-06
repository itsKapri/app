import React from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

const App = () => {
  const mumbaiCoordinates = {
    latitude: 19.076,
    longitude: 72.8777,
  };
  const andheriCoordinates = {
    latitude: 19.1364,
    longitude: 72.8296,
  };

  const coordinates = [mumbaiCoordinates, andheriCoordinates]; // Array of coordinates for the polyline

  const StartRide = () => {
    Alert.alert(
      "Ride Started",
      "The Ride with Bus driver ${Driver0} will start with ${bus}"
    );
  };

  return (
    <View style={styles.container}>
    
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: mumbaiCoordinates.latitude,
          longitude: mumbaiCoordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={mumbaiCoordinates}
          title="Mumbai"
          description="The financial capital of India"
        />

        <Marker
          coordinate={andheriCoordinates}
          title="Andheri"
          description="A neighborhood in Mumbai"
        />

        <Polyline
          coordinates={coordinates}
          strokeColor="#3498db" // Line color
          strokeWidth={4} // Line width
        />
      </MapView>
      <Button
        onPress={StartRide} // Use onPress instead of onClick
        title="Start Ride"
        color="magenta" // Color should be a string
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height:725,
    width:500
  },
});

export default App;
