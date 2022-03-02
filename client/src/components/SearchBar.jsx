import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNamePokemon, getPokemons} from "../actions";
import pokeball from './img/pokeball2.png';
import styles from './SearchBar.module.css';
import reload from './img/reloadButton.png'


export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const allPokemons = useSelector((state) => state.allPokemons);

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value)
        
        
    }
    function handleSubmit(e){
        e.preventDefault();
        let names = allPokemons.map(p => p.name)
        if(name.length === 0){ return dispatch(getNamePokemon(name.toLocaleLowerCase()))}
        if(!names.includes(name)){ return alert('No existe ese Pokémon')}
        
        dispatch(getNamePokemon(name.toLocaleLowerCase()))
    }
    function handleReload(e){
        e.preventDefault();
        setName('');
        dispatch(getNamePokemon(name.toLocaleLowerCase()))
    
    }

    return(
        <div className={styles.container} >
            
            <a className={styles.reload} href="javascript:location.reload()">
                <img src={reload} width="32px"/>
            </a>
            <input 
            type = 'text'
            placeholder="Buscar..."
            onChange={e => handleInputChange(e)}
            className={styles.input}
            />
            <button type="submit" onClick={e => handleSubmit(e)} className={styles.buttonSubmit}><img src={pokeball} width="30px"/></button>
        </div>
    )
}   
