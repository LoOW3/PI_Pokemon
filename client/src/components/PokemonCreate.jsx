import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { getTypes } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import styles from './PokemonCreate.module.css';
import logo from './img/pokemonLogo.png';
import creaPokemon from './img/creaPokemon.png';
import pokeball from './img/pokeball2.png';
import img from './img/imagenes';
import volver from './img/volverButton.png';
import reload from './img/reloadButton.png'

function validacion(input){
    let errors = {};
    
    if(!input.name || input.name.length < 3 ){
        errors.name = 'Introducir un nombre (mínimo 3 caracteres)'}
    if(input.hp && parseInt(input.hp) > 200){
        errors.hp = 'La vida no puede superar los 200 puntos'
    }
    if(input.hp && parseInt(input.hp) < 0){
        errors.hp = 'La vida no puede ser negativa '
    }
    if(input.attack && parseInt(input.attack) > 200){
        errors.attack = 'El ataque no pueden superar los 200 puntos'
    }
    if(input.attack && parseInt(input.attack) < 0){
        errors.attack = 'El ataque no puede ser negativo'
    }
    if(input.height && parseInt(input.height) > 30){
        errors.height = 'La altura no puede superar los 30 metros'
    }
    if(input.height && parseInt(input.height) < 0){
        errors.height = 'La altura no puede ser negativa'
    }
    if(input.weight && parseInt(input.weight) > 1000){
        errors.weight = 'El peso no puede superar los 1000 kilos'
    }
    if(input.weight && parseInt(input.weight) < 0){
        errors.weight = 'El peso no puede ser negativo'
    }
    if(input.type.length < 1){
        errors.type = 'El Pokémon debe tener al menos un tipo'
    }
    


    return errors
}

