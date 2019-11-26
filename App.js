import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PlacesNavigator from './navigation/PlacesNavigation';

export default function App() {
    return (
        <PlacesNavigator/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
