import { getHash, PUBLIC_KEY } from './HashUtils'

const axios = require('axios')

const CharacterService = {

    findAllCharacters: (pageNumber = 1) => {
        const timestamp = Number(new Date())

        const limit = pageNumber * 10;
        const offset = limit - 10;

        const hash = getHash();

        return axios.get(`https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&orderBy=name&limit=${limit}&offset=${offset}&apikey=${PUBLIC_KEY}&hash=${hash}`)
    }
};

export default CharacterService;