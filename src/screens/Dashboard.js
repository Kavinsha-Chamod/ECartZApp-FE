import { View, Text, useWindowDimensions, SafeAreaView, StatusBar, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { logout } from '../middlewares/api';
import { useNavigation } from '@react-navigation/native';
import CustomBtn from '../components/CustomBtn';
import CustomNavBar from '../components/CustomNavBar';
import HomeScreen from './HomeScreen';
import SuperMarketScreen from './SuperMarketScreen';
import CartScreen from './CartScreen';
import FavoriteScreen from './FavoriteScreen';
import AccountScreen from './AccountScreen';


export default function Dashboard() {
  const styles = useStyle();
  const [currentScreen, setCurrentScreen] = useState('Home');
  const navigation = useNavigation();

  const renderContent = () => {
    switch (currentScreen) {
      case 'Home':
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
      <View style={styles.header}>
       <Image style={styles.logo} source={require('../assets/images/dashboardLogo.png')} />
      </View>
      <View style={styles.content}>
      {renderContent()}
      </View>
      <View style={styles.footer}>
       <CustomNavBar onTabPress={setCurrentScreen} activeTab={currentScreen}/>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}
function useStyle(){
  const {width, height} = useWindowDimensions();
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center',

    },
    footer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
}