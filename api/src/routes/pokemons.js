const { Router } = require('express');
const axios = require('axios');
const { getAllPokemons, getPokeDetails} = require('../functions');
const {Pokemon, Type} = require('../db.js');
const router = Router();


router.get('/', async (req,res) => {
    let pokeTotal = await getAllPokemons();
    const { name } = req.query;
    if(name){
        let nombre = await getPokeDetails('throughtName', name);
        if(nombre.length){
            return res.status(200).send(nombre) 
        }
        
    }

    return res.status(200).send(pokeTotal);

})

router.get('/:id', async (req,res) => {
    const { id } = req.params;
    if(id){
        let pokeId = await getPokeDetails('throughtId', id);
        pokeId.length ?
        res.status(200).send(pokeId):
        res.status(404).send('No se encontró ningún Pokemon con ese id')
    }
    else{
        res.status(400).send('Debe introducir un id valido')
    }
})

router.post('/', async (req,res) => {
    const {name, hp, attack, defense, speed, height, weight, type, sprite  } = req.body;
    let pokeTotal = await getAllPokemons();
    let pokeFiltrado = pokeTotal.filter(p => p.name === name);
    
    if(!name){
        return res.status(400).send('Debe al menos contener un nombre');
    }
    if(pokeFiltrado.length > 0){
        return res.status(400).send('El pokemon ya existe');
    }
    const pokemonCreated = await Pokemon.create({
        name,
        hp,
        attack,
        defense, 
        speed,
        height,
        weight,
        sprite
    });
    /* const [Pokemon, created] = await Pokemon.findOrCreate({
        where: { name: params.name },
        defaults: params
    }); */
    let typeDb = await Type.findAll({
        where: { name : type}
    })
    pokemonCreated.setTypes(typeDb);
    return res.status(200).send(pokemonCreated);

})

module.exports = router;