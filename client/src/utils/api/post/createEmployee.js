import api from '../api'

const createEmployee = async (employeeData) => {
    let res = {}

    try {
        res = await api.post(`/employees`, employeeData, {     
            headers: { 'content-type': 'multipart/form-data' }
        })
    } catch(e) {
        return {message: "Произошла ошибка. Проверьте валидность данных", error: true}
    }
    // return res.data
    return {message: "Новый сотрудник добавлен"}

}

export default createEmployee