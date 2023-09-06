import React from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import MapboxGL, { Marker } from "mapbox-gl";
import MapboxDirections from "@react-native-mapbox-directions/mapbox-directions";

MapboxGL.setAccessToken("pk.eyJ1Ijoic2F1bXlhcmFuamFuMTIzIiwiYSI6ImNrbWNhOTFxdTAwd3kyb3A1ejg4bWJvZzgifQ.ca-4KiendhcKMpkNx4DZLw");

const App = () => {
  const mumbaiCoordinates = [72.8777, 19.076];
  const andheriCoordinates = [72.8296, 19.1364];

  const StartRide = () => {
    Alert.alert(
      "Ride Started",
      "The Ride with Bus driver ${Driver0} will start with ${bus}"
    );
  };

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        styleURL={MapboxGL.StyleURL.Street}
        zoomLevel={10}
        centerCoordinate={mumbaiCoordinates}
      >
        <MapboxGL.Marker
          id="mumbai"
          coordinate={mumbaiCoordinates}
        />
        <MapboxGL.Marker
          id="andheri"
          coordinate={andheriCoordinates}
        />
        <MapboxDirections
          origin={mumbaiCoordinates}
          destination={andheriCoordinates}
          apiBaseUrl="https://api.mapbox.com/directions/v5"
          onRouteIndexChange={() => {}}
        />
      </MapboxGL.MapView>
      <Button
        onPress={StartRide}
        title="Start Ride"
        color="magenta"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default App;
