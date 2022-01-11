import api from '../api'

const getPlayerBets = async (playerId, date, tableId) => {
    return api.get(`/bets?playerId=${playerId}&date=${date.toISOString()}&tableId=${tableId}`)
//   return testData
}

export default getPlayerBets
