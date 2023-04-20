import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import Currency from "react-currency-formatter";
import { PlusCircleIcon, MinusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItemsByID } from '../../context/basketSlice';
import { useColorScheme } from "nativewind";

const DishRow = ({ id, name, description, price, restaurant, setPressed, indexIdPressed, image }) => {
    const [isPressed, setIsPressed] = useState(false);
    const items = useSelector((state) => selectBasketItemsByID(state, id, restaurant));
    const dispatch = useDispatch();
    
    const addItemToBasket = () => {
        dispatch(addToBasket({ id, name, description, price, restaurant }));
    }
    const removeItemFromBasket = () => {
        if(!items.length > 0) return;

        dispatch(removeFromBasket({ id, restaurant }));
    }

    const setIdPressed = async term => {
        setIsPressed(!isPressed)
        setPressed(id);
      };

    useEffect(() => {
        if(indexIdPressed !== id){
            setIsPressed(false);
        }
      }, [indexIdPressed]);

    return(
        <View>
            <TouchableOpacity 
                onPress={() => setIdPressed(id)}
                className={`bg-white dark:bg-slate-800 border p-4 border-gray-200 dark:border-slate-800 ${ isPressed && "border-b-0" }`}>
                <View className="flex-row">
                    <View className="flex-1 pr-2">
                        <Text className="text-lg mb-1 dark:text-white">{name}</Text>
                        <Text className="text-gray-400">{description}</Text>
                        <Text className="text-gray-400 mt-2">
                            <Currency quantity={Number(price)} currency="PHP" />
                        </Text>
                    </View>
                    <View>
                        <Image
                            source={{ uri: image }}
                            className="h-20 w-20 bg-gray-300 p-4 rounded-lg"
                        />
                    </View>
                </View>
            </TouchableOpacity>

            {isPressed && (
                <View className="bg-white px-4 dark:bg-slate-800">
                    <View className="flex-row items-center space-x-2 pb-3">
                        <TouchableOpacity onPress={removeItemFromBasket}>
                            <MinusCircleIcon color={ items.length > 0 ? "#00CCBB" : "gray"} size={30} />
                        </TouchableOpacity>

                        <Text className="dark:text-white">{items.length}</Text>

                        <TouchableOpacity onPress={addItemToBasket}>
                            <PlusCircleIcon color="#00CCBB" size={30} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default DishRow;
