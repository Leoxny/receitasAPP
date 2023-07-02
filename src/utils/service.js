import AsyncStorage from "@react-native-async-storage/async-storage";

//Buscar os favoritos
//Salvar um novo favorito
//Remover um favorito da lista

export async function getFavorites(key) {

    const favorites = await AsyncStorage.getItem(key)
    return JSON.parse(favorites) || []; // me retorna a minha lista dos favorites ou um array vazio

}

export async function saveFavorites(key, newItem) {

    let myFavorites = await getFavorites(key)

    let hasItem = myFavorites.some(item => item.id === newItem.id) //verifica se pelo menos existe alguma coisa no array

    if (hasItem) {
        console.log('ESSE ITEM JA ESTA SALVO NA SUA LISTA')
        return;
    }

    myFavorites.push(newItem) // adiciona um novo item no array (push)

    await AsyncStorage.setItem(key, JSON.stringify(myFavorites)) // salvar algo no asyncStorage
    console.log('SALVO COM SUCESSO!')

}

export async function removeItem(id) {

    let receipes = await getFavorites('@appreceitas')

    let myFavorites = receipes.filter(item => { // filtra com os itens salvos na lista 
        return (item.id !== id)
    })

    await AsyncStorage.setItem('@appreceitas', JSON.stringify(myFavorites))
    console.log("ITEM DELETADO COM SUCESSO")
    return myFavorites;

}

export async function isFavorite(receipe) {

    let myReceipes = await getFavorites("@appreceitas")

    const favorite = myReceipes.find(item => item.id === receipe.id) // verifica se já tem esse item na lista

    if (favorite) {
        return true;
    }

    return false;
}