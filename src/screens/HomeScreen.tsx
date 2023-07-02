import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Logo } from '../components/logo'
import api from '../services/config'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { Text as MotiText } from 'moti'


export const HomeScreen = () => {

    const [inputValue, setInputValue] = useState("")
    const [foods, setFoods] = useState([])

    const navigation = useNavigation()

    useEffect(() => {
        fetchAPI();
    }, [])

    async function fetchAPI() {
        const response = await api.get("/foods")
        setFoods(response.data)
    }

    const handleSearch = () => {
        if (!inputValue) {
            return
        }
        let input = inputValue;
        setInputValue("")
        navigation.navigate("SearchScreen", { name: input })
        console.log('VOCÊ CLICOU NESSE BOTOU')
    }

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
            <Logo />
            <MotiText
                style={styles.title}
                from={{
                    opacity: 0,
                    translateY: 15,
                }}
                animate={{
                    opacity: 1,
                    translateY: 0
                }}
                transition={{
                    delay: 100,
                    type: "timing",
                    duration: 650
                }}
            > Encontre a receita
            </MotiText>
            <MotiText
                style={styles.title}
                from={{
                    opacity: 0,
                    translateY: 18,
                }}
                animate={{
                    opacity: 1,
                    translateY: 0
                }}
                transition={{
                    delay: 100,
                    type: "timing",
                    duration: 650
                }}
            >que combina com você
            </MotiText>

            <View style={styles.form}>
                <TextInput
                    placeholder='Digite o nome da comida'
                    style={styles.input}
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Ionicons name='search' size={28} color={"#4CBE6C"} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={foods}
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
        backgroundColor: '#F3F9FF',
        paddingTop: 36,
        paddingHorizontal: 15,
        marginHorizontal: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#0e0e0e'
    },
    form: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 8,
        marginTop: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ECECEC',
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        width: '90%',
        height: 54,
        maxWidth: '90%'
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