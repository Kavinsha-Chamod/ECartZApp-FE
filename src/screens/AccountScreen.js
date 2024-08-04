import {View, Text, StyleSheet, SafeAreaView, ScrollView, Image, ActivityIndicator} from 'react-native';
import {useWindowDimensions} from 'react-native';
import React,{useState,useEffect} from 'react';
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';
import CustomBtn from '../components/CustomBtn';
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
    return <ActivityIndicator size="large" color="#0000ff" />;
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
        <View>
          <Text style={styles.label}>Name: {userData.name}</Text>
          <Text style={styles.label}>Email: {userData.email}</Text>
          <Text style={styles.label}>Number: {userData.number}</Text>
        </View>
      ) : (
        <Text>No user data available</Text>
      )}
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
    content: {
      flex: 2,
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    footer: {
      flex: 1,
      justifyContent: 'center',
    },
  });
}
