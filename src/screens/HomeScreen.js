import { View, Text, useWindowDimensions, SafeAreaView, StatusBar, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { logout } from '../middlewares/api';
import { useNavigation } from '@react-navigation/native';
import CustomBtn from '../components/CustomBtn';


export default function HomeScreen() {
  const styles = useStyle();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logout();
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={false} translucent={false} backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.header}>
       <Text>Header</Text>
      </View>
      <View style={styles.content}>
      <CustomBtn buttonText={'Logout'} buttonFunction={handleLogout} />
      </View>
      <View style={styles.footer}>

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
      flex: 4,
    },
    content: {
      flex: 4,
      justifyContent: 'center',
    },
    footer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
}