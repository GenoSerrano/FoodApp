import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AdjustmentsVerticalIcon, ChevronDownIcon, ChevronDoubleUpIcon, UserIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline";
import { MapPinIcon, ArrowDownRightIcon } from "react-native-heroicons/solid";
import * as Location from 'expo-location';
import { setLocation, setAddress } from '../../context/locationSlice';
import { useDispatch } from 'react-redux';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { selectLocation, selectAddress } from "../../context/locationSlice";

import * as Facebook from "expo-auth-session/providers/facebook";

import * as WebBrowser from 'expo-web-browser';

import Toast from 'react-native-toast-message';

import { FB_CLIENTID } from '@env';

WebBrowser.maybeCompleteAuthSession();

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const [selectionLocation, setSelectLocation] = useState(false);
  const userlocation = useSelector(selectLocation);
  const useraddress = useSelector(selectAddress);
  const dispatch = useDispatch();
  const progress = useSharedValue(0);
  const show = useSharedValue(0);
  const select_height = Dimensions.get('window').width * .25;

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: `${FB_CLIENTID}`,
  })

  const reanimatedStyle = useAnimatedStyle(() => {
    return{
      opacity: withTiming(progress.value, { duration: 500 }),
    }
  }, []);

  const dropdownAnimatedStyle = useAnimatedStyle(() => ({
    // transform: [
    //   {
    //     translateY: withTiming(baseline.value, { duration: 900 }),
    //   },
    // ],
    height: withTiming(show.value, { duration: 800 })
  }));

  const setLocationPressed = () => {
    setSelectLocation(!selectionLocation);
    if(selectionLocation === true){
      // baseline.value = -50;
      progress.value = 0;
      show.value = 0;
    } else{
      // baseline.value = 0;
      progress.value = 1;
      show.value = select_height;
    }
  };

  const GetLocationNow = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }
    location = await Location.getCurrentPositionAsync({});
    address = await Location.reverseGeocodeAsync(location.coords);

    console.log("Location Permission!");
    await AsyncStorage.setItem("Location", JSON.stringify(location));
    await AsyncStorage.setItem("Address", JSON.stringify(address));

    await dispatch(setLocation(location));
    await dispatch(setAddress(address));
    setTimeout(() => {
      Toast.show({
        type: 'success',
        text1: `Successfully added your location!`
      });
    }, 3000);
  };

  const pressedSelectAddress = () => {
    setLocationPressed();
    navigation.navigate('MapView');
  };

  useEffect(() => {
    (async () => {
      if (response && response.type === "success" && response.authentication) {
        (async () => {
          const userInfoResponse = await fetch(
            `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large)`
          );
          const userInfo = await userInfoResponse.json();
          setUser(userInfo);
          Toast.show({
            type: 'success',
            text1: `Welcome ${userInfo.name}`,
            text2: 'You are now logged in successfully to your FB account! 👋'
          });
        })();
      }})();

      if(userlocation === null && useraddress === null)
      {
        GetLocationNow();
      }
  }, [response]);

  return (
    <View>
      <View className="flex-row pb-3 pt-2 items-center mx-4 space-x-2 px-2 z-0">
        <Image source={{ uri: "https://links.papareact.com/wru" }} 
              className="h-7 w-7 bg-gray-300 p-4 rounded-full" />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 dark:text-white text-xs">
              Deliver Now!
          </Text>
          <TouchableOpacity onPress={() => setLocationPressed()} className="flex-row items-center space-x-1">
            <Text className="font-bold dark:text-white text-xl">
                Current location
            </Text>
            {selectionLocation === true ? (<ChevronDoubleUpIcon size={20} color="#00CCBB" />) : (<ChevronDownIcon size={20} color="#00CCBB" />) }
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => {
            promptAsync();
          }}>
          {user ? <Image source={{ uri: user.picture.data.url }} className="h-7 w-7 bg-gray-300 p-4 rounded-full" /> : <UserIcon size={30} color="#00CCBB" /> }
        </TouchableOpacity>
      </View>
      <Animated.View style={[ reanimatedStyle, dropdownAnimatedStyle ]} className="mx-4 mb-2">
        <TouchableOpacity onPress={GetLocationNow} className="m-4 flex-row items-center space-x-1">
              <MapPinIcon size={20} color="#00CCBB" className="flex-1" />
              <Text className="flex-1 dark:text-white font-extrabold text-base">
                  Use my current location 
              </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pressedSelectAddress} className="m-4 flex-row items-center space-x-1">
              <ArrowDownRightIcon size={20} color="#00CCBB" className="flex-1" />
              <Text className="flex-1 dark:text-white font-extrabold text-base">
                  Add new location 
              </Text>
        </TouchableOpacity>
      </Animated.View> 
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-2 rounded-lg">
          <MagnifyingGlassIcon size={20} color="#808080" />
          <TextInput
            autoCorrect={false}
            style={styles.inputStyle}
            placeholder="Restaurants and Cuisines"
            value={term}
            onChangeText={onTermChange}
            onEndEditing={onTermSubmit} />
        </View>
        <AdjustmentsVerticalIcon color="#00CCBB" />
      </View>
    </View>
  );
};

{/* <Button
disabled={!request}
title="Sign in with Facebook"
onPress={() => {
  promptAsync();
}}
/> */}

const styles = StyleSheet.create({
  backgroundStyle: {
    margin: 10,
    backgroundColor: '#E8E2E2',
    height: '6%',
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: 'row'
  },
  inputStyle: {
    flex: 1,
    fontSize: 15
  },
  iconStyle: {
    fontSize: 25,
    alignSelf: 'center',
    marginHorizontal: 15
  },
  searchBarStyle :{
    borderRadius: 35
  }
});

export default SearchBar;
