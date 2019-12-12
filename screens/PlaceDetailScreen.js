import React from 'react';
import {View, ScrollView, Text, StyleSheet, Image} from "react-native";
import MapPreview from '../components/MapPreview';
import {useSelector} from "react-redux";
import Colors from "../constants/Colors";

const PlaceDetailScreen = props => {
    const selectedPlaceId = props.navigation.getParam('id');
    const selectedPlace = useSelector(state => state.places.places.find(place => place.id === selectedPlaceId));

    const selectedLocation = {lat: selectedPlace.lat, lng: selectedPlace.lng};

    const showMapHandler = () => {
        props.navigation.navigate('Map', {
            readOnly: true,
            initialLocation: selectedLocation
        });
    };

    return <ScrollView contentContainerStyle={{alignItems: 'center'}}>
        <Image source={{uri: selectedPlace.image}} style={styles.image}/>
        <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
                <Text style={styles.address}>{selectedPlace.address}</Text>
            </View>
            <MapPreview
                onPress={showMapHandler}
                style={styles.mapPreview} location={selectedLocation}/>
        </View>
    </ScrollView>

};

const styles = StyleSheet.create({
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: '#ccc'
    },
    locationContainer: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary,
        textAlign: 'center'
    },
    mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 300,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }
});

PlaceDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('title'),
    };
};

export default PlaceDetailScreen;