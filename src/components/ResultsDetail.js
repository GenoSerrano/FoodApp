import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { StarIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { useColorScheme } from "nativewind";

const ResultsDetail = ({ result }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  let food_category = [];

  result.categories.forEach(function (item, index) {
    food_category.push(item.title);
  });

  return (
    <View className="bg-slate-50 dark:bg-slate-600 w-64 mx-2 mb-2 rounded-sm">
      <Image source={{ uri: result.image_url }} className="h-36 w-64 rounded-sm" />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2 dark:text-white">{result.name}</Text>
        <View className="flex-row items-center space-x-1">
          {colorScheme !== "dark" ? <StarIcon color="green" opacity={0.5} size={22} /> : <StarIcon color="green" size={22} /> }
          <Text className="text-xs text-gray-500 dark:text-white" >
            <Text className="text-green-500">{result.rating}</Text> · {food_category.join(', ')}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          {colorScheme !== "dark" ? <MapPinIcon color="gray" opacity={0.4} size={22} /> : <MapPinIcon color="white" opacity={0.4} size={22} />}
          <Text className="text-xs text-gray-500 dark:text-white">Nearby · {result.location.display_address}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ResultsDetail;
