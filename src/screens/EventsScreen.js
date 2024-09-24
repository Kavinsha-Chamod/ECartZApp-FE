import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {useWindowDimensions} from 'react-native';
import React from 'react';
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';

export default function EventsScreen() {
  const styles = useStyle();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}><Text>Events Screen</Text></View>
        <View style={styles.content}></View>
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
