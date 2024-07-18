import { View, Text, useWindowDimensions, SafeAreaView, StatusBar, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import LoginForm from '../screens/LoginForm';
import RegisterForm from '../screens/RegisterForm';

export default function LoginScreen() {
  const styles = useStyle();
  const [activeTab, setActiveTab] = useState('Login');

  const handleTabPress = tab => {
    setActiveTab(tab);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={false} translucent={false} backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
        <Image style={styles.logoImg} source={require('../assets/images/logo.png')}/>
        <View style={styles.navBar}>
        <TouchableOpacity onPress={() => handleTabPress('Login')}>
          <Text style={[styles.navText, activeTab === 'Login' && styles.activeTab]}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Register')}>
          <Text style={[styles.navText, activeTab === 'Register' && styles.activeTab]}>Register</Text>
        </TouchableOpacity>
        </View>
        </View>
        <View style={styles.content}>
            {activeTab === 'Login' && <LoginForm onTabPress={handleTabPress} />}
            {activeTab === 'Register' && <RegisterForm onTabPress={handleTabPress} />}
        </View>
        </ScrollView>
      
    </SafeAreaView>
  )
}
function useStyle() {
  const {width, height} = useWindowDimensions();
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#F2F2F2',
    },
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      position: 'relative',
      width: wp(100),
      height: hp(40),
      backgroundColor: '#FFFFFF',
      borderBottomRightRadius: 30,
      borderBottomLeftRadius: 30,
      elevation: 5,
    },
    logoImg: {
      width: wp(100),
      height: hp(30), 
    },
    navBar:{
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      top: hp(6),
    },
    navText:{
      fontSize: 16,
      color: '#000000',
      fontFamily: 'Poppins',
      paddingLeft: hp(2),
      paddingRight: hp(2),
      paddingBottom: hp(1),
    },
    activeTab: {
      color: '#000000',
      borderBottomWidth: 3,
      borderBottomColor: '#3DA34D',
    },
    content: {
      flex: 2,
      justifyContent: 'center',
    },
  });
}
  
  