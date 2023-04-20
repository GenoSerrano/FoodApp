import React from 'react';
import { ScrollView, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const Categories = ({ onTermChange }) => {
    const onPressButton = async term => {
        onTermChange(term);
      };

    return (
        <ScrollView
            className="my-2 mx-2 dark:bg-slate-800"
            horizontal
            showsHorizontalScrollIndicator={false}>
            <TouchableOpacity className="relative ml-2" 
                    onPress={ () => onPressButton("Pizza") }>
                <Image 
                    source={require('../../assets/pizza.jpg')}
                    className="h-24 w-24 rounded-md"
                    style={styles.image}
                />
                <Text className="absolute bottom-1 left-1 text-sm font-bold text-white">
                    Pizza
                </Text>
            </TouchableOpacity>
            <TouchableOpacity className="relative ml-2" 
                    onPress={ () => onPressButton("Pasta") }>
                <Image 
                    source={require('../../assets/pasta.jpg')}
                    className="h-24 w-24 rounded-md"
                    style={styles.image}
                />
                <Text className="absolute bottom-1 left-1 text-sm font-bold text-white">
                    Pasta
                </Text>
            </TouchableOpacity>
            <TouchableOpacity className="relative ml-2" 
                    onPress={ () => onPressButton("Burger") }>
                <Image 
                    source={require('../../assets/burger.jpg')}
                    className="h-24 w-24 rounded-md"
                    style={styles.image}
                />
                <Text className="absolute bottom-1 left-1 text-sm font-bold text-white">
                    Burgers
                </Text>
            </TouchableOpacity>
            <TouchableOpacity className="relative ml-2" 
                    onPress={ () => onPressButton("Noodles") }>
                <Image 
                    source={require('../../assets/ramen.jpg')}
                    className="h-24 w-24 rounded-md"
                    style={styles.image}
                />
                <Text className="absolute bottom-1 left-1 text-sm font-bold text-white">
                    Noodles
                </Text>
            </TouchableOpacity>
            <TouchableOpacity className="relative ml-2" 
                    onPress={ () => onPressButton("Sushi") }>
                <Image 
                    source={require('../../assets/sushi.jpg')}
                    className="h-24 w-24 rounded-md"
                    style={styles.image}
                />
                <Text className="absolute bottom-1 left-1 text-sm font-bold text-white">
                    Sushi
                </Text>
            </TouchableOpacity>
            <TouchableOpacity className="relative ml-2" 
                    onPress={ () => onPressButton("Middle Eastern") }>
                <Image 
                    source={require('../../assets/mdleastern.jpg')}
                    className="h-24 w-24 rounded-md"
                    style={styles.image}
                />
                <Text className="absolute bottom-1 left-1 text-sm font-bold text-white">
                    Middle Eastern
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        resizeMode: 'cover',
    }    
  });

export default Categories;