import React, {useState, useEffect} from 'react';
import {View, Button, Text, StyleSheet, Alert, ActivityIndicator, Image} from "react-native";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import Colors from "../constants/Colors";
import MapPreview from './MapPreview';

const LocationPicker = props => {
    const [pickedLoc, setPickedLoc] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
            console.log(location);
            setPickedLoc({
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


    return <View style={styles.container}>

        <MapPreview style={styles.preview} location={pickedLoc}>
            {isLoading ? <ActivityIndicator size={'large'} color={Colors.primary}/> : <Text>No place chosen yet</Text>}
        </MapPreview>
        <Button title={'Get User Location'} color={Colors.primary} onPress={getLocationHandler}/>
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
});


export default LocationPicker;