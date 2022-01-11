import api from '../api'

const deleteBet = async (id) => {
    let res = {}
    try {
        res = await api.delete(`/bets/${id}`)
    } catch (e) {
        return { message: "Произошла ошибка удаления" }
    }
    return res.data
}

export default deleteBet