export  default function PokemonCreate(){
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.allPokemons);
    const Alltypes = useSelector((state)=> state.types);
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        sprite: "",
        type: []
    })

    useEffect(() =>{
        dispatch(getTypes())
    },[]);

    
    
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        console.log(input)
        setErrors(validacion({
            ...input,
            [e.target.name] : e.target.value
        }))
    }
    function handleSelect(e){
        if(!input.type.includes(e.target.value)){
            setInput({
                ...input,
                type: [...input.type,e.target.value]
            })
        }
        console.log(input)
    }
    function handleDelete(e){
        setInput({
            ...input,
            type: input.type.filter(t => t !== e.target.value)
        })
        return input;
        console.log(input)
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            let existe = allPokemons.filter(p=> p.name === input.name)
            if(existe.length > 0){
                return alert('Ya existe un Pokémon con ese nombre')
            }
            await axios.post('http://localhost:3001/pokemons', input)
            alert('Pokémon creado')
        } catch (error) {
            alert('No se pudo crear tu Pokémon, revisa los requisitos')
        }
        //dispatch(postPokemon,input)
        
        setInput({
            name: "",
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            sprite: "",
            type: []
        })
    }
    

    return(
        <div className={styles.container}>
            <div className={styles.containerLoading}>
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
    
            </div>
            <div className={styles.title}>
                    <img src={creaPokemon} />
            </div>
            <div className={styles.containerForm}>
                
                <div className={styles.form}>
                    
                    <form onSubmit={(e)=> handleSubmit(e)}>
                        <div className={styles.formName}>
                            <label>Nombre</label>
                            <input
                                type="text"
                                value={input.name}
                                name="name"
                                onChange={handleChange}
                            />
                            
                        </div>
                        <div className={styles.statsTitle}>Stats</div>
                        <div className={styles.scrollsContainer}>
                            <img src={img.hp} width="30px" title='hp'/>
                            <input
                                type="range"
                                min="0" max="200" step="1"
                                value={input.hp}
                                name="hp"
                                onChange={handleChange}
                                placeholder ='0-200'
                                className={styles.inputRange}
                            />
                            <div className={styles.valoresInput}>{input.hp}</div>
                            {
                            errors.hp && (
                                <p>{errors.hp}</p>
                            )
                        }
                        </div>
                        <div className={styles.scrollsContainer}>
                            <img src={img.sword} width="30px" title='attack'/>    
                            <input
                                type="range"
                                min="0" max="200" step="1"
                                value={input.attack}
                                name="attack"
                                onChange={handleChange}
                                placeholder ='0-200'
                            />
                            <div className={styles.valoresInput}>{input.attack}</div>
                            {
                            errors.attack && (
                                <p>{errors.attack}</p>
                            )
                        }
                        </div>
                        <div className={styles.scrollsContainer}>
                            <img src={img.shield} width="30px" title='defense'/>    
                            <input
                                type="range"
                                min="0" max="200" step="1"
                                value={input.defense}
                                name="defense"
                                onChange={handleChange}
                                placeholder ='0-200'
                            />
                            <div className={styles.valoresInput}>{input.defense}</div>
                        </div>
                        <div className={styles.scrollsContainer}>
                            <img src={img.speed} width="30px" title='speed'/>
                            <input
                                type="range"
                                min="0" max="200" step="1"
                                value={input.speed}
                                name="speed"
                                onChange={handleChange}
                                placeholder ='0-200'
                            />
                            <div className={styles.valoresInput}>{input.speed}</div>
                        </div>
                        <div className={styles.scrollsContainer}>
                            <img src={img.height} width="30px" title='height'/>
                            <input
                                type="range"
                                min="0" max="30" step="1" 
                                value={input.height}
                                name="height"
                                onChange={handleChange}
                                placeholder ='0-30'
                            />
                            <div className={styles.valoresInput}>{input.height}</div>
                            {
                            errors.height && (
                                <p>{errors.height}</p>
                            )
                        }
                        </div>
                        <div className={styles.scrollsContainer}>
                            <img src={img.weight} width="30px" title='weight'/>
                            <input
                                type="range"
                                min="0" max="1000" step="1"
                                value={input.weight}
                                name="weight"
                                onChange={handleChange}
                                placeholder ='0-1000'
                            />
                            <div className={styles.valoresInput}>{input.weight}</div>
                            {
                            errors.weight && (
                                <p>{errors.weight}</p>
                            )
                        }
                        </div>
                        <div className={styles.formImg}>
                            <label>Image</label>
                            <input
                                type="text"
                                value={input.sprite}
                                name="sprite"
                                onChange={handleChange}
                                placeholder="Ruta..."
                            />
                        </div>
                        <div className={styles.containerTipos}>
                            <div className={styles.formTipos}>Tipos</div>
                            <select onChange={handleSelect} className={styles.selectTipo}>
                                <option className={styles.optionTipo}>-</option>
                                {
                                    Alltypes?.map(t=>{
                                        return <option value={t.name} key={t.id} className={styles.optionTipo}>{t.name}</option>
                                    })
                                }
                            </select>
                            <div>
                                <div className={styles.tiposCreate}>{input.type.map(t=>{ return <div className={styles.containerType}><button className={styles.deleteButton} onClick={handleDelete} value={t}>x</button><img src={img[t]} width="40px" title={t}/></div> })}</div>
                            </div>
                        </div>
                    </form>
                    
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.buttonSubmit} onClick={handleSubmit}>Crear Pokémon</button>
                    <img src={pokeball} width="39px" className={styles.pokeballButton}/>
                </div>
                <div className={styles.errorContainer}>
                {
                    errors.name && (
                        <div className={styles.errorName}>{errors.name}</div>
                    )
                }
                {
                    errors.type && (
                        <div className={styles.errorType}>{errors.type}</div>
                    )
                }
                </div>
            </div>
            <div className={styles.reloadVolver}>
                {/* <a className={styles.reload} href="javascript:location.reload()">
                    <img src={reload} width="40px"/>
                </a> */}
                <Link to= '/home'>
                    <img src={volver} width="110px" className={styles.volver}/>
                </Link>
            </div>
        </div>
    )
}

