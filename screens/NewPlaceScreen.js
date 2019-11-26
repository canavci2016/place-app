import React from 'react';
import {View, Text, StyleSheet, Platform} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from '../components/HeaderButton';
import PlaceListScreen from "./PlaceListScreen";

const NewPlaceScreen = props => {
    return <View>
        <Text>Place List</Text>
    </View>

};

const styles = StyleSheet.create({});

NewPlaceScreen.navigationOptions = navData => {
    return {
        headerTitle: 'New Place Screen',
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title={'Add Place'}
                iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                onPress={() => navData.navigation.navigate('NewPlace')}
            />
        </HeaderButtons>
    };
};


export default NewPlaceScreen;