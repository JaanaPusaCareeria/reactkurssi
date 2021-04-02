import React, { useState } from 'react'
import './App.css'
import CustomerService from './services/customer'
 
// CustomerAdd saa parametrinä CustomerLististä lähetetyt setLisäystila, setCustomers ja customers (eli kaikki lähetetyt ei ollut tarpeellisia, setNäytetäänkö voidaan poistaa)
const CustomerAdd = ({ setLisäystila, setCustomers, customers, setMessage, setIsPositive, setShowMessage }) => {

    // state-määritykset
    // aina kun input-kentässä kirjoitetaan jotain, aina kun teksti muuttuu, se päivittyy stateen. Nämä edustaa niitä kenttiä. Vastaa tietokannan sarakkeita
    // Näistä kerätään tiedot backendiin lähetettävään objektiin

    const [newCustomerId, setNewCustomerId] = useState('')
    const [newCompanyName, setNewCompanyName] = useState('')
    const [newContactName, setNewContactName] = useState('')
    const [newContactTitle, setNewContactTitle] = useState('')

    const [newCountry, setNewCountry] = useState('')
    const [newAddress, setNewAddress] = useState('')
    const [newCity, setNewCity] = useState('')

    const [newPostalCode, setNewPostalCode] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newFax, setNewFax] = useState('')

    // lomakkeen onSubmit tapahtumankäsittelijä
    // kun painettu submit-nappulaa => form onSubmit => const SubmitCustomer
    // ei tule mitään parametriä, vaan sanotaan event.preventDefault eli vakio-normaalikäytös estetään, eli sivu ei päivity tms
    // muodostetaan newCustomer (voisi käyttää myös let tai const) ja statesta kerätään customerin kenttiin tiedot. Pitää kirjoitaa camelCasella eli oikealla kirjainkoolla
    // Employeelle tai Productille ei lähetetä id:tä, tänne on pakko lähettää tai kaatuu..?
    const SubmitCustomer = (event) => {
        event.preventDefault()
        var newCustomer = {
            customerId: newCustomerId.toUpperCase(),
            companyName: newCompanyName,
            contactName: newContactName,
            contactTitle: newContactTitle,
            country: newCountry,
            address: newAddress,
            city: newCity,
            newPostalCode: newPostalCode,
            phone: newPhone,
            fax: newFax
        }

        CustomerService
        .create(newCustomer)
        .then(response => { // koska on .then, laitetaan .catch rivillle 60, korvaa siis try-catchin
            if (response.status === 200) { //ei tarvita else-haaraa, koska jos tulee joku virhe, menee kuitenkin .catchiin
                setCustomers(customers.concat(newCustomer))
                setMessage(`Lisätty ${newCustomerId.companyName}`)
                setIsPositive(true)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 4000
                )
        } 
        })
        .catch(error => {
            setMessage(`Tapahtui virhe. Tässä lisätietoa: ${error}`)
            setIsPositive(false)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(true)
            }, 7000)
        })

        setLisäystila(false)

        // try {
        //     //Käytetään services/customer-tiedoston..
        //     CustomerService
        //     // ...create-metodia back-end http-pyyntöön
        //         .create(newCustomer)
        //     // miten saadaan näkyviin companyName (backendissa palautetaan asiakkaan companyname)
        //         // .then(data => alert(`Lisätty ${data.data}`))
        //         .then(response => console.log(response.data))
        //     // tässä muuttuu setMessage, mutta vielä ei näytetä mitään
        //     setMessage(`Lisätty ${newCustomer.companyName}`)
        //     // tässä muutetaan setIsPositiven tila
        //     setIsPositive(true)
        //     // ja tässä muutetaan setShowMessage trueksi, eli sillä hetkellä viesti tulee näkyviin
        //     setShowMessage(true)
        //     // sitten päivitetään state myös customereiden osalta
        //     setCustomers(customers.concat(newCustomer))
        //     // asetetaan set timeout, jossa asetetaan taas setShowMessage falseksi
        //     // Huom! Muita ei muuteta, koska ne muutetaan joka tapauksessa sitten kun halutaan näyttää uusi viesti
        //     setTimeout(() => {
        //         setShowMessage(false)
        //     },
        //     // 6000 millisekuntia eli kuusi sekuntia
        //         6000
        //     )
        // }
        // // myös virheenkäsittelyyn otetttu message-komponentti
        // catch {
        //     // setMessage(`Tapahtui virhe: ${e}`)
        //     // setIsPositive(false)
        //     // setShowMessage(true)
            
        //     // setTimeout(() => {
        //     //     setShowMessage(false)
        //     // },
        //     //     6000
        //     // )

        //     alert("Error happened")
        // }
        // finally {
        //     setLisäystila(false)
        // }
}

