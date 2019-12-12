import * as FileSystem from 'expo-file-system';
import {insertPlace, fetchPlaces} from '../helpers/db';
import ENV from '../.env';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, location) => {
    return async dispatch => {
        let formattedAddress = 'Dummy adress';
        try {
            const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV().googleApiKey}`);
            if (!res.ok) {
                throw  new Error('Something went wrong');
            }

            const resData = res.json();
            if (!resData.results) {
                throw  new Error('Something went wrong');
            }
            formattedAddress = resData.results.formatted_address;
        } catch (e) {
            console.log(e.message);
        }

        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });
            const dbResult = await insertPlace(title, newPath, formattedAddress, location.lat, location.lng);
            dispatch({
                type: ADD_PLACE,
                placeData: {
                    id: dbResult.insertId,
                    title,
                    image: newPath,
                    address: formattedAddress,
                    coords: {lat: location.lat, lng: location.lng}
                }
            });
        } catch (e) {
            throw e;
        }
    };
};

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();
            dispatch({
                type: SET_PLACES,
                places: dbResult.rows._array,
            });
        } catch (e) {
            throw e;
        }
    };
};