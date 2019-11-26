import React from 'react';
import {View, Text, StyleSheet, Platform, FlatList} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import {useSelector} from "react-redux";

const PlaceListScreen = props => {
    const places = useSelector(state => state.places.places);

    return <FlatList data={places} keyExtractor={item => item.id}
                     renderItem={({item}) => <PlaceItem
                         onSelect={() => props.navigation.navigate('PlaceDetail', {title: item.title, id: item.id})}
                         image={null}
                         address={null}
                         title={item.title}
                     />}

    />
};

const styles = StyleSheet.create({});

PlaceListScreen.navigationOptions = navData => {
    return {
        headerTitle: 'PlaceListScreen',
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title={'Add Place'}
                iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                onPress={() => navData.navigation.navigate('NewPlace')}
            />

        </HeaderButtons>
    };
};


export default PlaceListScreen;