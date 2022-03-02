import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../actions";
import styles from './PokemonDetail.module.css';
import img from './img/imagenes';
import pokedex from './img/pokedex.png';
import volver from './img/volverButton.png';
import logo from './img/pokemonLogo.png';
import creaPokemon from './img/creaPokemon.png';
import pokeball from './img/pokeball2.png';
import cheems from './img/cheems.png'

export default function Detail(){
    const {id} = useParams();
    const dispatch = useDispatch();
    console.log(id)
    useEffect(()=>{
        dispatch(getDetail(id))
    },[dispatch]);

    const Pokemon = useSelector((state) => state.detail);
    
    return(
        <div>
            {
                Pokemon.length > 0 ?
                <div>
                    <div className={styles.divNav}>
                        <Link to='/home'>
                            <img src={logo} className={styles.logoPokemon} width="170px" />
                        </Link>
                    <div className={styles.bolita}></div>
                        <img src={pokeball} className={styles.pokeball} width="40px"/>
                        <Link to = '/pokemons'>
                            <img src={creaPokemon} width="230px"  className={styles.crearPokemon}/>
                        </Link>
                    </div>
                    <div className={styles.container}>
                        
                        <div>
                           { Pokemon[0].sprite?<img src={Pokemon[0].sprite} height='600px' className={styles.pokemon}/>:
                            <img src={cheems} height='600px' className={styles.pokemon}/> }
                        </div>
                        <div className={styles.info}>
                            <div className={styles.namePokemon}>{Pokemon[0].name}</div>
                            <div className={styles.containerPokedex}>
                                <img src={pokedex} width="100px" />
                            </div>
                            <div className={styles.pokedex}>ID Pokedex:{Pokemon[0].id}</div>
                            <div className={styles.tipos1}>Tipos</div>
                            <div className={styles.tipos}> {Pokemon[0].createdinDb? Pokemon[0].Types.map(t=>{return <img src={img[t.name] } key={t.name}/>}) : 
                                Pokemon[0].types.map(t =>{return <img src={img[t]} key={t} title={t}/>})}</div>
                            <div>
                                <div className={styles.stats1}>Stats</div>
                                <div>
                                    <div className={styles.stats} title='hp'><img src={img.hp} width="30px"/><div> {Pokemon[0].hp} </div></div>
                                    <div className={styles.stats} title='attack'><img src={img.sword} width="30px"/><div> {Pokemon[0].attack}</div></div>
                                    <div className={styles.stats} title='defense'><img src={img.shield} width="30px"/><div> {Pokemon[0].defense}</div></div>
                                    <div className={styles.stats} title='speed'><img src={img.speed} width="30px"/><div> {Pokemon[0].speed}</div></div>
                                    <div className={styles.stats} title='height'><img src={img.height} width="30px"/><div> {Pokemon[0].height}</div></div>
                                    <div className={styles.stats} title='weight'><img src={img.weight} width="30px"/> <div> {Pokemon[0].weight}</div></div>    
                                </div>
                            </div>
                            <Link to='/home' className={styles.buttonContainer}>
                                <img src={volver} width="100px"/>
                            </Link>
                        </div>
                    </div> 
                </div>: 'hola'
            }
        </div>
    )
}