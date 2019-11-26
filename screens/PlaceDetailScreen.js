import React from 'react';
import {View, Text, StyleSheet} from "react-native";

const PlaceDetailScreen = props => {
    return <View>
        <Text>Place List</Text>
    </View>

};

const styles = StyleSheet.create({});

PlaceDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('title'),
    };
};

export default PlaceDetailScreen;