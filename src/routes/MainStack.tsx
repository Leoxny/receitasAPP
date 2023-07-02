import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import { Ionicons } from '@expo/vector-icons'
import { DetailScreen } from '../screens/DetailScreen';
import { SearchScreen } from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();

export const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ title: 'Detalhes da receita' }} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ title: 'Veja o que encontramos' }} />
        </Stack.Navigator>
    );
};
