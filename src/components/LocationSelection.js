import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MapPinIcon, ArrowDownRightIcon } from "react-native-heroicons/solid";
import * as Location from 'expo-location';
import { setLocation, setAddress } from '../../context/locationSlice';
import { useDispatch } from 'react-redux';

const LocationSelection = ({ PressedSelection }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    
    const pressedCurrentLocation = async () => {
        PressedSelection(false);

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        let address = await Location.reverseGeocodeAsync(location.coords);
        await dispatch(setLocation(location));
        await dispatch(setAddress(address));
    };

    const pressedSelectAddress = () => {
        PressedSelection(false);
        navigation.navigate('MapView');
    };

    return (
        <View className="absolute top-12 w-5/6 z-50 mx-5 rounded-xl bg-gray-200 dark:bg-slate-800">
            <TouchableOpacity onPress={pressedCurrentLocation} className="p-4 flex-row items-center space-x-1">
                <MapPinIcon size={20} color="#00CCBB" className="flex-1" />
                <Text className="flex-1 dark:text-white font-extrabold text-base">
                    Use my current location 
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={pressedSelectAddress} className="p-4 flex-row items-center space-x-1">
                <ArrowDownRightIcon size={20} color="#00CCBB" className="flex-1" />
                <Text className="flex-1 dark:text-white font-extrabold text-base">
                    Add new location 
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default LocationSelection;