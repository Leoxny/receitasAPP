import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStack } from "../routes/MainStack";
import { FavoritesScreen } from "../screens/FavoritesScreen";
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

export const MainTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                //tabBarActiveBackgroundColor: '#121212',

                tabBarStyle: {
                    backgroundColor: '#fff',
                    borderTopWidth: 0
                }
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={MainStack}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if(focused){
                           return <Ionicons name="home" color="#000" size={size}/>
                        }
                        return <Ionicons name="home-outline" color={color} size={size}/>
                    }
                }}
            />

            <Tab.Screen
                name="FavoritesScreen"
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if(focused){
                           return <Ionicons name="heart" color="#FF4141" size={size}/>
                        }
                        return <Ionicons name="heart-outline" color={color} size={size}/>
                    }
                }}
            />
        </Tab.Navigator>
    );
};
