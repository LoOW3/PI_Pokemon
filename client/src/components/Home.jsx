import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes, filterByType, filterCreated, orderByName, orderByAttack} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from './Home.module.css';
import logo from './img/pokemonLogo.png';
import creaPokemon from './img/creaPokemon.png';
import pokeball from './img/pokeball2.png';
import loading from './img/walkingGif.gif';
import volver from './img/volverButton.png';

export default function Home(){

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const allTypes = useSelector((state) => state.types);
    const [currentPage,setCurrentPage] = useState(1);
    const [pokemonsPerPage,setPokemonsPerPage] = useState(12);
    const [orden,setOrden] = useState('')
    const [ordenAttack,setOrdenAttack] = useState('')
    const idOfLastPokemon = currentPage * pokemonsPerPage;
    const idOfFirstPokemon = idOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(idOfFirstPokemon,idOfLastPokemon);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    
    useEffect(() =>{
        dispatch(getPokemons())
    },[dispatch])

    useEffect(() =>{
        dispatch(getTypes())
    },[dispatch])

    function handleFilterByType(e){
        dispatch(filterByType(e.target.value))
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }
    function handleOrderByName(e){
        e.preventDefault();
        
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(e.target.value)

    }
    function handleOrderByAttack(e){
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setCurrentPage(1);
        setOrdenAttack(e.target.value)

    }


    return (
        allPokemons.length > 0?
           
            <div>
                <div className={styles.divNav}>
                    <Link to='/'>
                        <img src={logo} className={styles.logoPokemon} width="170px" />
                        </Link>
                    <div className={styles.bolita}></div>
                    <img src={pokeball} className={styles.pokeball} width="40px"/>
                    <Link to = '/pokemons'>
                        <img src={creaPokemon} width="230px"  className={styles.crearPokemon}/>
                    </Link>
                </div>
                
                
                <div className={styles.buttonsContainer}>
                    
                    <Paginado 
                            pokemonsPerPage={pokemonsPerPage}
                            allPokemons={allPokemons.length}
                            paginado = {paginado} 
                            key={1}
                            />
                    <div className={styles.filtros}>
                        <div className={styles.attackContainer}>
                            <label>Attack</label>
                            <select onChange={e => handleOrderByAttack(e)} className={styles.select}>
                                <option>-</option>
                                <option value = 'AttackAsc'>Strongest firts</option>
                                <option value = 'AttackDesc'>Weakest first</option>
                            </select>
                        </div>
                        <div className={styles.alphContainer}>
                            <label>Alphabetically</label>
                            <select onChange={e => handleOrderByName(e)} className={styles.select}>
                                <option>-</option>
                                <option value = 'asc'>A-Z</option>
                                <option value = 'desc'>Z-A</option>
                            </select>
                        </div>
                        {/* <div className={styles.space}></div> */}
                        <div className={styles.fromContainer}>
                            <label>From</label>
                            <select onChange={e => handleFilterCreated(e)} className={styles.select}>
                                <option value = 'all'>Todos</option>
                                <option value = 'fromDb'>Creado por tí</option>
                                <option value = 'fromApi'>Existentes</option>
                            </select>
                        </div>
                        <div className={styles.typeContainer}>
                            <label>Type</label>
                            <select onChange={e => handleFilterByType(e)} className={styles.select}> 
                                <option value ='all'>All</option>
                                {
                                    allTypes?.map(t =>{
                                        return(
                                            <option key={t.id} value={t.name}>
                                                {t.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        
                    </div>
                    <SearchBar />
                    
                </div>
                <div className={styles.cardContenedor}>
                {
                    currentPokemons?.map(p => {
                        return (
                            <div className={styles.cardContainer}>
                                <Link to = {`/pokemons/${p.id}`} className={styles.link}>
                                    <Card name={p.name}  sprite={p.sprite}  types ={p.types? p.types : p.Types.map(t=>{return t.name})} key={p.id} />
                                </Link>
                            </div>
                    )})
                }
                </div>
            </div>
            :
            <div className={styles.containerLoading}>
                <div className={styles.divNav}>
                    <Link to='/'>
                        <img src={logo} className={styles.logoPokemon} width="170px" />
                        </Link>
                    <div className={styles.bolita}></div>
                    <img src={pokeball} className={styles.pokeball} width="40px"/>
                    <Link to = '/pokemons'>
                        <img src={creaPokemon} width="230px"  className={styles.crearPokemon}/>
                    </Link>
                </div>
                <div>
                    
                    <div className={styles.notFoundText}>
                        Not Found...
                    </div>
                    <div className={styles.loading}>
                        <img src={loading} width="900px" className={styles.loadingGif}/>
                    </div>
                    <div className={styles.volverButtonLoading}>
                        <a href="javascript:location.reload()">
                            <img src={volver} width="100px"/>
                        </a>
                    </div>
                </div>
                
            </div>
        
    )
}