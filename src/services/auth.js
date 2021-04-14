import axios from 'axios'

const url = "https://localhost:5001/northwind/authentication"

// authenticate -metodi, parametri userForAuth (voi olla ilman sulkujakin)
const authenticate = (userForAuth) => {
    // tehdänä post authentication-osoitteeseen, toisena parametrina userForAuth (jossa password ja username). 
    const request = axios.post(url, userForAuth)
    return request.then(response => response.data)
}

export default { authenticate }