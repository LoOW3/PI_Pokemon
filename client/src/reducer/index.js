
const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    detail: []
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_POKEMONS':
            return{
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case 'GET_TYPES':
            return{
                ...state,
                types: action.payload
            }
        case 'FILTER_BY_TYPE':
            const allPokemons = state.allPokemons;
            const filtered = []
            for(let i = 0; i<allPokemons.length;i++){
                if(allPokemons[i].createdinDb === true){
                    let filtradosDB = allPokemons[i].Types.filter(t=> t.name === action.payload)
                    if(filtradosDB.length >= 1){
                         filtered.push(allPokemons[i])
                    }
                }
                if(allPokemons[i].types){
                    if(allPokemons[i].types.includes(action.payload)){
                         filtered.push(allPokemons[i])}
                         
                        
                }
                
            }
            const filtredPokemons= action.payload === 'all' ? allPokemons : filtered; 
            console.log(filtered)
            return{
                ...state,
                pokemons: filtredPokemons
            }
        case 'FILTER_CREATED':
            const allPokemons2 = state.allPokemons;
            const createdFilter = action.payload === 'fromDb' ? allPokemons2.filter(p => p.createdinDb) :
                  allPokemons2.filter(p => !p.createdinDb);
            return{
                ...state,
                pokemons: action.payload === 'all'? allPokemons2 : createdFilter
            }
        case 'GET_NAME_POKEMONS':
            return{
                ...state,
                pokemons: action.payload
            }
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ?
            state.pokemons.sort(function(a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1;
                }
                if(b.name.toLowerCase() > a.name.toLowerCase()){
                    return -1;
                }
                return 0;
            }) :
            state.pokemons.sort(function(a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return -1;
                }
                if(b.name.toLowerCase() > a.name.toLowerCase()){
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                pokemons: sortedArr
            }
        case 'ORDER_BY_ATTACK':
            let sortedArr2 = action.payload === 'AttackDesc' ?
            state.pokemons.sort(function(a,b){
                if(a.attack > b.attack){
                    return 1;
                }
                if(b.attack > a.attack){
                    return -1;
                }
                return 0;
            }) :
            state.pokemons.sort(function(a,b){
                if(a.attack > b.attack){
                    return -1;
                }
                if(b.attack > a.attack){
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                pokemons: sortedArr2
            }
        case 'GET_DETAIL':
            return{
                ...state,
                detail: action.payload
            }
        

        default: return state;
    }
}

export default rootReducer;