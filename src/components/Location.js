import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const getCurrentLocation = async (position) => {
      // console.log('Location fetched successfully');
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      

      // Perform reverse geocoding
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDYCqdAgqaxjCD4_jzrCj_QmEKV-hVFAHY`
        );
        const address = response.data.results[0].formatted_address;
        setAddress(address);
        
      } catch (geocodeError) {
        // console.log('Error during reverse geocoding', geocodeError);
      }
    };

    const handleError = (error) => {
      console.error('Error getting location', error);
      setError('Error getting location');
    };

    const watchId = Geolocation.watchPosition(
      getCurrentLocation,
      handleError,
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 10 }
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  const styles = useStyle();
  return (
    <View style={styles.container}>
      <Icon name="location-dot" size={20} color='#7CBF41' />
      {address ? (
        <Text style={styles.Address}>{address}</Text>
      ) : (
        <Text style={styles.Address}>Fetching location...</Text>
      )}
      {error && (
        <Text>Error: {error}</Text>
      )}
    </View>
  );
};
function useStyle(){
  const {width, height} = useWindowDimensions();
  return StyleSheet.create({
    container:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: hp(10),
      width: wp(100),
    },
    Address:{
      fontWeight:'bold',
      color:'#000000',
      marginLeft:hp(1)
    }
  })
}
  

export default LocationComponent;
