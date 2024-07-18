import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Animated, TouchableOpacity,useWindowDimensions } from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CustomTextField = ({
  placeholder,
  value,
  secureTextEntry,
  onChangeText,
  customTextFieldStyle,
  inlineStyle,
  editable,
  autoCapitalize,
  onFocus,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const translateY = useState(new Animated.Value(value ? -18 : 12))[0];

  useEffect(() => {
    movePlaceholder();
  }, [isFocused, value]);

  const handleBlur = () => setIsFocused(false);

  const movePlaceholder = () => {
    Animated.timing(translateY, {
      toValue: isFocused || value ? -12 : 8,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleChangeText = (inputText) => {
    onChangeText(inputText);
    movePlaceholder();
  };

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };
  const styles = useStyle();
  return (
    <View style={[styles.textContainer, inlineStyle]}>
      <Animated.Text
        style={[
          styles.placeholder,
          {
            transform: [{ translateY }],
            color: isFocused || value ? '#9E9E9E' : '#9E9E9E',
          },
        ]}
      >
        {placeholder}
      </Animated.Text>
      <TextInput
        value={value}
        placeholder={''}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={editable}
        autoCapitalize={autoCapitalize}
        secureTextEntry={isSecure}
        style={[
          styles.textInput,
          customTextFieldStyle,
        ]}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeIcon}>
          <Icon name={isSecure ? 'eye-slash' : 'eye'} size={16} color="#9E9E9E" />
        </TouchableOpacity>
      )}
    </View>
  );
};

function useStyle() {
  const {width, height} = useWindowDimensions();
 return StyleSheet.create({
  textContainer: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    position: 'relative', 
  },
  textInput: {
    width: wp(80) ,
    overflow: 'hidden',
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Popins-Regular',
    paddingTop: 20, 
    borderBottomWidth: 1,
  },
  placeholder: {
    position: 'absolute',
    left: 20, 
    paddingTop: 16,
    fontSize: 16,
    fontFamily: 'Popins-Regular',
  },
  eyeIcon: {
    position: 'absolute',
    right: wp(8),
    top: hp(3.5),
  },
});
}

export default CustomTextField;
