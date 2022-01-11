import api from '../api'

const updateTable = async (tableData) => {
    const { id, ...data } = tableData
    let res = {}

    for (const [key, value] of Object.entries(data)) {
        if (typeof (value) === "undefined") {
            delete data[key]
        }
    }

    try {
        res = await api.put(`/tables/${id}`, data)
    } catch(e) {
        return {message: "Произошла ошибка. Проверьте валидность данных", error: true}
    }
    return res.data

}

export default updateTable
