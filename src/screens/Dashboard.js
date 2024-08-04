import { View, Text, useWindowDimensions, SafeAreaView, StatusBar, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { logout } from '../middlewares/api';
import { useNavigation } from '@react-navigation/native';
import CustomNavBar from '../components/CustomNavBar';
import HomeScreen from './HomeScreen';
import SuperMarketScreen from './SuperMarketScreen';
import CartScreen from './CartScreen';
import FavoriteScreen from './FavoriteScreen';
import AccountScreen from './AccountScreen';

export default function Dashboard() {
  const styles = useStyle();
  const [currentScreen, setCurrentScreen] = useState('HomeScreen');


  const renderContent = () => {
    switch (currentScreen) {
      case 'HomeScreen':
        return <HomeScreen />;
      case 'Explore':
        return <SuperMarketScreen />;
      case 'Cart':
        return <CartScreen />;
      case 'Favorite':
        return <FavoriteScreen />;
      case 'Account':
        return <AccountScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const handleLogout = async () => {
    await logout();
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={false} translucent={false} backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>
          {renderContent()}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <CustomNavBar onTabPress={setCurrentScreen} activeTab={currentScreen} />
      </View>
    </SafeAreaView>
  );
}

function useStyle() {
  const { width, height } = useWindowDimensions();
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    scrollView: {
      flexGrow: 1,
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      width: wp(100),
      height: hp(10),
    },
    logo: { 
      width: wp(50),
      height: hp(10),
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: hp(10),
    },
    footer: {
      width: wp(100),
      height: hp(10),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#FFFFFF',
    },
  });
}
