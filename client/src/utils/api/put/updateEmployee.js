import api from '../api'

const updateEmployee = async (id, employeeData) => {
    let res = {}

    try {
        res = await api.put(`/employees/${id}`, employeeData, {     
            headers: { 'content-type': 'multipart/form-data' }
        })
    } catch(e) {
        return {message: "Произошла ошибка. Проверьте валидность данных", error: true}
    }
    return res.data

}

export default updateEmployee