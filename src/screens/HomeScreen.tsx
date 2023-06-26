import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Logo } from '../components/logo'
import api from '../services/config'

export const HomeScreen = () => {

    const [inputValue, setInputValue] = useState("")
    const [foods, setFoods] = useState([])

    useEffect(() => {
        fetchAPI();
    }, [])

    async function fetchAPI() {
        const response = await api.get("/foods")
        setFoods(response.data)
    }

    const handleSearch = () => {
        console.log('VOCÊ CLICOU NESSE BOTOU')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Logo />
            <Text style={styles.title}>Encontre a receita</Text>
            <Text style={styles.title}>que combina com você</Text>

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
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F9FF',
        paddingTop: 36,
        paddingHorizontal: 15
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
    }
})