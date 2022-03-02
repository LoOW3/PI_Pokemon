const { Pokemon, Type } = require("../db.js");
const axios = require('axios');


const getApiInfo = async () => {
    let apiInfo = await axios.get('https://pokeapi.co/api/v2/pokemon');
    let apiInfoNext = await axios.get(apiInfo.data.next);
    let apiInfoTotal = apiInfo.data.results.concat(apiInfoNext.data.results);
	let img = 'official-artwork'
    for (let p of apiInfoTotal)  {
		let pInfo = await axios.get(p.url);
		pInfo = pInfo.data;
		p.id = pInfo.id;
		p.hp = pInfo.stats[0].base_stat;
		p.attack = pInfo.stats[1].base_stat;
		p.defense = pInfo.stats[2].base_stat;
		p.speed = pInfo.stats[5].base_stat;
		p.height = pInfo.height;
		p.weight = pInfo.weight;
		p.types = pInfo.types.map((p) => {
			return p.type.name;
		});
		p.sprite = pInfo.sprites.other[img].front_default;
		delete p.url;
	}

    return apiInfoTotal;
}
/* const getApiInfo = async () =>{
	let apiInfo = await axios.get('https://pokeapi.co/api/v2/pokemon');
    let apiInfoNext = await axios.get(apiInfo.data.next);
    let apiInfoTotal = apiInfo.data.results.concat(apiInfoNext.data.results);
	let apiResults = apiInfoTotal.map(data => data.url);
	let apiInfoTotal1 = await axios.all(apiResults.map((pInfo) => axios.get(pInfo))).then(
		axios.spread(function(res){
			console.log(res)
		}))
		
	return apiInfoTotal1;
} */

const apiInfo = getApiInfo();

const getDbInfo = async () =>{
    return await Pokemon.findAll({
		include: {
			model: Type,
			attributes: ['name'],
			through: {
				attributes: [],
			},
		},
	});
}
const getAllPokemons = async () => {
    let pokeApi = await apiInfo;
    let pokeDb = await getDbInfo(); 
    let pokeTotal =[...pokeApi,...pokeDb]; // pokeApi.concat(pokeDb) 
    return pokeTotal;
}

const getPokeDetails = async (through, info) =>{
	let pokeTotal = await getAllPokemons();
	if(through === 'throughtName'){
		return pokeTotal.filter(p => p.name === info.toLowerCase());
	}
	if(through === 'throughtId'){
		
		return pokeTotal.filter(p => p.id.toString() === info);
	}
	return pokeTotal;
	
}


module.exports = {
    getApiInfo,
    getDbInfo,
    getAllPokemons,
	getPokeDetails
}