// komponentti palauttaa käyttöliittymään form-elementin, jossa on input-kentät

return (
    // kun painetaan submitnappia (onSubmit) kutsuu submitCustomeria (joka yllä)
    // Ei mene mitään parametriä tästä mukana
    <form onSubmit={SubmitCustomer}>

        {/* inputien tapahtumankäsittelijät ovat funktioita, jotka saa parametrikseen input-elementin target-tiedon.*/}
        {/* Funktiot kutsuvat setState -hookia parametrina target.value */}
        {/* placeholder on, mitä lukee kentässä "pohjalla". Ei tule erikseen otsikkotekstiä */}
        {/* Jokaisen kentän ympärillä on div, jotta ne menee päällekkäin eikä miten sattuu vierekkäin */}
        {/* Customer-tapauksessa kaikki on teksti-tyyppisiä kenttiä */}
        {/* input-kentillä muutetaan statea. Käytetään nimitystä kontrolloidut kentät, koko ajan seurataan sisältöä. */}
        {/* mahdollistaa validoinnin esim salasanassa että voidaan näyttää koko ajan, täyttääkö annettu salasana ehdot vai ei */}

        <div>
            <input type="text" value={newCustomerId} placeholder="ID with 5 capital letters" maxLength="5" minLength="5"
            onChange={({ target }) => setNewCustomerId(target.value)} required/>
        </div>
        <div>
            <input type="text" value={newCompanyName} placeholder="Company name"
            onChange={({ target }) => setNewCompanyName(target.value)} required/>
        </div>
        <div>
            <input type="text" value={newContactName} placeholder="Contact name"
            onChange={({ target }) => setNewContactName(target.value)}/>
        </div>
        <div>
            <input type="text" value={newContactTitle} placeholder="Contact title"
            onChange={({ target }) => setNewContactTitle(target.value)}/>
        </div>
        <div>
            <input type="text" value={newCountry} placeholder="Country"
            onChange={({ target }) => setNewCountry(target.value)}/>
        </div>
        <div>
            <input type="text" value={newAddress} placeholder="Address"
            onChange={({ target }) => setNewAddress(target.value)}/>
        </div>
        <div>
            <input type="text" value={newCity} placeholder="City"
            onChange={({ target }) => setNewCity(target.value)}/>
        </div>
        <div>
            <input type="text" value={newPostalCode} placeholder="Postal code"
            onChange={({ target }) => setNewPostalCode(target.value)}/>
        </div>
        <div>
            <input type="text" value={newPhone} placeholder="Phone"
            onChange={({ target }) => setNewPhone(target.value)}/>
        </div>
        <div>
            <input type="text" value={newFax} placeholder="Fax"
            onChange={({ target }) => setNewFax(target.value)}/>
        </div>

        {/* tällä subnmitoidaan koko form */}
        <button type="submit" style={{ background: 'green'}}>Create</button>

        {/* cancel-buttonissa on setLisäysTila(false), jolloin palataan asiakasnäyttöön */}
        <button onClick={() => setLisäystila(false)} style={{ background: 'red '}}>Cancel</button>

    </form>
)
}

export default CustomerAdd