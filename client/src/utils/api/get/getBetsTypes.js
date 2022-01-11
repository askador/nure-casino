import api from '../api'

const getBetsTypes = async () => {
    return api.get('/betsTypes')
//   return testData
}

export default getBetsTypes
