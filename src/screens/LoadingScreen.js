import { View, Text, useWindowDimensions, SafeAreaView, StatusBar, StyleSheet, Image } from 'react-native'
import React from 'react'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import CustomBtn from '../components/CustomBtn';
import { useNavigation } from '@react-navigation/native';


export default function LoadingScreen() {
  const navigation = useNavigation();

  const getStarted = () => {
    navigation.navigate('LoginScreen');
  }
  const styles = useStyle();
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={false} translucent={true} backgroundColor="transparent" />
    <View style={styles.container}>
    <View style={styles.header}>
      <Image style={styles.loadingImg} source={require('../assets/images/loadingimg.png')}/>
    </View>
    <View style={styles.content}>
      <Image style={styles.logoImg} source={require('../assets/images/logo.png')}/>
    </View>
    <View style={styles.footer}>
      <CustomBtn buttonText={'Get Started'} buttonFunction={getStarted} />
    </View>
  </View>
    </SafeAreaView>
  )
}

function useStyle() {
  const {width, height} = useWindowDimensions();
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    header: {
      flex: 4,
    },
    loadingImg: {
      width: wp(100),
      height: hp(50),
    },
    content: {
      flex: 4,
      justifyContent: 'center',
    },
    logoImg: {
      width: wp(100),
      height: hp(50),
      top: hp(-5),
    },
    footer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
}
