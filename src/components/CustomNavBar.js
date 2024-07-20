import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

export default function CustomNavBar({ onTabPress, activeTab }) {
  const styles = useStyle();

  const getIconColor = (tabName) => (activeTab === tabName ? '#7CBF41' : '#000000');
  const getTextColor = (tabName) => (activeTab === tabName ? '#7CBF41' : '#000000');

  return (
    <View style={styles.header}>
    <TouchableOpacity onPress={() => onTabPress('HomeScreen')}>
    <View style={styles.IconContainer}>
      <Icon name="storefront-outline" size={30} color={getIconColor('HomeScreen')} />
      <Text style={[styles.IconTxt, { color: getTextColor('HomeScreen') }]}>Home</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onTabPress('Explore')}>
    <View style={styles.IconContainer}>
      <Icon2 name="manage-search" size={30} color={getIconColor('Explore')} />
      <Text style={[styles.IconTxt, { color: getTextColor('Explore') }]}>Explore</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onTabPress('Cart')}>
    <View style={styles.IconContainer}>
      <Icon name="cart-outline" size={30} color={getIconColor('Cart')} />
      <Text style={[styles.IconTxt, { color: getTextColor('Cart') }]}>Cart</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onTabPress('Favorite')}>
    <View style={styles.IconContainer}>
      <Icon name="heart-outline" size={30} color={getIconColor('Favorite')} />
      <Text style={[styles.IconTxt, { color: getTextColor('Favorite') }]}>Favorite</Text>
    </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onTabPress('Account')}>
    <View style={styles.IconContainer}>
      <Icon name="person-outline" size={30} color={getIconColor('Account')} />
      <Text style={[styles.IconTxt, { color: getTextColor('Account') }]}>Account</Text>
    </View>
    </TouchableOpacity>
    </View>
  )
}
function useStyle(){
  const {width, height} = useWindowDimensions();
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      height: hp(10),
      width: wp(100),
      backgroundColor: '#FFFFFF',
      borderTopWidth: hp(0.1),
      borderColor: 'grey',
    },
    IconContainer: {
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    IconTxt: {
      fontFamily: 'Poppins-Bold',
      color: '#000000',
      fontSize: 10,
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
