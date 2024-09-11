import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, useWindowDimensions, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getUserData } from '../middlewares/api';

export default function Greeting() {
  const [greeting, setGreeting] = useState('');
  const [userData, setUserData] = useState(null);
  const styles = useStyle();

  useEffect(() => {
    setGreetingMessage();

    const intervalId = setInterval(() => {
      setGreetingMessage();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  const setGreetingMessage = () => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting('Good Morning');
    } else if (hours < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  };

  return (
     <View>
     <Text style={styles.Text}>{greeting},</Text>
     {userData && <Text style={styles.accName}>{userData.name}</Text>}
     <View style={styles.line}></View>
     <Text style={styles.points}>Loyalty Points - [null]</Text>
    </View>
  );
}
function useStyle() {
  const { width } = useWindowDimensions();
  return StyleSheet.create({
    Text: {
      fontSize: wp(5),
      fontWeight: 'bold',
      color: '#4F4C4C',
      fontFamily: 'Poppins-Black',
    },
    accName: {
      fontSize: wp(4),
      fontWeight: 'bold',
    },
    points: {
      fontSize: wp(4),
      fontWeight: 'bold',
      marginTop: hp(1),
    },
    line: {
      width: wp(82),
      height: hp(0.5),
      marginTop: hp(2),
      backgroundColor: '#E2E2E2', 
    },
  });

}

