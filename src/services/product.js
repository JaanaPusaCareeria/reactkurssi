import axios from 'axios'

const baseUrl = "https://localhost:5001/northwind/product"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// eslint-disable-next-line
export default { getAll }
