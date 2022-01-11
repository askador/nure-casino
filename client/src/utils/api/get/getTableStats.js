import api from '../api'

const getTableStats = async (id, date) => {
    // console.log(date.toISOString())
    return api.get(`/tables/stats/${id}?date=${date.toISOString()}`)
//   return testData
}

export default getTableStats
