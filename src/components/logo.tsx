import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

export const Logo = () => {
    return(
        <View style={styles.logoArea}>
            <Text>Recetia Fácil</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    logoArea: {
        backgroundColor: '#4CBE6C',
        alignSelf: 'flex-start',
        padding: 8,
        paddingLeft: 16,
        paddingRight: 20,
        borderTopRightRadius: 8,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 32,
        marginBottom: 8
    },
    logo:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    }
})