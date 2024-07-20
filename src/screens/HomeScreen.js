import {View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image} from 'react-native';
import {useWindowDimensions} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';

export default function HomeScreen() {
  const styles = useStyle();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
      <TouchableOpacity style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Supermarket</Text>
        <Image style={styles.icon} source={require('../assets/images/supermarket.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Pharmacy</Text>
        <Image style={styles.icon} source={require('../assets/images/pharmacy.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Stationary</Text>
        <Image style={styles.icon} source={require('../assets/images/stationary.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Alcohol</Text>
        <Image style={styles.icon} source={require('../assets/images/alcohol.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Gift</Text>
        <Image style={styles.icon} source={require('../assets/images/gift.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Beauty</Text>
        <Image style={styles.icon} source={require('../assets/images/beauty.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.categoryContainer, styles.fullWidthContainer]}>
        <Text style={styles.categoryText}>Events</Text>
        <Image style={styles.icon} source={require('../assets/images/event.png')} />
      </TouchableOpacity>
      </View>
        <View style={styles.content}>


        </View>
        <View style={styles.footer}>

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
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: wp(4),
  },
    categoryContainer: {
    width: wp(45),
    marginBottom: hp(1),
    backgroundColor: '#EEEEEE',
    padding: wp(5),
    borderRadius: hp(1),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
    fullWidthContainer: {
    width: wp(100) - wp(8),
    justifyContent: 'center',
  },
    categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    color: '#333',
    marginRight: wp(2),
  },
    icon: {
    width: wp(10),
    height: wp(10),
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

