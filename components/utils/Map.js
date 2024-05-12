import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text,TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Location from 'expo-location';
import usePinList from '../Pins/usePinList';



const Map = () => {
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
   const pinsWithCoordinates = usePinList();
 const [selectedPin, setSelectedPin] = useState(null);
  const mapViewRef = useRef(null); 

    const formatDate = (dateString) => {
      console.log('datestring: ', dateString)
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };


 const handleMarkerPress = (pin) => {
    setSelectedPin(pin);
    console.log('selected pin: ', selectedPin)
  };

  const handleCloseCallout = () => {
    setSelectedPin(null);
  };


  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setPermissionDenied(true);
        setLoading(false);
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setPermissionDenied(true);
        setLoading(false);
      }
    };

    requestLocationPermission();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

   // Function to handle returning the map to the user's current location
  const returnToUserLocation = () => {
    if (userLocation) {
      mapViewRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  };


  return (
    <View style={styles.container}>
      {permissionDenied ? (
        <Text style={styles.permissionDeniedText}>Location permission denied. Please enable location services.</Text>
      ) : (
        <MapView
        ref={mapViewRef}
          style={styles.map}
          
          
          initialRegion={{
            latitude: userLocation ? userLocation.latitude : 37.78825, // Default latitude
            longitude: userLocation ? userLocation.longitude : -122.4324, // Default longitude
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
       
           {userLocation && (
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="User Location"
          >
            <MaterialIcons name="my-location" size={24} color="red" />
          </Marker>
        )}

             {pinsWithCoordinates.map((pin, index) => (   
          <Marker
            key={index}
            title={pin.meetupname} 
             onPress={() => handleMarkerPress(pin)}
            coordinate={{
              latitude: pin.coordinates.latitude,
              longitude: pin.coordinates.longitude,
            }}
          >
            <MaterialIcons name="location-on" size={24} color="blue" />
          </Marker> 
        ))}

           {selectedPin && (
           <Callout onPress={handleCloseCallout} tooltip style={styles.callout}>
              <View>
                <Text style={styles.calloutTitle}>{selectedPin.meetupname}</Text>
                <Text style={styles.calloutDescription}>{selectedPin.description}</Text>
          
              </View>
            </Callout>
      )}

         <TouchableOpacity style={styles.button} onPress={returnToUserLocation}>
        <MaterialIcons name="near-me" size={24} color="black" />
      </TouchableOpacity>

        </MapView>


      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '95%',


  },
  map: {
    width: '90%', // Set the width of the map to 70% of its parent container
   // aspectRatio: 1, // Maintain aspect ratio
    height: '95%',
    alignSelf: 'center', // Center the map horizontally
    marginHorizontal: '15%', // Add equal margins on the right and left
    marginTop: 5 ,// Maintain top margin
  
  },
  permissionDeniedText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
    button: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    elevation: 3,
  },
   callout: {
    width: 200,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 20,
    marginTop: 15,
    borderWidth: 1,
    borderColor: 'gray',
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 14,
  }
});

export default Map;
