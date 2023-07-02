import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'

import api from '../services/config'
import { LinearGradient } from 'expo-linear-gradient'

export const SearchScreen = () => {

    const route = useRoute();
    const [receipes, setReceipes] = useState([])
    const navigation = useNavigation()

    useEffect(() => {

        async function fetchReceipes() {
            const response = await api.get(`/foods?name_like=${route.params?.name}`)
            setReceipes(response.data)
        }

        fetchReceipes();

    }, [route.params?.name])

    const renderItem = ({ item }) => {

        const handleNavigate = () => {
            navigation.navigate("DetailScreen", { item: item })
        }

        return (
            <TouchableOpacity style={styles.containerView} onPress={handleNavigate}>
                <Image
                    source={{ uri: item.cover }}
                    style={styles.cover}
                />
                <View style={styles.info}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.description}>{item.total_ingredients} ingredoemtes | {item.time} min</Text>
                </View>
                <LinearGradient
                    style={styles.gradient}
                    colors={['transparent', 'rgba(0,0,0, 0.70)', 'rgba(0,0,0, 0.95)']}
                />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={receipes}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => <Text style={styles.text}>Não encontramos o que está buscando...</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f3f9ff",
        paddingTop: 14,
        paddingEnd: 14,
        paddingStart: 14
    },
    containerView: {
        marginBottom: 14
    },
    cover: {
        width: '100%',
        height: 200,
        borderRadius: 14,
    },
    info: {
        position: 'absolute',
        bottom: 14,
        left: 14,
        zIndex: 99
    },
    name: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    },
    description: {
        color: '#fff'
    },
    gradient: {
        position: 'absolute',
        left: 0.,
        right: 0,
        bottom: 0,
        height: '55%',
        borderRadius: 14,
        zIndex: 1,
        backgroundColor: 'transparent'
    },
    text:{
        fontSize: 16,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})