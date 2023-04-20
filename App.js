import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Provider } from "react-redux";
import { store } from './store';

import Home from './src/screens/HomeScreen';
import ResultsShow from './src/screens/ResultsShowScreen';
import Basket from './src/screens/BasketScreen';
import Preparing from './src/screens/PreparingScreen';
import Delivery from './src/screens/DeliveryScreen';
import MapViewLocation from './src/screens/MapViewLocationScreen';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import Toast from 'react-native-toast-message';
import toastConfig from './src/components/ToastConfig';

const Stack = createNativeStackNavigator();

export default function App(){
  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <Provider store={store}>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="ResultsShow" component={ResultsShow} />
              <Stack.Screen name="MapView" component={MapViewLocation} options={{ headerShown: false}} />
              <Stack.Screen name="Basket" component={Basket} options={{ presentation: "modal", headerShown: false}} />
              <Stack.Screen name="Preparing" component={Preparing} options={{ presentation: "fullScreenModal", headerShown: false }} />
              <Stack.Screen name="Delivery" component={Delivery} options={{ presentation: "fullScreenModal", headerShown: false }} />
            </Stack.Navigator>
          </Provider>
        </NavigationContainer>
      </BottomSheetModalProvider>
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  )
};
