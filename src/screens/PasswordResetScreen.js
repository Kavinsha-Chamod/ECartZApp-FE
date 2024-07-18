import { View, Text, useWindowDimensions, SafeAreaView, StatusBar, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomBtn from '../components/CustomBtn';
import CustomTextField from '../components/CustomTextField';
import { updatePassword } from '../middlewares/api';
import CustomLoading from '../components/CustomLoading';

export default function PasswordResetScreen({ route, navigation }) {
  const styles = useStyle();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { email } = route.params;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await updatePassword(email, password);
      Alert.alert('Success', 'Password updated successfully');
      navigation.navigate('LoginScreen');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={false} translucent={false} backgroundColor="transparent" barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Image style={styles.logoImg} source={require('../assets/images/logo.png')} />
          <View style={styles.navBar}>
            <Text style={styles.navText}>Password Reset</Text>
          </View>
        </View>
        <View style={styles.content}>
        {loading && <CustomLoading />}
          <CustomTextField
            placeholder={"New password"}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          <CustomTextField
            placeholder={"Re-Enter new password"}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry
          />
          <View style={styles.btnContainer}>
            <CustomBtn buttonText={'Confirm'} buttonFunction={handleSubmit} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function useStyle() {
  const { width, height } = useWindowDimensions();
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
    navBar: {
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      top: hp(6),
    },
    navText: {
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
    btnContainer: {
      marginTop: hp(20),
      marginBottom: hp(5),
    },
  });
}
