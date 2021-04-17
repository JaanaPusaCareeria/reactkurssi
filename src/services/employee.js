import axios from 'axios'

const baseUrl = "https://localhost:5001/northwind/employee"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newEmployee => {
    return axios.post(baseUrl, newEmployee)
}

const remove = id => axios.delete(`${baseUrl}/${id}`)

const update = (changedEmployee) => {
    return axios.put(`${baseUrl}/${changedEmployee.employeeId}`, changedEmployee)
}

// eslint-disable-next-line
export default { getAll, create, remove, update }

