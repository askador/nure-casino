import api from '../api'

const deleteBetType = async (id) => {
    let res = {}
    try {
        res = await api.delete(`/betsTypes/${id}`)
    } catch (e) {
        return { message: "Произошла ошибка удаления" }
    }
    return res.data
}

export default deleteBetType