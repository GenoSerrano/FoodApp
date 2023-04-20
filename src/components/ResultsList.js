import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ResultsDetail from './ResultsDetail';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import Animated from 'react-native-reanimated';

const ResultsList = ({ title, results, description }) => {
  const navigation = useNavigation();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const SCREEN_WIDTH = Dimensions.get('window').width;

  if(!results.length){
    return null;
  }

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg dark:text-white">{title}</Text>
        <ArrowRightIcon color="#00CCBB"></ArrowRightIcon>
      </View>
      <Text className="text-xs text-gray-500 dark:text-white px-4 mb-2">{description}</Text>
      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={results}
        onScroll={Animated.event(
          [{ nativeEvent: {contentOffset: { x: scrollX }}}],
          { useNativeDriver: true }
        )}
        keyExtractor={result => result.id}
        renderItem={({ item, index }) => {
          const inputRange = [ -1, 0, (SCREEN_WIDTH * .7) * index, (SCREEN_WIDTH * .7) * (index + 1.5)]
          const opacityInputRange = [ -1, 0, (SCREEN_WIDTH * .7) * index, (SCREEN_WIDTH * .7) * (index + 1.5)]
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1,1,1,0]
          })
          const opacity = scrollX.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1,1,1,0]
          })
          return (
            <Animated.View style={{ transform: [{scale}], opacity }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ResultsShow', { id: item.id })
                }>
                <ResultsDetail result={item} />
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ResultsList;
