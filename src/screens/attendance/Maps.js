import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const Maps = ({route}) => {
  const [message, setMessage] = useState('Student outside the college');

  const latitude = route.params.latitude;
  const longitude = route.params.longitude;
  const picture = route.params.picture;

  // 13.0443321 80.1374166

  const studentInOrOut = async () => {
    console.log(latitude, longitude);
    if (latitude > 10 && latitude < 15 && longitude > 70 && longitude < 90) {
      setMessage('Student inside the college');
    } else {
      setMessage('Student outside the college');
    }
  };
  
  useEffect(() => {
    studentInOrOut();
  }, []);
  console.log(latitude, longitude);

  console.log(picture);

  return (
    <View style={{flex: 1}}>
      <Text>{message}</Text>
      <Image source={{uri: picture}} style={styles.cardImage} />

      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        <Marker coordinate={{latitude: latitude, longitude: longitude}} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
});

export default Maps;
