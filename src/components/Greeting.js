import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, useWindowDimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


export default function Greeting() {
  const [greeting, setGreeting] = useState('');
  const styles = useStyle();

  useEffect(() => {
    setGreetingMessage();

    const intervalId = setInterval(() => {
      setGreetingMessage();
    }, 1000);

    return () => clearInterval(intervalId);
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
     <Text style={styles.Text}>{greeting}</Text>
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
    }
  });

}

