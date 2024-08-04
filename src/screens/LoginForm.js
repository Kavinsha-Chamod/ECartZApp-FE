import { View, Text, useWindowDimensions, SafeAreaView, Alert, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import CustomTextField from '../components/CustomTextField';
import CustomBtn from '../components/CustomBtn';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLoading from '../components/CustomLoading';
import { login } from '../middlewares/api';
import analytics from '@react-native-firebase/analytics';

export default function LoginForm({ onTabPress }) {
  const styles = useStyle();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  const checkLoggedInStatus = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    if (userToken) {
      navigation.replace('Dashboard');
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await login(email, password);
      await analytics().logEvent('login', {
        method: 'email',
        email: email,
      });
      navigation.replace('Dashboard');
    } catch (error) {
      Alert.alert('Error', error || 'Something went wrong');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const forgotPasswordPress = () => {
    navigation.navigate('ResetPwdScreen');
  }
  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
        <View style={styles.loadingContainer}>

        {loading && <CustomLoading />}
        </View>
        <CustomTextField
            placeholder={"Email address"}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <CustomTextField
            placeholder={"Password"}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          <View style={styles.textStyle1}>
          <View style={styles.txtContainer}>

           <Text style={styles.textStyle}>Forgot Password?</Text>
            <TouchableOpacity onPress={forgotPasswordPress}>
              <Text style={styles.signinLinkStyle}> Reset Now</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.txtContainer}>
           <Text style={styles.textStyle}>Don't have an Account?</Text>
            <TouchableOpacity onPress={() => onTabPress('Register')}>
              <Text style={styles.signinLinkStyle}> Create an Account</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btnContainer}>
        <CustomBtn buttonText={'Login'} buttonFunction={handleLogin} />
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
    },
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    header:{
      flex: 1,
      top: hp(5),
    },
    loadingContainer:{
      bottom: hp(15),
    },
    textStyle1:{
      flex: 1,
      flexDirection:'colunm',
      marginTop: 10,
    },
    textStyle:{
      fontSize: 16,
      color: '#000000',
      fontFamily: 'Poppins',
      paddingLeft: 20,
      marginBottom: 10,
    },
    signinLinkStyle:{
      fontSize: 16,
      color: '#7CBF41',
      fontFamily: 'Poppins',
    },
    txtContainer:{ 
      flexDirection:'row',
    },
    btnContainer:{
      marginTop: hp(5),
      marginBottom: hp(10),
    }
  });
}