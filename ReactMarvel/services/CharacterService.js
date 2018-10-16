import { getHash, PUBLIC_KEY } from './HashUtils'

const axios = require('axios')

const CharacterService = {

    findAllCharacters: () => {
        const timestamp = Number(new Date())

        const hash = getHash();

        return axios.get(`https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}&hash=${hash}`)
    }
};

export default CharacterService;