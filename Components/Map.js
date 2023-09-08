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
  const calculateDistanceInMeters = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Radius of the Earth in meters
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in meters
    return distance.toFixed(2); // Return as a string with two decimal places
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
          // Check distance and trigger alert
          checkDistanceAndAlert(latitude, longitude);
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
  const mapViewRef = React.useRef(null);
  const checkDistanceAndAlert = (lat, lon) => {
    if (lat && lon) {
      const distance = calculateDistanceInMeters(
        fiexdloaction.latitude,
        fiexdloaction.longitude,
        lat,
        lon
      );
      if (distance < 2) {
        // Display an alert if the distance is less than 2 meters
        Alert.alert(
          "Alert",
          "You are within 2 meters of the fixed location.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
      }
    }
  };
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
          </Text>
        )}
        {/* Display the calculated distance between fixedlocation and current location */}
        {locationData && (
          <Text>
            Distance:{" "}
            {calculateDistanceInMeters(
              fiexdloaction.latitude,
              fiexdloaction.longitude,
              locationData.latitude,
              locationData.longitude
            )}{" "}
            meters
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
        <Button
          title="Check Distance"
          onPress={() => {
            checkDistanceAndAlert(
              locationData?.latitude,
              locationData?.longitude
            );
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
            {/* Your existing code for markers and polyline */}
          </MapView>
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