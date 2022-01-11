import api from '../api'

const updateLocation = async (locationData) => {
    const { id, ...data } = locationData
    let res = {}

    for (const [key, value] of Object.entries(data)) {
        if (typeof (value) === "undefined") {
            delete data[key]
        }
    }

    try {
        res = await api.put(`/locations/${id}`, data)
    } catch(e) {
        return {message: "Произошла ошибка. Проверьте валидность данных", error: true}
    }
    return res.data

}

export default updateLocation
