import React from 'react';
import { View, StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import LoadingDots from 'react-native-loading-dots';


const CustomLoading = ({ size = 20, colors = ['#fbcb05','#77bf3f','#51b948','#39a34b']}) => {
  return (
    <View style={styles.loadingContainer}>
      <LoadingDots size={size} colors={colors} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: hp(20),
    left: wp(30),
    width: wp(30),
    height: hp(10),
    padding: 10,
    alignContent: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});

export default CustomLoading;
