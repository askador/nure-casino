import api from '../api'

const getCroupiers = async () => {
    return api.get('/employees/croupiers')
//   return testData
}

export default getCroupiers
