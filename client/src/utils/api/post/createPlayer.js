import api from '../api'

const createPlayer = async (data) => {
    let res = {}

    for (const [key, value] of Object.entries(data)) {
        if (typeof (value) === "undefined") {
            return {message: "Произошла ошибка. Заполните все поля", error: true}
        }
    }
    try {
        res = await api.post('/players', data)
    } catch(e) {
        return {message: "Произошла ошибка. Проверьте валидность данных", error: true}
    }
    // return res.data
    return {message: "Новый игрок добавлен"}
}

export default createPlayer