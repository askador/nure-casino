import api from '../api'

const deleteEmployee = async (id) => {
    let res = {}
    try {
        res = await api.delete(`/employees/${id}`)
    } catch (e) {
        return { message: "Произошла ошибка удаления. Сотрудник занят" }
    }
    return res.data
}

export default deleteEmployee