import api from '../api'

const getEmployees = async () => {
    return api.get('/employees')
//   return testData
}

export default getEmployees
