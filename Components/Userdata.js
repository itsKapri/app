import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Polyline } from "react-native-maps";
const Userdata = ({ navigation }) => {
  const [locationData, setLocationData] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [locationSubscription, setLocationSubscription] = useState(null);

  const fiexdloaction = {
    latitude: 19.4593719,
    longitude: 72.8005249,
  };

  const startLocationTracking = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      // Start tracking location
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 0.5,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          setLocationData({ latitude, longitude });
        }
      );

      setIsTracking(true);
      setLocationSubscription(subscription);
    } catch (error) {
      console.error("Error while tracking location:", error);
    }
  };

  const stopLocationTracking = () => {
    if (locationSubscription) {
      locationSubscription.remove();
    }
    setIsTracking(false);
  };

  useEffect(() => {
    // Clean up when the component unmounts
    return () => {
      stopLocationTracking();
    };
  }, []);

  StatusBar.setHidden(true);

  const StartRide = () => {
    Alert.alert(
      "Ride Started",
      `The Ride with Bus driver ${Driver0} will start with ${bus}`
    );

    // Auto-zoom to the live location (red marker)
    if (locationData) {
      mapViewRef.current.animateToRegion({
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };

  const mapViewRef = React.useRef(null);

  return (
    <SafeAreaView>
      <View>
        {isTracking ? (
          <Text>Tracking Location...</Text>
        ) : (
          <Text>Location not being tracked</Text>
        )}
        {locationData && (
          <Text>
            Latitude: {locationData.latitude}, Longitude:{" "}
            {locationData.longitude}
            {console.log(
              `"latitude:"+${locationData.latitude},+ "longitude:"+${locationData.longitude}`
            )}
          </Text>
        )}
        <Button
          title={isTracking ? "Stop Ride" : "Start Ride"}
          onPress={() => {
            if (isTracking) {
              stopLocationTracking();
            } else {
              startLocationTracking();
            }
          }}
        />
        <View style={styles.container}>
          <MapView
            ref={mapViewRef}
            style={styles.map}
            initialRegion={{
              latitude: locationData?.latitude || 0,
              longitude: locationData?.longitude || 0,
              latitudeDelta: 19.4541,
              longitudeDelta: 72.8005,
            }}
          >
            {locationData && (
              <Marker
                coordinate={{
                  latitude: locationData.latitude,
                  longitude: locationData.longitude,
                }}
                title="Your Location"
                pinColor="red"
                // <Icon name="star" size={30} color="blue" />
              />
            )}

            {/* Green marker at Andheri West */}
            <Marker
              coordinate={fiexdloaction}
              title="Andheri West"
              pinColor="green" // Green color for the marker
            />

            {/* Polyline to connect the two markers */}
            <Polyline
              coordinates={[
                fiexdloaction,
                locationData
                  ? {
                      latitude: locationData.latitude,
                      longitude: locationData.longitude,
                    }
                  : fiexdloaction, // Use Andheri West if locationData is not available
              ]}
              strokeColor="#3498db" // Line color
              strokeWidth={4} // Line width
            />
          </MapView>
          {/* <Button
            onPress={StartRide}
            title="Start Ride"
            color="magenta"
          /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 600,
    width: 600,
  },
  map: {
    height: 750,
    width: 500,
  },
});

export default Userdata;
