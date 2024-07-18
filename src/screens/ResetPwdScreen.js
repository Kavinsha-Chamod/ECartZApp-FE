import { View, Text, useWindowDimensions, SafeAreaView, StatusBar, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import CustomBtn from '../components/CustomBtn';
import { useNavigation } from '@react-navigation/native';
import CustomTextField from '../components/CustomTextField';
import { sendResetOtp } from '../middlewares/api';
import CustomLoading from '../components/CustomLoading';

export default function ResetPwdScreen() {
  const styles = useStyle();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);


  const navigation = useNavigation();

  const handleSubmit = async () => {
    setLoading(true);
    try{
      await sendResetOtp(email);
      navigation.navigate('PwdResetOTPScreen', {email});
     setEmail('');
    } catch (error) {
      Alert.alert('Error', error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  const handleResend = () => {
    console.log('Resend logic here');
    setTimer(60);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={false} translucent={false} backgroundColor="transparent" barStyle="dark-content"/>
      <ScrollView contentContainerStyle={styles.scrollView}>
    <View style={styles.header}>
    <Image style={styles.logoImg} source={require('../assets/images/logo.png')}/>
    <View style={styles.navBar}>
    <Text style={styles.navText}>Password Reset</Text>
    </View>
    </View>
    <View style={styles.content}>
    {loading && <CustomLoading />}
    <CustomTextField
            placeholder={"Enter your email address"}
            value={email}
            onChangeText={text => setEmail(text)}
          />
    <View style={styles.btnContainer}>
        <CustomBtn buttonText={'Submit'} buttonFunction={handleSubmit} />
    </View>
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
      borderBottomWidth: 3,
      borderBottomColor: '#3DA34D',
      fontFamily: 'Poppins',
      paddingLeft: hp(2),
      paddingRight: hp(2),
      paddingBottom: hp(1),
    },
    content: {
      flex: 4,
      justifyContent: 'center',
      paddingTop: hp(5),
    },
    textMsg: {
      fontSize: 16,
      color: '#606268',
      fontFamily: 'Poppins',
      textAlign: 'center',
    },
    timerText: {
      fontSize: 20,
      color: '#000000',
      fontFamily: 'Poppins-Bold',
      textAlign: 'center',
      marginTop: hp(4),
      padding: hp(2),
    },
    rectangle: {
      width: wp(10),
      height: hp(5),
      justifyContent: "center",
      backgroundColor: "#fff",
      borderRadius: 4,
      borderColor: "#7CBF41",
      borderWidth: 1,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      fontWeight: "bold",
      fontSize: 16,
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    CodeNum: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    txtContainer:{ 
      flexDirection:'row',
      marginTop: hp(3),
      justifyContent: 'center',
    },
    textStyle:{
      fontSize: 16,
      color: '#000000',
      fontFamily: 'Poppins',
    },
    signinLinkStyle:{
      fontSize: 16,
      color: '#7CBF41',
      fontFamily: 'Poppins',
    },
    btnContainer:{
      marginTop: hp(20),
      marginBottom: hp(5),
    },
  })
}