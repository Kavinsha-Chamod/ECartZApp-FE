import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const CustomBtn = ({ buttonText, buttonFunction }) => {
  const [isPressed, setIsPressed] = useState(false);



  return (
    <Pressable
      onPress={buttonFunction}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onFocus={() => setIsPressed(true)}
      style={({ pressed }) => [
        styles.LoadinBtnContainer,
        pressed || isPressed ? styles.pressed : null,
      ]}
    >
      <Text style={styles.LoadinBtnStyle}>{buttonText}</Text>
    </Pressable>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  LoadinBtnContainer: {
    width: wp(80),
    height: hp(7),
    backgroundColor: '#7CBF41',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  LoadinBtnStyle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Amaranth-Bold',
  },
  pressed: {
    backgroundColor: 'darkgreen', 
  },
});
