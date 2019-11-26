import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PlacesNavigator from './navigation/PlacesNavigation';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from "react-redux";
import ReduxtThunk from 'redux-thunk';
import placesReducter from './store/places-reducers';

const rootReducer = combineReducers({
    places: placesReducter,
});

const store = createStore(rootReducer, applyMiddleware(ReduxtThunk));

export default function App() {
    return (
        <Provider store={store}>
            <PlacesNavigator/>
        </Provider>
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
