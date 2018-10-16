import md5 from 'js-md5'

const PUBLIC_KEY = '057c65a2bf6940a56c1699e0579357d4'
const PRIVATE_KEY = 'KEY'

const getHash = () => {
    const timestamp = Number(new Date())
    const hash = md5.create()
    hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)

    return hash.hex();
}

export {
    getHash,
    PUBLIC_KEY
};