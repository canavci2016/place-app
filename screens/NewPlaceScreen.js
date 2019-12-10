import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput, Platform, ScrollView} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from '../components/HeaderButton';
import ImagePicker from '../components/ImageSelector';
import LocationPicker from '../components/LocationPicker';
import Colors from "../constants/Colors";
import * as placesActions from '../store/places-actions';
import {connect} from "react-redux";

const NewPlaceScreen = props => {
    const [title, setTitle] = useState(null);
    const [image, setImage] = useState(null);

    const titleChangeHandler = text => {
        setTitle(text);
    };

    const imagePathHandler = path => {
        setImage(path);
    };

    const savePlaceHandler = () => {
        props.addPlace(title, image);
        props.navigation.goBack();
    };

    return <ScrollView>
        <View style={styles.form}>
            <Text style={styles.label}>Title</Text>
            <TextInput onChangeText={titleChangeHandler} style={styles.textInput}/>
            <Text style={styles.label}>Photo</Text>
            <ImagePicker onImageTaken={imagePathHandler}/>
            <LocationPicker onLocationChoosen={() => {}}/>
            <Button style={styles.saveButton} title={'Save Place'} color={Colors.primary} onPress={savePlaceHandler}/>
        </View>
    </ScrollView>
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    label: {
        fontSize: 18,
        marginBottom: 15,
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
    }
});

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


const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
        places: state.places,
    };
};

const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        addPlace: (title, image) => dispatch(placesActions.addPlace(title, image)),
        // Decrease Counter
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPlaceScreen);

