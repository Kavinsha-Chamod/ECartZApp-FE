import { View, Text, useWindowDimensions, SafeAreaView, StatusBar, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import CustomBtn from '../components/CustomBtn';
import OTPTextInput from 'react-native-otp-textinput';
import { sendResetOtp, resetOtp } from '../middlewares/api';
import CustomLoading from '../components/CustomLoading';

export default function PwdResetOTPScreen({ route , navigation }) {
  const styles = useStyle();
  const [timer, setTimer] = useState(60);
  const { email } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try{
      await resetOtp(email, otp);
      navigation.navigate('PasswordResetScreen', {email, otp});
    }catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  const handleResend = () => {
    sendResetOtp(email)
    setTimer(60);
  }

  const hideEmail = (email) => {
    const atIndex = email.indexOf('@');
    const hiddenPart = email.slice(50, atIndex); 
    const visiblePart = email.slice(0, 2);
    const asterisks = '*'.repeat(atIndex - 2);
    const domain = email.slice(atIndex);

    return (
      <Text style={styles.textMsg}>
        Enter the code we sent to your mail{' '}
        <Text style={styles.bold}>{visiblePart + asterisks + hiddenPart}</Text>
        {domain}
      </Text>
    );
  };

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
    <Text style={styles.textMsg}>{hideEmail(email)}</Text>
    <Text style={styles.timerText}>{formatTime(timer)}</Text>
    <View style={styles.CodeNum}>
    <OTPTextInput handleTextChange={setOtp} inputCount={6} style={styles.OtpCode}/>
    </View>
    {timer === 0 && (
      <View style={styles.txtContainer}>
        <Text style={styles.textStyle}>I didn't receive any code.</Text>
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.signinLinkStyle}> RESEND</Text>
        </TouchableOpacity>
      </View>
    )}
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
    OtpCode: {
      width: wp(10),
      height: hp(5),
      margin: hp(1),
      paddingLeft: hp(2),
      justifyContent: "center",
      alignItems: "center",
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
    bold: {
      color: '#000000',
      fontWeight: 'bold',
    },
    signinLinkStyle:{
      fontSize: 16,
      color: '#7CBF41',
      fontFamily: 'Poppins',
    },
    btnContainer:{
      marginTop: hp(10),
      marginBottom: hp(5),
    },
  })
}