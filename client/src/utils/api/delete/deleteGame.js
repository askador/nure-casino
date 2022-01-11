import api from '../api'

const deleteGame = async (id) => {
    let res = {}
    try {
        res = await api.delete(`/games/${id}`)
    } catch (e) {
        return { message: "Произошла ошибка удаления. Данная локация занята" }
    }
    return res.data
}

export default deleteGame