import React, {useState, useEffect} from 'react';
import {View, Image, Button, Text, StyleSheet, Alert} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import Colors from "../constants/Colors";

const ImageSelector = props => {
    const [pickedImg, setPickedImage] = useState(null);

    const verifyPermission = async () => {
        if (Constants.platform.ios) {
            const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
            console.log(result);
            if (result.status !== 'granted') {
                Alert.alert(
                    'Insufficient permissions',
                    'You need to grant camera permissions to use this app',
                    [{text: 'Okay'}]
                );
                return false;
            }
        }
        return true;
    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
        console.log(image);
    };


    return <View style={styles.imageContainer}>
        <View style={styles.imagePreview}>
            {!pickedImg ? <Text>No image picked yet</Text> : <Image style={styles.image} source={{uri: pickedImg}}/>}
        </View>
        <Button title={'Take image'} color={Colors.primary} onPress={takeImageHandler}/>
    </View>;
};

const styles = StyleSheet.create({

    imageContainer: {
        alignItems: 'center',
    },
    imagePicker: {},
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    }

});


export default ImageSelector;