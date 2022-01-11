import api from '../api'

const getJobs = async () => {
    return api.get('/jobs')
//   return testData
}

export default getJobs
