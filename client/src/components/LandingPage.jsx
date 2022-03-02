import React from "react";
import { Link } from "react-router-dom";
import logo from './img/pokemonLogo.png'
import styles from './LandingPage.module.css'
import pokeball from './img/pokeball2.png'
import catchem from './img/chatchem.png';

export default function LandingPage(){
    return(
        <div className={styles.container}>
            <div className={styles.info}>
                <img src={logo} className={styles.pokemon}/>
                
                <Link to='/home' className={styles.toHome}>
                    <div>
                        <img  src={catchem} className={styles.catchem}/>
                    </div>
                    <div className={styles.pokeball}>
                        <img src={pokeball} /> 
                    </div>
                </Link>
            </div>
        </div>
    )
}