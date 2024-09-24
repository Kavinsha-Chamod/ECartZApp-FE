import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Greeting from '../components/Greeting';
import LocationComponent from '../components/Location';
import PosterCarousel from '../components/PromotionCarousel';
import Icon from 'react-native-vector-icons/Feather';

export default function HomeScreen({ setCurrentScreen }) {
  const navigation = useNavigation();
  const styles = useStyle();
  const [isConnected, setIsConnected] = useState(true);
  const [pressedButton, setPressedButton] = useState(null); // Track which button is pressed

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!isConnected) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.noConnectionContainer}>
          <Icon
            name="wifi-off"
            size={wp(20)}
            color="#7CBF41"
            style={styles.noConnectionIcon}
          />
          <Text style={styles.noConnectionText}>No internet connection</Text>
          <Text style={styles.noConnectionSubText}>
            Your internet connection is currently not available. Please check or
            try again.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.headLogo}>
          <Image
            style={styles.logo}
            source={require('../assets/images/dashboardLogo.png')}
          />
        </View>
        <View style={styles.header}>
          <TouchableOpacity
            style={[
              styles.categoryContainer,
              pressedButton === 'SuperMarket' && { backgroundColor: '#7CBF41' },
            ]}
            onPressIn={() => setPressedButton('SuperMarket')}
            onPressOut={() => setPressedButton(null)}
            onPress={() => setCurrentScreen('SuperMarket')}
          >
            <Text style={styles.categoryText}>Supermarket</Text>
            <Image
              style={styles.icon}
              source={require('../assets/images/supermarket.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryContainer,
              pressedButton === 'Pharmacy' && { backgroundColor: '#7CBF41' }, 
            ]}
            onPressIn={() => setPressedButton('Pharmacy')}
            onPressOut={() => setPressedButton(null)}
            onPress={() => setCurrentScreen('Pharmacy')}
          >
            <Text style={styles.categoryText}>Pharmacy</Text>
            <Image
              style={styles.icon}
              source={require('../assets/images/pharmacy.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryContainer,
              pressedButton === 'Stationary' && { backgroundColor: '#7CBF41' },
            ]}
            onPressIn={() => setPressedButton('Stationary')}
            onPressOut={() => setPressedButton(null)}
            onPress={() => setCurrentScreen('Stationary')}
          >
            <Text style={styles.categoryText}>Stationary</Text>
            <Image
              style={styles.icon}
              source={require('../assets/images/stationary.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryContainer,
              pressedButton === 'Alcohol' && { backgroundColor: '#7CBF41' },
            ]}
            onPressIn={() => setPressedButton('Alcohol')}
            onPressOut={() => setPressedButton(null)}
            onPress={() => setCurrentScreen('Alcohol')}
          >
            <Text style={styles.categoryText}>Alcohol</Text>
            <Image
              style={styles.icon}
              source={require('../assets/images/alcohol.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryContainer,
              pressedButton === 'Gift' && { backgroundColor: '#7CBF41' },
            ]}
            onPressIn={() => setPressedButton('Gift')}
            onPressOut={() => setPressedButton(null)}
            onPress={() => setCurrentScreen('Gift')}
          >
            <Text style={styles.categoryText}>Gift</Text>
            <Image
              style={styles.icon}
              source={require('../assets/images/gift.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryContainer,
              pressedButton === 'Beauty' && { backgroundColor: '#7CBF41' },
            ]}
            onPressIn={() => setPressedButton('Beauty')}
            onPressOut={() => setPressedButton(null)}
            onPress={() => setCurrentScreen('Beauty')}
          >
            <Text style={styles.categoryText}>Beauty</Text>
            <Image
              style={styles.icon}
              source={require('../assets/images/beauty.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.categoryContainer,
              styles.fullWidthContainer,
              pressedButton === 'Events' && { backgroundColor: '#7CBF41' },
            ]}
            onPressIn={() => setPressedButton('Events')}
            onPressOut={() => setPressedButton(null)}
            onPress={() => setCurrentScreen('Events')}
          >
            <Text style={styles.categoryText}>Events</Text>
            <Image
              style={styles.icon}
              source={require('../assets/images/event.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <View style={styles.locationContainer}>
            <LocationComponent />
          </View>
          <PosterCarousel />
          <View style={styles.profileContainer}>
            <Greeting />
          </View>
        </View>
        <View style={styles.footer}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

function useStyle() {
  const {width, height} = useWindowDimensions();
  return StyleSheet.create({
    safeArea: {
      flex: 1,
    },
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: wp(4),
      marginRight: wp(4),
    },
    headLogo: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: hp(2),
    },
    logo: {
      width: wp(50),
      height: hp(10),
    },
    categoryContainer: {
      width: wp(45),
      marginBottom: hp(1),
      backgroundColor: '#EEEEEE',
      padding: wp(3),
      borderRadius: hp(1),
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    fullWidthContainer: {
      width: wp(100) - wp(8),
      justifyContent: 'center',
    },
    categoryText: {
      fontSize: wp(4),
      fontWeight: 'bold',
      fontFamily: 'Poppins',
      color: '#333',
      marginRight: wp(2),
    },
    icon: {
      width: wp(8),
      height: wp(8),
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    locationContainer: {
      height: hp(8),
      width: wp(90),
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileContainer: {
      width: width - 40,
      height: hp(15),
      borderRadius: wp(2),
      padding: 15,
      backgroundColor: '#EEEEEE',
    },
    footer: {
      flex: 1,
      justifyContent: 'center',
    },
    noConnectionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noConnectionIcon: {
      width: wp(20),
      height: wp(20),
      marginBottom: 20,
    },
    noConnectionText: {
      fontSize: wp(5),
      fontWeight: 'bold',
      color: '#333',
    },
    noConnectionSubText: {
      fontSize: wp(4),
      color: 'grey',
      textAlign: 'center',
      marginHorizontal: hp(4),
    },
  });
}
