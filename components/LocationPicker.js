import React, {useState, useEffect} from 'react';
import {View, Button, Text, StyleSheet, Alert, ActivityIndicator, Image} from "react-native";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import Colors from "../constants/Colors";

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
        <View style={styles.preview}>
            {isLoading ? <ActivityIndicator size={'large'} color={Colors.primary}/>
                : (pickedLoc ? <Image style={styles.image} source={{uri: '&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318\n' +
                        '&markers=color:red%7Clabel:C%7C40.718217,-73.998284\n' +
                        '&key= '}}/> :
                    <Text>No place chosen yet</Text>)
            }
        </View>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default LocationPicker;