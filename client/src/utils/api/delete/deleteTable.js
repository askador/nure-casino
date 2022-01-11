import api from '../api'

const deleteTable = async (id) => {
    let res = {}
    try {
        res = await api.delete(`/tables/${id}`)
    } catch (e) {
        return { message: "Произошла ошибка удаления. Стол занят" }
    }
    return res.data
}

export default deleteTable