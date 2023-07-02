import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

export const Intructions = ({data, index}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{index+1}-</Text>
            <Text style={styles.text}>{data.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        padding: 8,
        marginBottom: 14
    },
    name:{
        fontWeight: 'bold',
        fontSize: 18,
    },
    text:{
        lineHeight: 20,
        top: 2,
        left: 3
    }
})