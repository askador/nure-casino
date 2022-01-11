import api from '../api'

const deletePlayer = async (id) => {
    let res = {}
    try {
        res = await api.delete(`/players/${id}`)
    } catch (e) {
        return { message: "Произошла ошибка удаления. Данный игрок занята" }
    }
    return res.data
}

export default deletePlayer