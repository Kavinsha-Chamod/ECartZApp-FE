import {View, Text, StyleSheet, SafeAreaView, ScrollView, Image, ActivityIndicator, TouchableOpacity} from 'react-native';
import {useWindowDimensions} from 'react-native';
import React,{useState,useEffect} from 'react';
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';
import CustomBtn from '../components/CustomBtn';
import CustomLoading from '../components/CustomLoading';
import { logout, getUserData } from '../middlewares/api';
import { useNavigation } from '@react-navigation/native';


export default function AccountScreen() {
  const styles = useStyle();
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <CustomLoading /> ;
  }

  const handleLogout = async () => {
    await logout();
    navigation.replace('LoginScreen');
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
        <Image style={styles.logo} source={require('../assets/images/dashboardLogo.png')} />
        </View>
        <View style={styles.content}>
        {userData ? (
        <TouchableOpacity style={styles.accInfo}>
          <Image style={styles.userLogo} source={require('../assets/icons/User.png')} />
          <Text style={styles.accName}>{userData.name}</Text>
          </TouchableOpacity>
       
      ) : (
        <Text style={styles.accName}>No user data available</Text>
      )}
      </View>
      <View style={styles.table}>
      <TouchableOpacity style={styles.categoryContainer}>
            <Image style={styles.icon} source={require('../assets/icons/Vector.png')} />
            <Text style={styles.categoryText}>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryContainer}>
            <Image style={styles.icon} source={require('../assets/icons/Rewards.png')} />
            <Text style={styles.categoryText}>Rewards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryContainer}>
            <Image style={styles.icon1} source={require('../assets/icons/Accessibility.png')} />
            <Text style={styles.categoryText}>Accessibility</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryContainer}>
            <Image style={styles.icon} source={require('../assets/icons/Help.png')} />
            <Text style={styles.categoryText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryContainer}>
            <Image style={styles.icon} source={require('../assets/icons/Discount.png')} />
            <Text style={styles.categoryText}>Promotions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryContainer}>
            <Image style={styles.icon1} source={require('../assets/icons/PrivacyPolicy.png')} />
            <Text style={styles.categoryText}>Privacy policy</Text>
          </TouchableOpacity>
      </View>
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
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      margin: wp(4),
    },
    logo: { 
      width: wp(50),
      height: hp(10),
    },
    userLogo: {
      width: wp(12),
      height: hp(6),
      marginRight: wp(2),
    },
    content: {
      flex: 2,
      justifyContent: 'center',
    },
    accInfo: {
      flexDirection: 'row',
      borderWidth: 2,
      borderColor: '#7CBF41',
      borderRadius: wp(6),
      width: wp(92),
      height: hp(8),
      padding: wp(4),
      justifyContent: 'center',
      alignItems: 'center',
      bottom: hp(8),
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    accName: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    categoryContainer: {
      width: wp(42),
      height: hp(10),
      margin: hp(1),
      backgroundColor: '#EEEEEE',
      padding: wp(3),
      borderRadius: hp(1),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    categoryText: {
      fontSize: 16,
      fontFamily: 'Poppins',
      color: '#333',
    },
    table: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginLeft: wp(3),
      marginRight: wp(3),
      bottom: hp(12),
    },
    icon: {
      width: wp(8),
      height: wp(8),
      resizeMode: 'contain',
      marginRight: wp(2),
    },
    icon1: {
      width: wp(8),
      height: wp(8),
      marginRight: wp(2),
    },
    footer: {
      flex: 1,
      justifyContent: 'center',
    },
  });
}
