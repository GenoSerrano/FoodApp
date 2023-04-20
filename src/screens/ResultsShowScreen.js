import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import yelp from '../api/yelp';
import { ArrowLeftIcon, QuestionMarkCircleIcon } from 'react-native-heroicons/outline';
import { StarIcon, MapPinIcon, ChevronRightIcon } from 'react-native-heroicons/solid';
import { setRestaurant, selectRestaurant } from '../../context/restaurantSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useColorScheme } from "nativewind";
import DishRow from '../components/DishRow';
import Basket from '../components/Basket';
import Animated, { SlideInUp } from 'react-native-reanimated';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const ResultsShowScreen = ({ route }) => {
  const navigation = useNavigation();
  const { id } = route.params;
  const [result, setResult] = useState(null);
  const [idPressed, setIdPressed] = useState(0);
  const [isBottom, setIsBottom] = useState(false);
  const dispatch = useDispatch();
  const restaurant = useSelector(selectRestaurant);
  const food_category = [];
  const customData = require('../../seeder/data.json');

  const { colorScheme, toggleColorScheme } = useColorScheme();

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['30%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    //console.log('handleSheetChanges', index);
  }, []);

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 40;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const getResult = async restaurantId => {
    console.log('Call Yelp API');
    const response = await yelp.get(`/${restaurantId}`);
    response.data.categories.forEach((item) => {
      food_category.push(item.title);
    });
    const genre = (food_category.join(', '));
    const { id, name, coordinates: { latitude, longitude }} = response.data;

    //State variables - async functions grouped up to a single call to improve performance
    await Promise.all([setResult(response.data), dispatch(setRestaurant({ id, name, latitude, longitude, genre }))]);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  return (
    <>
      <Basket restaurant={result.name} isOnBottom={isBottom}></Basket>
      <Animated.View entering={SlideInUp} className="flex-1">
            <View className="dark:bg-slate-800">
              <FlatList
                onScroll={({nativeEvent}) => {
                  if (isCloseToBottom(nativeEvent)) {
                    setIsBottom(true);
                  } else{
                    setIsBottom(false);
                  }
                }}
                data={customData}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                <>
                  <View className="relative">
                    <Image 
                      source={{ uri: result.image_url }}
                      className="w-full h-60 bg-gray-300 p-4"
                    />
                    <TouchableOpacity
                      onPress={navigation.goBack}
                      className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full dark:bg-slate-800">
                      <ArrowLeftIcon size={20} color="#00CCBB" />
                    </TouchableOpacity>
                  </View>
                  <View className="bg-white dark:bg-slate-800">
                    <View className="px-4 pt-4">
                      <Text className="text-3xl font-bold dark:text-white">{result.name}</Text>
                      <View className="flex-row space-x-2 my-1">
                        <View className="flex-row items-center space-x-1">
                        {colorScheme !== "dark" ? <StarIcon color="green" opacity={0.5} size={22} /> : <StarIcon color="green" size={22} /> }
                          <Text className="text-green-500">{result.rating}</Text> 
                          <Text className="text-xs text-gray-500 dark:text-white">
                            · {restaurant.genre}
                          </Text>
                        </View>
                        
                      </View>
                      <View className="flex-row space-x-2 my-1">
                        <View className="flex-row items-center space-x-1">
                          {colorScheme !== "dark" ? <MapPinIcon color="gray" opacity={0.4} size={22} /> : <MapPinIcon color="white" opacity={0.4} size={22} />}
                          <Text className="text-xs text-gray-500 dark:text-white">Nearby · {result.location.display_address}</Text>
                        </View>
                      </View>
                      <Text className="text-gray-500 mt-2 pb-4 dark:text-white">Welcome to {result.name}! We’re glad you have decided to join us. We want to make your onboarding experience free of worry. </Text>
                    </View>
                    <TouchableOpacity onPress={handlePresentModalPress} className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
                      {colorScheme !== "dark" ? <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} /> : <QuestionMarkCircleIcon color="white" opacity={0.6} size={20} /> }
                      <Text className="pl-2 flex-1 text-md font-bold dark:text-white">
                        Want to know more about the restaurant?
                      </Text>
                      <ChevronRightIcon color="#00CCBB" />
                    </TouchableOpacity>
                  </View>
                  <Text className="px-4 pt-4 mb-3 font-bold text-xl dark:text-white">Menu</Text>
                </>}
                renderItem={({item}) => {
                  return (
                  <DishRow
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    restaurant={result.name}
                    setPressed={setIdPressed}
                    indexIdPressed={idPressed}
                    image={item.image}
                  />);
                }}>

              </FlatList>
            </View>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose={true}
          >
            <View className="flex-1 items-center dark:bg-slate-800">
              <Text className="text-lg text-gray-500 dark:text-white">Awesome 🎉</Text>
              <Text className="mx-5 text-lg text-gray-500 mt-2 pb-4 dark:text-white">Welcome to {result.name}! We’re glad you have decided to join us. We want to make your onboarding experience free of worry. </Text>
            </View>
          </BottomSheetModal>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({});

export default ResultsShowScreen;
