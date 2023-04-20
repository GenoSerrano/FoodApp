import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useRestaurants';
import ResultsList from '../components/ResultsList';
import { useNavigation } from '@react-navigation/native';
import Categories from '../components/Categories';
import { MoonIcon, SunIcon} from "react-native-heroicons/solid";

import { useColorScheme } from "nativewind";
import Animated, { SlideInUp } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [term, setTerm] = useState('');
  const [rendered, setRendered] = useState(false);
  const [searchApi, results, errorMessage] = useResults();
  const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();

  useLayoutEffect(()=> {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    if(rendered === false){
      AsyncStorage.getItem("ColorScheme")
      .then((value) => {
        setColorScheme(value);
      })
      setRendered(true);
      searchApi(term);
    }
    AsyncStorage.setItem("ColorScheme", colorScheme);
  }, [term]);
  
  const filterResultsByPrice = price => {
    // price === '$' || '$$' || '$$$'
    return results.filter(result => {
      return result.price === price;
    });
  };

  return (
    <SafeAreaView style={styles.container} className="bg-white dark:bg-slate-800">
      <View className="absolute bottom-10 right-0 h-12 w-40 z-50">
          <TouchableOpacity onPress={toggleColorScheme} className="mx-5 bg-[#00CCBB] dark:bg-stone-100 p-4 rounded-lg flex-row items-center space-x-1">     
              {colorScheme !== "dark" ? (
                <View className="flex-row items-center space-x-2">
                  <MoonIcon color="#ffffff"></MoonIcon>
                  <Text className="text-base text-white font-extrabold">
                    Dark Mode
                  </Text>
                </View>
              ) : 
              <View className="flex-row items-center">
                <SunIcon color="#fcd34d"></SunIcon>
                <Text className="text-base text-slate-700 font-extrabold">
                  Light Mode
                </Text>
              </View>}
          </TouchableOpacity>
      </View>
      <Animated.View entering={SlideInUp} className="border-b-2 border-slate-50 dark:border-slate-600 dark:bg-slate-800">
        <SearchBar
          term={term}
          onTermChange={newTerm => setTerm(newTerm)}
          onTermSubmit={() => searchApi(term)}
        />
        <Categories onTermChange={newTerm => setTerm(newTerm)} ></Categories>
      </Animated.View>
      <ScrollView className="dark:bg-slate-800">
        <ResultsList results={filterResultsByPrice('$')} title="Tasty Discounts" description="Big Discounts from your favorite restaurants"/>
        <ResultsList results={filterResultsByPrice('$$')} title="Featured" description="Featured restaurants near you"/>
        <ResultsList results={filterResultsByPrice('$$$')} title="Time to Celebrate" description="If you want to celebrate with family and friends"/>
        <ResultsList results={filterResultsByPrice('$$$$')} title="Fine Dining" description="If you want to celebrate with family and friends"/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  }
});

export default HomeScreen;
