import { getHash, PUBLIC_KEY } from './HashUtils'

const axios = require('axios') 

const CharacterService = {

    findAllCharacters: (pageNumber = 0) => {
        const timestamp = Number(new Date())

        const limit = 100;
        const offset = pageNumber < 5 ? pageNumber * 20 : 100;

        const hash = getHash();

        return axios.get(`https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&orderBy=name&limit=${limit}&offset=${offset}&apikey=${PUBLIC_KEY}&hash=${hash}`)
    }
};

export default CharacterService;