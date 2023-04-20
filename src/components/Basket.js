import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { selectBasketItems, selectBasketTotal } from '../../context/basketSlice';
import { useSelector } from 'react-redux';
import Currency from "react-currency-formatter";
import { ShoppingCartIcon } from "react-native-heroicons/solid";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

const Basket = ({ restaurant, isOnBottom }) => {
    const navigation = useNavigation();
    const basketTotal = useSelector((state) => selectBasketTotal(state, restaurant));
    const items = useSelector((state) => selectBasketItems(state, restaurant));
    const animation = useSharedValue(Dimensions.get('window').width);
    const animationBasket = useSharedValue(0);

    const animationStyle = useAnimatedStyle(() => {
        return{
            width: animation.value
        }
    });

    const animationBasketStyle = useAnimatedStyle(() => {
        return{
            width: animationBasket.value,
        }
    });

    useEffect(() => {
        if(isOnBottom){
            animationBasket.value = withTiming(Dimensions.get('window').width * .25, 500);
            animation.value = withTiming(0, 500);
        } else{
            animationBasket.value = withTiming(0, 500);
            animation.value = withTiming(Dimensions.get('window').width, 500);
        }
      }, [isOnBottom]);

    return (
        <>
            <Animated.View style={[ animationStyle ]} className='absolute bottom-10 h-12 w-full z-50'
                // onLayout={({ nativeEvent }) => {
                //     const { width, height } = nativeEvent.layout
                //     setDimension({ width, height });
                //  }}
                >
                <TouchableOpacity onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('Basket', {
                        restaurant,
                    });
                    }} className="mx-5 bg-[#00CCBB] flex-1 rounded-lg flex-row items-center space-x-1">
                    
                    <View className="ml-3 bg-[#00b3a4] rounded-md">
                        <Text className="text-white font-extrabold px-2">
                            {items.length}
                        </Text>
                    </View>
                    <Text className="flex-1 text-white font-extrabold text-center">
                        View Basket
                    </Text>
                    <Text className="mr-4 text-white font-extrabold">
                        <Currency quantity={Number(basketTotal)} currency="PHP" />
                    </Text>
                </TouchableOpacity>
            </Animated.View>
            
            <Animated.View style={[ animationBasketStyle ]} className="absolute bottom-10 right-0 h-12 w-30 z-50">
                <TouchableOpacity onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate('Basket', {
                        restaurant,
                    });
                    }} className="mx-6 bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-1">
                    {/* <Text className="text-white font-extrabold text-base bg-[#00CCBB] px-2">
                        {items.length}
                    </Text> */}
                    <ShoppingCartIcon size={17} color="#ffffff"></ShoppingCartIcon>
                </TouchableOpacity>
            </Animated.View>
        </>
    );
};

export default Basket;