import api from '../api'

const updateBetType = async (betTypeData) => {
    const { id, ...data } = betTypeData
    let res = {}

    for (const [key, value] of Object.entries(data)) {
        if (typeof (value) === "undefined") {
            delete data[key]
        }
    }

    try {
        res = await api.put(`/betsTypes/${id}`, data)
    } catch(e) {
        return {message: "Произошла ошибка. Проверьте валидность данных", error: true}
    }
    return res.data

}

export default updateBetType
