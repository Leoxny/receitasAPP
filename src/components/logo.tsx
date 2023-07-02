import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { View } from "moti"

export const Logo = () => {
    return (
        <View
            style={styles.logoArea}
            from={{
                opacity: 0,
                translateX: -50,
            }}
            animate={{
                opacity: 1,
                translateX: 0
            }}
            transition={{
                type: "spring",
                duration: 850
            }}
        >
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
    logo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
    }
})