import {View, Text, StyleSheet, SafeAreaView, ScrollView, Image,useWindowDimensions} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';
import CustomBtn from '../components/CustomBtn';

export default function CartScreen() {
  const styles = useStyle();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}></View>
        <View style={styles.content}>
        <View style={styles.noConnectionContainer}>
          <Image style={styles.noConnectionIcon} source={require('../assets/images/ShoppingCart.png')} />
          <Text style={styles.noConnectionText}>Add items to start Purchase</Text>
          <Text style={styles.noConnectionSubText}>Once you add items from a store, your items will appear here.</Text>
          <CustomBtn buttonText={'Start Explore'} buttonFunction={''}/>
        </View>
        </View>
        <View style={styles.footer}></View>
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
    noConnectionContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noConnectionIcon: {
      width: wp(40),
      height: wp(40),
      marginBottom: 20,
      resizeMode: 'contain',
    },
    noConnectionText: {
      fontSize: wp(5),
      fontWeight: 'bold',
      color: '#333',
    },
    noConnectionSubText: {
      fontSize: wp(4),
      color: 'grey',
      textAlign: 'center',
      marginHorizontal: hp(4),
      marginTop: hp(2),
      marginBottom: hp(6),
    },
    footer: {
      flex: 1,
      justifyContent: 'center',
    },
  });
}
