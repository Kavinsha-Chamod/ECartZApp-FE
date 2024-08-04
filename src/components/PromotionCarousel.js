import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, FlatList } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
 

const { width } = Dimensions.get('window');

const promotions = [
  {
    id: '1',
    title: 'Promo 1',
    image: 'https://via.placeholder.com/300', // Replace with your image URL
    description: 'Description for promo 1',
  },
  {
    id: '2',
    title: 'Promo 2',
    image: 'https://via.placeholder.com/300', // Replace with your image URL
    description: 'Description for promo 2',
  },
  {
    id: '3',
    title: 'Promo 3',
    image: 'https://via.placeholder.com/300', // Replace with your image URL
    description: 'Description for promo 3',
  },
];

const PosterCarousel = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      {/* <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text> */}
    </View>
  );

  return (
    <FlatList
      data={promotions}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToAlignment="center"
      decelerationRate="fast"
      pagingEnabled
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: width - 40,
    height: hp(18),
    marginHorizontal: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: wp(11) * 8,
    height: hp(16),
    borderRadius: hp(2),
  },
});

export default PosterCarousel;
