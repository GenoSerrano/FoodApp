import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from "../../context/basketSlice"
import { XCircleIcon } from 'react-native-heroicons/solid';
import Currency from "react-currency-formatter";
import { useColorScheme } from "nativewind";
import Animated, { SlideInDown } from 'react-native-reanimated';

const BasketScreen = ({ route }) => {
    const navigation = useNavigation();
    const { restaurant } = route.params;
    const items = useSelector((state) => selectBasketItems(state, restaurant));
    const basketTotal = useSelector((state) => selectBasketTotal(state, restaurant));
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
    const [currentItems, setCurrentItems] = useState(0);
    const dispatch = useDispatch();
    const { colorScheme, toggleColorScheme } = useColorScheme();

    useEffect(() => {
        if(currentItems !== items.length){
            const groupedItems = items.reduce((results, item) => {
                (results[item.id] = results[item.id] || []).push(item);
                return results;
            }, {});
    
            setGroupedItemsInBasket(groupedItems);
            setCurrentItems(items.length);
        }
        
    }, [items]);

    return (
        <Animated.View entering={SlideInDown} className="flex-1 bg-white dark:bg-slate-600" style={{ paddingTop: StatusBar.currentHeight }}>
            <SafeAreaView className="flex-1 bg-white">
                <View className="flex-1 bg-gray-100 dark:bg-slate-600">
                    <View className="p-5 border-b border-[#00CCBB] bg-white dark:bg-slate-600 shadow-xs">
                        <View>
                            <Text className="text-lg font-bold text-center dark:text-white">Basket</Text>
                            <Text className="text-center text-gray-400 dark:text-white">
                                {restaurant}
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={navigation.goBack}
                            className="rounded-full bg-gray-100 dark:bg-slate-600 absolute top-3 right-5">
                            {colorScheme !== "dark" ? <XCircleIcon color="#00CCBB" height={45} width={45} /> : <XCircleIcon color="#ffffff" height={45} width={45} />}
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5 dark:bg-slate-600">
                        <Image
                            source={{
                                uri: "https://links.papareact.com/wru"
                            }}
                            className="h-7 w-7 bg-gray-300 p-4 rounded-full" />
                        <Text className="flex-1 dark:text-white">Deliver in 50-75 min</Text>
                        <TouchableOpacity>
                            <Text className="text-[#00CCBB]">Change</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView className="divide-y divide-gray-200 dark:divide-slate-500">
                        {Object.entries(groupedItemsInBasket).map(([ key, items ]) => (
                            <View key={key} className="flex-row items-center space-x-3 bg-white dark:bg-slate-600 py-2 px-5">
                                <Text className="text-[#00CCBB]">{items.length} x</Text>
                                <Image
                                    // source={{ uri: urlFor(items[0]?.image.url()) }}
                                    source={require('../../assets/salad.jpg')}
                                    className="h-12 w-12 rounded-full"></Image>
                                <Text className="flex-1 dark:text-white">{items[0]?.name}</Text>
                                <Text className="text-gray-600">
                                    <Currency quantity={Number(items[0]?.price)} currency="PHP" />
                                </Text>
                                <TouchableOpacity>
                                    <Text className="text-[#00CCBB] text-xs"
                                        onPress={() => dispatch(removeFromBasket({ id: items[0]?.id, restaurant }))}>
                                            Remove
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                    <View className="p-5 bg-white mt-5 space-y-4 dark:bg-slate-500">
                        <View className="flex-row justify-between">
                            <Text className="text-gray-400 dark:text-white">Subtotal</Text>
                            <Text className="text-gray-400 dark:text-white">
                                <Currency quantity={basketTotal} currency="PHP" />
                            </Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text className="text-gray-400 dark:text-white">Delivery Fee</Text>
                            <Text className="text-gray-400 dark:text-white">
                                <Currency quantity={24.00} currency="PHP" />
                            </Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text className="dark:text-white">Order Total</Text>
                            <Text className="font-extrabold dark:text-white">
                                <Currency quantity={basketTotal + 24.00} currency="PHP" />
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('Preparing')} className="rounded-lg bg-[#00CCBB] p-4">
                            <Text className="text-center text-white text-lg font-bold">
                                Place Order
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </Animated.View>
    )
};

export default BasketScreen;