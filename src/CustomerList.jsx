// importataan useState ja useEffect hookit, jotta niitä voidaan käyttää
import React, { useState, useEffect } from 'react'
import './App.css'
// importataan CustomerService services/customer -tiedostosta (jossa siis haetaan data)
import CustomerService from './services/customer'
// importataan Customer Customer-tiedostosta
import Customer from './Customer'
// import CustomerAdd from './CustomerAdd'

const CustomerList = () => {
// määriteltu useStatella tila customers, joka on aluksi oletuksena tyhjä []. Backendistä saadaan siihen koko taulukollinen customer-objekteja
    const [customers, setCustomers] = useState([])
    const [näytetäänkö, setNäytetäänkö] = useState(false)
    // const [search, setSearch] = useState("")
    // const [lisäysTila, setLisäystila] = useState(false)

// useEffect hookilla voidaan hakea dataa. Tässä viitataan service/customer-tiedoston getAll-metodiin
// .then(data) otetaan data vastaan aliasoituna data-nimelle
// setCustomers(data) asetetaan saatu data parametrinä setCustomers-tilaan
    useEffect(() => {
        CustomerService
            .getAll()
            .then(data => {
            console.log(data)
            setCustomers(data)
        })
    }, [])

    // palauttaa käyttöliittymään h1-elementin "customers", kursori on pointer eli käsi. OnClick vaihtaa useState näytetäänkö aina päinvastaiseksi, eli jos se on ollut
    // tosi -> epätosi
    return (
        <>
        <h1 style={{ cursor: 'pointer'}} onClick={() => setNäytetäänkö(!näytetäänkö)}> customers
        </h1>            

        {
            // jos customers on tosi, eli data on saatu ja näytetäänkö = tosi, niin sitten map-funktiolla käydään läpi kaikki customersit
            // ja jokainen yksittäinen aliasoidaan customer-nimelle. Jokaisen kohdalla renderöidään Customer -react komponentti (Customer.jsx)
            // parametrina sinne lähetetään aliasoitu customer, jonka arvona on customer-olio
            customers && näytetäänkö === true && customers.map(customer => 
                <Customer customer={customer} />
                )
        }

{/* Jos customersia ei löydy, eli jos tulee esim viive kun haetaan dataa backendista, näytetään "Loading..." */}
        { !customers && <p>Loading...</p>}

        {/* {lisäysTila === true && <CustomerAdd setLisäysTila={setLisäysTila} />} */}

        </>
    )

   }
    

// exportataan CustomerList (se importataan App.js-tiedostossa)
export default CustomerList