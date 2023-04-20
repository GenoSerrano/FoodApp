import React from 'react';
import { StyleSheet, Image, SafeAreaView, StatusBar, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../../context/restaurantSlice';
import { XCircleIcon } from 'react-native-heroicons/solid';
import * as Progress from 'react-native-progress';
import MapView, { Marker } from 'react-native-maps';

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  let currLatitude = restaurant.latitude;
  let currLongitude = restaurant.longitude;

  return (
    <View className="bg-[#84d9f3] flex-1" style={styles.container}>
        <SafeAreaView className="z-50">
            <View className="flex-row justify-between items-center p-5">
                <TouchableOpacity onPress={ () => navigation.navigate("Home")}>
                    <XCircleIcon color="white" size={30} />
                </TouchableOpacity>
                <Text className="font-light text-white text-lg">Order Help</Text>
            </View>
            <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
                <View className="flex-row justify-between">
                    <View>
                        <Text className="text-lg text-gray-400">Estimated Arrival</Text>
                        <Text className="text-4xl font-bold">45-55 Minutes</Text>
                    </View>
                    <Image
                        source={{ uri: "https://links.papareact.com/fls" }}
                        className="h-20 w-20"
                    />
                </View>
                <Progress.Bar color="#84d9f3" size={30} indeterminate={true} />
                <Text className="mt-3 text-gray-500">
                    Your order at {restaurant.name} is being prepared!
                </Text>
            </View>
        </SafeAreaView>
        <MapView 
            initialRegion={{
                latitude: currLatitude,
                longitude: currLongitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }}
            className="flex-1 -mt-10 z-0"
            mapType='mutedStandard'
            showsCompass={true}
            >
                
            <Marker
                coordinate={{
                    latitude: currLatitude,
                    longitude: currLongitude
                }}
                title={restaurant.name}
                description=""
                identifier="origin"
                pinColor="#00CCBB"></Marker>
        </MapView>
        <SafeAreaView className="bg-white flex-row items-center space-x-5 h-28">
            <Image
                source={{
                    uri: "https://links.papareact.com/wru",
                }}
                className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5">
            </Image>
            <View className="flex-1">
                <Text className="text-lg">Jason Bateman</Text>
                <Text className="text-gray-400">Your Rider</Text>
            </View>
            <Text className="text-[#00CCBB] text-lg mr-5 font-bold">Call</Text>
        </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  }
});

export default DeliveryScreen;
