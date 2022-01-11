import api from '../api'

const getBets = async () => {
    return api.get('/bets')
//   return testData
}

export default getBets
