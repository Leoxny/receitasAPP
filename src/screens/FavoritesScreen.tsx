import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getFavorites } from '../utils/service'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

export const FavoritesScreen = () => {

    const [receipes, setReceipes] = useState([])
    const isFocused = useIsFocused();
    const navigation = useNavigation()


    useEffect(() => {
        let isActive = true

        async function getreceipes() {
            const favorites = await getFavorites("@appreceitas")
            if (isActive) {
                setReceipes(favorites)
            }
        }

        if (isActive) {
            getreceipes()
        }

        return () => {
            isActive = false
            console.log("SAIU DA TELA")
        }

    }, [isFocused]) // quando essa propriedade mudar esse useEffect e chamado de novo

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
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Receitas Favoritas</Text>

            {receipes.length === 0 && (
                <Text>Você não tem nenhuma receita salva</Text>
            )}

            <FlatList
                data={receipes}
                style={{marginTop: 14}}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F9FF",
        paddingTop: 36,
        paddingEnd: 14,
        paddingStart: 14
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 24
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
    }
})