import axios from 'axios'

const baseUrl = "https://localhost:5001/northwind/product"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newProduct => {
    return axios.post(baseUrl, newProduct)
}

const remove = id => axios.delete(`${baseUrl}/${id}`)

const update = (changedProduct) => {
    return axios.put(`${baseUrl}/${changedProduct.productId}`, changedProduct)
}

// eslint-disable-next-line
export default { getAll, create, remove, update }
