// Tämän tiedoston tehtävänä on axios-kirjaston avulla tehdä backendiin kohdistuvia http-pyyntöjä
// Axios muuntaa automaattisesti javascriptin JSONiksi ja toisinpäin
// Ne voisi olla myös muissa tiedostoissa
import axios from 'axios'

// Mistä tietää, mikä osoite pitää laittaa tähän? Nyt se on otettu rest-projektin kautta..
// const-muuttujan arvoa ei voi muuttaa, muuten kuten let-muuttuja, eli arvo on voimassa vain lohko sisäpuolella
// luodaan tässä muuttuja siksi, että voidaan metodeissa viitata muuttujaan eikä tarvitse aina laittaa erikseen osoitetta
const baseUrl = "https://localhost:5001/northwind/customer"

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}


export default getAll