import React from "react";
import styles from './Card.module.css';
import img from './img/imagenes'
import cheems from './img/cheems.png'

export default function Card({name, sprite, types}){
    return (
        <div className={styles.div} >
            <div className={styles.imgBack}>
                {sprite? <img src={sprite} alt='img' width='300px' key={sprite.length}/> : <img src={cheems} alt='img not found' width='300px' key={sprite.length}/>}
            </div>
            <div className={styles.nombrePokemon}>
                <p className={styles.name}>{name}</p>
            </div>
            <div className={styles.tipos}>
                {
                    types?.map(t => {
                        
                        return(
                            
                         <img src={img[t]} key={t} title={t}/>
                        )
                    })
                } 
            </div>
        </div>
    )
}
