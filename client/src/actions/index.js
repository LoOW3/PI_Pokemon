import axios from 'axios';

export function getPokemons(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/pokemons');
        return dispatch({
            type:'GET_POKEMONS',
            payload: json.data
        })
    }
}
export function getTypes(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/types');
        return dispatch({
            type: 'GET_TYPES',
            payload: json.data
        })
    }
}

export function filterByType(payload){
    return{
        type: 'FILTER_BY_TYPE',
        payload: payload
    }
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}
export function orderByAttack(payload){
    return{
        type: 'ORDER_BY_ATTACK',
        payload
    }
}

export function getNamePokemon(name){
    return async function (dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            return dispatch({
                type: 'GET_NAME_POKEMONS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export function getDetail(id){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/pokemons/${id}`)
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }

}

