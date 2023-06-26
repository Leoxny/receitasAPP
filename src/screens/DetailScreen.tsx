import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export const DetailScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Página Home</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red'
    }
})