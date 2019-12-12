import React, {useState, useEffect} from 'react';
import {View, Button, Text, StyleSheet, Alert, ActivityIndicator, Image} from "react-native";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import Colors from "../constants/Colors";
import MapPreview from './MapPreview';

const LocationPicker = props => {
    const [pickedLoc, setPickedLoc] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const mapPickedLocation = props.navigation.getParam('pickedLocation');

    useEffect(() => {
        if (mapPickedLocation) {
            console.log(mapPickedLocation);
            setPickedLoc(mapPickedLocation);
            props.onLocationPick(mapPickedLocation);
        }
    }, [mapPickedLocation]);

    const verifyPermission = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions',
                'You need to grant location permissions to use this app',
                [{text: 'Okay'}]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            return;
        }

        try {
            setIsLoading(true);
            const location = await Location.getCurrentPositionAsync({timeout: 5000});
            setPickedLoc({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
            props.onLocationPick({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
        } catch (e) {
            Alert.alert(
                'Couldnt fetch location',
                'Please try again or check your permission',
                [{text: 'Okay'}]
            );
        }
        setIsLoading(false);
    };
    const pickOnMapHandler = async () => {
        props.navigation.navigate('Map');
    };

    return <View style={styles.container}>

        <MapPreview style={styles.preview} location={pickedLoc} onPress={pickOnMapHandler}>
            {isLoading ? <ActivityIndicator size={'large'} color={Colors.primary}/> : <Text>No place chosen yet</Text>}
        </MapPreview>
        <View style={styles.actions}>
            <Button title={'Get User Location'} color={Colors.primary} onPress={getLocationHandler}/>
            <Button title={'Pick On Map'} color={Colors.primary} onPress={pickOnMapHandler}/>
        </View>
    </View>;
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    preview: {
        marginBottom: 10,
        width: '100%',
        height: 100,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    }
});


export default LocationPicker;