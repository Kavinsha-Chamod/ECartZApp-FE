import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {useWindowDimensions} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';
import CustomBtn from '../components/CustomBtn';
import { logout } from '../middlewares/api';
import { useNavigation } from '@react-navigation/native';


export default function AccountScreen() {
  const styles = useStyle();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logout();
    navigation.navigate('LoginScreen');
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}></View>
        <View style={styles.content}></View>
        <View style={styles.footer}>
          <CustomBtn buttonText={'Logout'} buttonFunction={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
    header: {
      flex: 1,
      top: hp(5),
    },
    content: {
      flex: 2,
      justifyContent: 'center',
    },
    footer: {
      flex: 1,
      justifyContent: 'center',
    },
  });
}
