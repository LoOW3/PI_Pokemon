import React from "react";
import styles from './Paginado.module.css'

export default function Paginado({pokemonsPerPage, allPokemons, paginado}){
    const pageNumber = [];

    for ( let i = 0; i<= Math.floor(allPokemons/pokemonsPerPage); i++ ){
        pageNumber.push(i + 1);
    }

    return(
        <nav className={styles.container}>
            <div className={styles.paginado}>
                { 
                    pageNumber && pageNumber.map(n => {
                        return (
                            <div className="n" key={n} className={styles.pag}>
                            <a onClick={() => paginado(n)}>{n}</a>
                            </div>
                            )
                    })
                }
            </div>
        </nav>
    )
}