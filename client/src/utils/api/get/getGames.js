import api from '../api'

const getGames = async (id) => {
    id = id ? id : ''
    return(api.get(`/games/${id}`))
//   return testData
}

export default getGames
