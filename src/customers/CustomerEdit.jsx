import React, { useState } from 'react'
import '../App.css'
import CustomerService from '../services/customer'

// Hyvin samankaltainen kuin Add-toiminto. Erona se, että muokattavaCustomer on tullut pohjatiedoksi ja alustetaan sen tiedot stateihin
// input-kenttiin tulee valmiina lähtötiedot
const CustomerEdit = ({ setMuokkaustila, setCustomers, customers, setMessage, setShowMessage, setIsPositive, muokattavaCustomer }) => {

    // State-määritykset, joissa muokattavan customerin tiedot asetetaan pohjatiedoiksi

    const [newCustomerId, setNewCustomerId] = useState(muokattavaCustomer.customerId)
    const [newCompanyName, setNewCompanyName] = useState(muokattavaCustomer.companyName)
    const [newContactName, setNewContactName] = useState(muokattavaCustomer.contactName)
    const [newContactTitle, setNewContactTitle] = useState(muokattavaCustomer.contactTitle)

    const [newCountry, setNewCountry] = useState(muokattavaCustomer.country)
    const [newAddress, setNewAddress] = useState(muokattavaCustomer.address)
    const [newCity, setNewCity] = useState(muokattavaCustomer.city)

    const [newPostalCode, setNewPostalCode] = useState(muokattavaCustomer.postalCode)
    const [newPhone, setNewPhone] = useState(muokattavaCustomer.phone)
    const [newFax, setNewFax] = useState(muokattavaCustomer.fax)

    // muokkauslomakkeen onSubmit-tapahtumankäsittelijä, samalla periaatteella kuin CustomerAddissa
    const SubmitCustomer = (event) => {
        event.preventDefault()
        var changedCustomer = {
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
    
        // Lähetetään servicelle token ennen kuin tehdään update-pyyntö serviceen
        const jwt = localStorage.getItem('token')
        CustomerService.setToken(jwt)

    CustomerService
        .update(changedCustomer) //put pyyntö backendille, viittaa update-metodiin customer.js:ssä
        .then(response => {

            if (response.status === 200) {

                const id = changedCustomer.customerId

                //poistetaan ensin vanha customer statesta. Nämä ei olisi välttämättömiä tehdä, koska kuitenkin päivitetään tilanne tietokannasta.
                setCustomers(customers.filter(filtered => filtered.customerId !== id))
                //ja lisätään uudestaan muuttuneilla tiedoilla
                setCustomers(customers.concat(changedCustomer))

                setMessage(`Päivitetty ${changedCustomer.companyName}`)
                setIsPositive(true)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 4000);
            } // if päättyy
        }) //.then päättyy
        .catch(error => {
            setMessage(`Tapahtui virhe. Tässä lisätietoa: ${error}`)
            setIsPositive(false)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            }, 7000);
        }) //.catch päättyy

        // ennen kuin laitetaan muokkaustila falseksi, odotetaan puoli sekuntia jotta tietokantatallennus ehtii mennä läpi ja kun ladataan sieltä tilanne, se on oikein
        // react on niin nopea, että ilman tätä saattaisi tulla vielä vanha tilanne
        setTimeout(() => {
            setMuokkaustila(false)
        }, 500);

    } //SubmitCustomer päättyy

        // komponentti palauttaa käyttöliittymään form-elementin
        // Lisätty required kahteen ensimmäiseen inputiin

        return (
            <form onSubmit={SubmitCustomer}>
                {/* inputien tapahtumankäsittelijöissä on määritelty funktio, jotka saa parametrikseen kyseisen input-elementin targetin tiedon */}
                {/* Funktiot kutsuvat set state hookia parametrina target.value */}

                <div>
                    <p>ID: {newCustomerId}</p>
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
                <button className="nappi" type="submit" style={{ background: 'green'}}>Save</button>

                {/* cancel-buttonissa on setLisäysTila(false), jolloin palataan asiakasnäyttöön */}
                <button className="nappi" onClick={() => setMuokkaustila(false)} style={{ background: 'red '}}>Cancel</button>

            </form>

        ) //return päättyy


} //const CustomerEdit päättyy

export default CustomerEdit