import api from '../api'

const getBets = async (gameId) => {
    return api.get(`/games/${gameId}/betsTypes/`)
//   return testData
}

export default getBets
