import { View, Text, useWindowDimensions, SafeAreaView, StatusBar, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import CustomTextField from '../components/CustomTextField';
import CustomBtn from '../components/CustomBtn';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { sendOtp } from '../middlewares/api';
import CustomLoading from '../components/CustomLoading';


export default function RegisterForm() {
  const styles = useStyle();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const validateName = (name) => {
  return /^[a-zA-Z]+$/.test(name);
  };
  const validateNumber = (number) => {
  return /^[0-9]+$/.test(number);
  };

  const handleRegister  = async () => {

  if (!name || name.length < 3) {
    Alert.alert('Error', 'Please enter a valid name');
    return;
  }
  if (!validateName(name)) {
    Alert.alert('Error', 'Special characters/ Numbers are not allowed in name');
    return;
  }
  if (!email || !validateEmail(email)) {
    Alert.alert('Error', 'Please enter a valid email address');
    return;
  }
  if (password !== confirmPassword) {
    Alert.alert('Error', 'Passwords do not match');
    return;
  }
  if (!number || !validateNumber(number) || number.length < 10) {
    Alert.alert('Error', 'Please enter a valid phone number');
    return;
  }
  if (!password || password.length < 6) {
    Alert.alert('Error', 'Password must be at least 6 characters long');
    return;
  }

  setLoading(true);

  try {
    await sendOtp(email);
    navigation.navigate('OTPScreen', { email, password, name, number });
    setName('');
    setEmail('');
    setNumber('');
    setPassword('');
    setConfirmPassword('');
  } catch (error) {
    Alert.alert('Error', error);
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
           {loading && <CustomLoading />}
        <CustomTextField
            placeholder={"Name"}
            value={name}
            onChangeText={text => setName(text)}
          />
          <View style={styles.loadingContainer}>
          </View>
        <CustomTextField
            placeholder={"Email address"}
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <CustomTextField
            placeholder={"Number"}
            value={number}
            onChangeText={text => setNumber(text)}
          />
          <CustomTextField
            placeholder={"Password"}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          <CustomTextField
            placeholder={"Confirm Password"}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry
          />
          <View style={styles.btnContainer}>
        <CustomBtn buttonText={'Register'} buttonFunction={handleRegister} />
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
    btnContainer:{
      marginTop: hp(3),
      marginBottom: hp(6),
    },
  });
}