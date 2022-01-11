import api from '../api'

const deleteLocation = async (id) => {
    let res = {}
    try {
        res = await api.delete(`/locations/${id}`)
    } catch (e) {
        return { message: "Произошла ошибка удаления. Данная локация занята" }
    }
    return res.data
}

export default deleteLocation