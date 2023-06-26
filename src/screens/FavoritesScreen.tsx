import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const FavoritesScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Página Favorito</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red'
    }
})