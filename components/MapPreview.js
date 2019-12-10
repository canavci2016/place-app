import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import Colors from '../constants/Colors';
import ENV from '../.env';

const MapPreView = props => {
    const imagePreviewUrl = props.location ? `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.lat},${props.location.lng}&key=${ENV().googleApiKey}` : null;
    console.log(imagePreviewUrl);
    return (
        <View style={{...styles.preview, ...props.style}}>
            {imagePreviewUrl ? <Image style={styles.image} source={{uri: imagePreviewUrl}}/> : props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    preview: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },

});

export default MapPreView;
