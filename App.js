import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, LogBox, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { enableScreens } from 'react-native-screens';
import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';
import OTPScreen from './src/screens/OTPScreen';
import PwdResetOTPScreen from './src/screens/PwdResetOTPScreen';
import HomeScreen from './src/screens/HomeScreen';
import ResetPwdScreen from './src/screens/ResetPwdScreen';
import PasswordResetScreen from './src/screens/PasswordResetScreen';
import CustomLoading from './src/components/CustomLoading';

enableScreens();
LogBox.ignoreLogs(['Setting a timer']);

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        setInitialRoute(userToken !== null ? 'HomeScreen' : 'LoadingScreen');
      } catch (error) {
        console.error('Failed to load user session:', error);
        setInitialRoute('LoginScreen');
      }
    };

    checkUserSession();
  }, []);

  if (initialRoute === null) {
    return (
      <View style={styles.loadingContainer}>
        <CustomLoading/>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="OTPScreen" component={OTPScreen} options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="PwdResetOTPScreen" component={PwdResetOTPScreen} options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="ResetPwdScreen" component={ResetPwdScreen} options={{ headerShown: false, animation: 'slide_from_right' }} />
          <Stack.Screen name="PasswordResetScreen" component={PasswordResetScreen} options={{ headerShown: false, animation: 'slide_from_right' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
