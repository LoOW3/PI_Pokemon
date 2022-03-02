const {Router} = require('express');
const {Type} = require('../db');
const router = Router();
const axios = require('axios');

router.get('/', async (req,res) => {
    let types = await axios.get('https://pokeapi.co/api/v2/type');

    types = types.data.results;
    let typesNames = [];
    
    for(let i = 0; i < types.length; i++){

        typesNames.push(types[i].name);
    }

    typesNames.forEach(t => {
        Type.findOrCreate({
            where:{ name : t}
        })
    })

    const allTypes = await Type.findAll();
    res.status(200).send(allTypes)
})

module.exports = router;
