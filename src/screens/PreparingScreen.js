import React, { useEffect } from 'react';
import { StyleSheet, Image, SafeAreaView, StatusBar, View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PreparingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
        navigation.navigate("Delivery");
    }, 3500);
  }, []);

  return (
    <SafeAreaView style={styles.container} className="bg-[#84d9f3] items-center">
        <View className="flex-1 justify-center">
            <Text className="text-lg my-10 text-white font-bold">Waiting for Restaurant to accept your order!</Text>
            <ActivityIndicator size="large" color="#ffffff" />
        </View>
        <View className="flex-1 bg-[#84d9f3] items-end">
            <Image 
                className="flex-1 h-96 w-96"
                source={require("../../assets/TPPX.gif")} />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:StatusBar.currentHeight
  }
});

export default PreparingScreen;
