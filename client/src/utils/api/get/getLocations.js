import api from '../api'

const getLocations = async (locationId=null) => {
    locationId = locationId ? locationId : ''
    return api.get(`/locations${locationId}`)
//   return testData
}

export default getLocations
