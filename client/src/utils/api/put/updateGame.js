import api from '../api'

const updateGame = async (gameData) => {
    const { id, ...data } = gameData
    let res = {}

    for (const [key, value] of Object.entries(data)) {
        if (typeof (value) === "undefined") {
            delete data[key]
        }
    }

    try {
        res = await api.put(`/games/${id}`, data)
    } catch(e) {
        return {message: "Произошла ошибка. Проверьте валидность данных", error: true}
    }
    return res.data

}

export default updateGame
