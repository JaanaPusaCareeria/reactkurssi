// Tämän tiedoston tehtävänä on axios-kirjaston avulla tehdä backendiin kohdistuvia http-pyyntöjä
// Axios muuntaa automaattisesti javascriptin JSONiksi ja toisinpäin
// Ne voisi olla myös muissa tiedostoissa
// tätä tiedostoa ei koskaan piirretä näytölle, tämä tekee vain backendpyynnöt ja tätä käytetään muualta ohjelmasta
import axios from 'axios'

// Mistä tietää, mikä osoite pitää laittaa tähän? Nyt se on otettu rest-projektin kautta..
// const-muuttujan arvoa ei voi muuttaa, muuten kuten let-muuttuja, eli arvo on voimassa vain lohko sisäpuolella
// luodaan tässä muuttuja siksi, että voidaan metodeissa viitata muuttujaan eikä tarvitse aina laittaa erikseen osoitetta
const baseUrl = "https://localhost:5001/northwind/customer"

let token = null

// Tämä on metodi, jota kutsutaan aina ennen kuin tehdään muu pyyntö serviceen
// Parametrinä annetaan token, joka otetaan local storagesta
// ottaa parametriksi newTokenin ja muodostaa stringin jossa on bearer -sana + token-merkkijono 
const setToken = newToken => {
    token = `bearer ${newToken}`
}

// Token liitetään metodeissa mukaan pyyntöön config-objektin muodossa

const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}

// tänne lähetetään parametrina newCustomer (sen voisi laittaa myös sulkeisiin)
// ensimmäinen parametri on mihin lähetetään (baseUrl) ja sitten mitä lähetetään (newCustomer)
const create = newCustomer => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newCustomer, config)
}

// deletessä on vain yksi parametri, koko url johon tässä liitettynä id eli esim northwind/customers/AAAYY
const remove = id => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

// put pyyntö backendille, ensimmäisenä parametrina url-osoite eli koko url northwind/customer/customerid ja toisena parametrinä se, mitä laitetaan 
// body-osaaan put pyyntöön eli changedCustomer eli koko muokattu customer-objektic
const update = changedCustomer => {
    const config = {
        headers: { Authorization: token },
    }   
    return axios.put(`${baseUrl}/${changedCustomer.customerId}`, changedCustomer, config)
}

// eslint-disable-next-line
export default { getAll, create, remove, update, setToken }

