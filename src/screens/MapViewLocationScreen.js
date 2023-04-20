import React from 'react';
import { View, Text, StatusBar, TouchableOpacity, SafeAreaView } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import { XCircleIcon, MapIcon, MapPinIcon } from 'react-native-heroicons/solid';
import * as Location from "expo-location";
import { useSelector } from 'react-redux';
import { setLocation, setAddress, selectLocation, selectAddress } from "../../context/locationSlice";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

const MapViewLocationScreen = () => {
    const navigation = useNavigation();
    let location = useSelector(selectLocation);
    let address = useSelector(selectAddress);
    const dispatch = useDispatch();
    const addressString = `${address[0].street}, ${address[0].district}, ${address[0].city}, ${address[0].subregion}`

    const changeSetLocation = async (coordinate) => {
        const newLocation = { ...location, coords: { ...location.coords, latitude: coordinate.latitude, longitude: coordinate.longitude }}
        address = await Location.reverseGeocodeAsync(newLocation.coords);
        await dispatch(setLocation(newLocation));
        await dispatch(setAddress(address));
    };

    const saveNewAddress = async () => {
        await AsyncStorage.setItem("Location", JSON.stringify(location));
        await AsyncStorage.setItem("Address", JSON.stringify(address));
    };

    return (
        <View className="flex-1 bg-white dark:bg-slate-600" style={{ paddingTop: StatusBar.currentHeight }}>
            <SafeAreaView className="flex-1 bg-white dark:bg-slate-600">
                <View className="absolute top-0 right-0 left-0 z-10 p-5 border-b border-[#00CCBB] bg-white dark:bg-slate-600 shadow-xs">
                    <View>
                        <Text className="text-lg font-bold text-center text-[#00CCBB]">Current Location</Text>
                        <Text className="text-center text-gray-400 dark:text-white">
                            {addressString}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className="rounded-full bg-gray-100 dark:bg-slate-600 absolute top-3 right-5">
                        <XCircleIcon color="#00CCBB" height={45} width={45} />
                    </TouchableOpacity>
                </View>
                <MapView 
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005
                    }}
                    className="absolute top-12 bottom-0 right-0 left-0 -mt-1 z-0"
                    style={{ marginTop: StatusBar.currentHeight }}
                    mapType='standard'
                    showsCompass={true}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    >
                        
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude
                        }}
                        title="Current Location"
                        description={addressString}
                        identifier="origin"
                        draggable={true}
                        onDragEnd={(e) => {
                            changeSetLocation(e.nativeEvent.coordinate);
                        }}
                        pinColor="#00CCBB"></Marker>
                </MapView>
            </SafeAreaView>
            <View className="absolute bottom-10 right-0 flex-row flex-1 z-50">
                <View className="flex-col p-3 border-[#00CCBB] bg-white dark:bg-slate-600 h-full w-11/12 rounded-lg">
                    <View className="flex-row justify-start">
                        <MapIcon color="#00CCBB" height={20} width={20} />
                        <Text className="text-lg mx-3 font-bold dark:text-white">Address</Text>
                    </View>
                    <Text className="text-gray-500 text-md font-semibold my-2 dark:text-white">{addressString}</Text>
                    <View className="flex-row justify-start mt-2">
                        <MapPinIcon color="#00CCBB" height={20} width={20} />
                        <Text className="text-lg mx-3 font-bold dark:text-white">Location</Text>
                    </View>
                    <View className="flex-row justify-center my-4">
                        <View className="flex-1 flex-col">
                            <Text className="text-gray-500 text-md font-bold dark:text-white">Latitude</Text>
                            <Text className="text-[#00CCBB] text-lg font-bold">{Number(location.coords.latitude).toFixed(4)}</Text>
                        </View>
                        <View className="flex-1 flex-col">
                            <Text className="text-gray-500 text-md font-bold dark:text-white">Longitude</Text>
                            <Text className="text-[#00CCBB] text-lg font-bold">{Number(location.coords.longitude).toFixed(4)}</Text>
                        </View>
                        <View className="flex-1 flex-col">
                            <Text className="text-gray-500 text-md font-bold dark:text-white">Height</Text>
                            <Text className="text-[#00CCBB] text-lg font-bold">{Number(location.coords.altitudeAccuracy).toFixed(4)}</Text>
                        </View>
                    </View>
                    <View className="flex-1 items-center justify-center">
                        <TouchableOpacity onPress={saveNewAddress} className="rounded-full w-1/2 bg-[#00CCBB] p-4">
                            <Text className="text-center text-white text-lg font-bold">
                                Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default MapViewLocationScreen;
