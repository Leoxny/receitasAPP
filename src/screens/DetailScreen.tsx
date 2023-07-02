import { StyleSheet, Text, View, Pressable, ScrollView, Image, Modal, Share } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { Entypo, AntDesign, Feather } from '@expo/vector-icons'
import { Ingredients } from '../components/ingredients'
import { Intructions } from '../components/instructions'
import { Video } from '../components/video'
import { isFavorite, saveFavorites, removeItem } from '../utils/service'

export const DetailScreen = () => {

    const route = useRoute();
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false)
    const [favorite, setFavorite] = useState(false)


    useLayoutEffect(() => {

        async function getStatusFavorite() {

            console.log('route.params?.item', route.params?.item)

            const receipeFavorite = await isFavorite(route.params?.item)

            setFavorite(receipeFavorite)
        }

        getStatusFavorite();

        navigation.setOptions({
            title: route.params?.item ? route.params?.item.name : 'Detlhes da receita',
            headerRight: () => (
                <Pressable onPress={() => handlefavoritereceipe(route.params?.item)}>
                    {favorite ? (
                        <Entypo
                            name='heart'
                            size={28}
                            color="#FF4141"
                        />
                    ) : (
                        <Entypo
                            name='heart-outlined'
                            size={28}
                            color="#FF4141"
                        />
                    )}
                </Pressable>
            )
        })
    }, [navigation, route.params?.item, favorite])

    async function handlefavoritereceipe(receipe) {

        if (favorite) {
            await removeItem(receipe.id)
            setFavorite(false)
        } else {
            await saveFavorites("@appreceitas", receipe)
            setFavorite(true)
        }
    }

    const handleVideo = () => {
        setVisible(true)
    }

    const shareReceipe = async () => {
        try {
            await Share.share({
                url: "htpps://sujeitoprogramador.com.br",
                message: `Receita: ${route.params?.item.name}\nIngredientes: ${route.params?.item.total_ingredients}\nVi lá no app receita fácil`
            })
        } catch (error) {
            console.log('ERRROOOOOO', error)
        }
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 14 }}>
            <Pressable onPress={handleVideo}>
                <View style={styles.playIcon}>
                    <AntDesign name='playcircleo' size={48} color={'#fafafa'} />
                </View>
                <Image
                    source={{ uri: route.params?.item.cover }}
                    style={styles.cover}
                />
            </Pressable>

            <View style={styles.headerDetail}>
                <View>
                    <Text style={styles.title}>{route.params?.item.name}</Text>
                    <Text style={styles.ingredientsText}>Ingredientes ({route.params?.item.total_ingredients})</Text>
                </View>
                <Pressable onPress={shareReceipe}>
                    <Feather
                        name='share-2'
                        size={24}
                        color="#121212"
                    />
                </Pressable>
            </View>

            {route.params?.item.ingredients.map((item) => (
                <Ingredients data={item} key={item.id} />
            ))}

            <View style={styles.intructionsArea}>
                <Text style={styles.intructionsText}>Modo de preparo</Text>
                <Feather
                    name='arrow-down'
                    size={24}
                    color={'#fff'}
                />
            </View>

            {route.params?.item.instructions.map((item, index) => (
                <Intructions data={item} key={item.id} index={index} />
            ))}

            <Modal visible={visible} animationType='slide'>
                <Video
                    handleClose={() => setVisible(false)}
                    videoUrl={route.params?.item.video}
                />
            </Modal>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3F9FF',
        paddingTop: 14,
        paddingEnd: 14,
        paddingStart: 14
    },
    cover: {
        width: '100%',
        height: 200,
        borderRadius: 14
    },
    playIcon: {
        position: 'absolute',
        zIndex: 9,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 18,
        marginTop: 14,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4
    },
    ingredientsText: {
        marginBottom: 14,
        fontSize: 16
    },
    headerDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14
    },
    intructionsArea: {
        backgroundColor: '#4cbe6e',
        flexDirection: 'row',
        padding: 8,
        borderRadius: 4,
        marginBottom: 14
    },
    intructionsText: {
        fontSize: 18,
        fontWeight: 500,
        color: '#FFF',
        marginRight: 8
    }
})