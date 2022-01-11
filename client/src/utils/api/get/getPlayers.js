import api from '../api'

const getPlayers = async (playerId=null) => {
    playerId = playerId ? playerId : ''
    return api.get(`/players/${playerId}`)
//   return testData
}

export default getPlayers
