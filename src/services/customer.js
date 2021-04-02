// Tämän tiedoston tehtävänä on axios-kirjaston avulla tehdä backendiin kohdistuvia http-pyyntöjä
// Axios muuntaa automaattisesti javascriptin JSONiksi ja toisinpäin
// Ne voisi olla myös muissa tiedostoissa
// tätä tiedostoa ei koskaan piirretä näytölle, tämä tekee vain backendpyynnöt ja tätä käytetään muualta ohjelmasta
import axios from 'axios'

// Mistä tietää, mikä osoite pitää laittaa tähän? Nyt se on otettu rest-projektin kautta..
// const-muuttujan arvoa ei voi muuttaa, muuten kuten let-muuttuja, eli arvo on voimassa vain lohko sisäpuolella
// luodaan tässä muuttuja siksi, että voidaan metodeissa viitata muuttujaan eikä tarvitse aina laittaa erikseen osoitetta
const baseUrl = "https://localhost:5001/northwind/customer"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// tänne lähetetään parametrina newCustomer (sen voisi laittaa myös sulkeisiin)
// ensimmäinen parametri on mihin lähetetään (baseUrl) ja sitten mitä lähetetään (newCustomer)
const create = newCustomer => {
    return axios.post(baseUrl, newCustomer)
}

// deletessä on vain yksi parametri, koko url johon tässä liitettynä id eli esim northwind/customers/AAAYY
const remove = id => axios.delete(`${baseUrl}/${id}`)

// eslint-disable-next-line
export default { getAll, create, remove }

