import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export const MapScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={{color : "#1e1e1e"}}>MapScreen</Text>
            <MapView
                style={styles.map}
                initialPosition={{
                    latitude: 13.0827,
                    longitude: 80.2707,
                    zoom: 10,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

