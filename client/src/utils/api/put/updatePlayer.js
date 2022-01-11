import api from '../api'

const updatePlayer = async (playerData) => {
    const { id, ...data } = playerData
    let res = {}

    for (const [key, value] of Object.entries(data)) {
        if (typeof (value) === "undefined") {
            delete data[key]
        }
    }

    try {
        res = await api.put(`/players/${id}`, data)
    } catch(e) {
        return {message: "Произошла ошибка. Проверьте валидность данных", error: true}
    }
    return res.data

}

export default updatePlayer
