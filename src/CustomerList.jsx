// importataan useState ja useEffect hookit, jotta niitä voidaan käyttää
import React, { useState, useEffect } from 'react'
import './App.css'
// importataan CustomerService services/customer -tiedostosta (jossa siis haetaan data)
import CustomerService from './services/customer'
// importataan Customer Customer-tiedostosta
import Customer from './Customer'
import CustomerAdd from './CustomerAdd'

const CustomerList = ({ setMessage, setShowMessage, setIsPositive }) => {
// määriteltu useStatella tila customers, joka on aluksi oletuksena tyhjä []. Backendistä saadaan siihen koko taulukollinen customer-objekteja
    const [customers, setCustomers] = useState([])
    const [näytetäänkö, setNäytetäänkö] = useState(false)
    const [search, setSearch] = useState("")
    // liittyy asiakkaan lisäykseen
    const [lisäysTila, setLisäystila] = useState(false)

// useEffect hookilla voidaan hakea dataa. Tässä viitataan service/customer-tiedoston getAll-metodiin
// .then(data) otetaan data vastaan aliasoituna data-nimelle
// setCustomers(data) asetetaan saatu data parametrinä setCustomers-tilaan
// useEffectin toiseksi parametriksi laitettu näytetäänkö, jolloin datoja voi päivittää klikkaamalla customers-otsikkoa
    useEffect(() => {
        CustomerService
            .getAll()
            .then(data => {
            console.log(data)
            setCustomers(data)
        })
    }, [näytetäänkö])

    //Hakukentän onChange -tapahtumankäsittelijä
    const handleSearchInputChange = (event) => {
        // tulostetaan konsolille annettu hakutekijä, debuggausta
        console.log(search)
        setNäytetäänkö(true)
        setSearch(event.target.value.toLowerCase())
    }
    
    // handleDeleteClickin määrittely, ottaa vastaan parametrina id:n (voi olla myös suluissa, mutta ei tarvitse)
    // käytetään CustomerService.remove ja id parametrina sinne (sehän on importattu services - customer)
    // http-pyynnöstä palautuu promise, tavallaan vastaus. Periaatteessa heti palautuu promise, ja vasta kun pyyntö on täytetty, tulee promiseen tieto. Voi nimetä miten haluaa.
    // sitten poistetaan customers-tilasta poistettu id. Mahdollistaa sen, että vaikka ei tehdä uutta tietokantahakua, poistettu tieto häviää. Filter-metodi. Filteröidään kaikki
    // ne, joissa EI ole poistettu id. 
    // jos promise.status on 200 eli promise-objektista, vastausobjektista jossa on kaikennäköistä tietoa. Status on numerokoodi, 200 on ok.
    // ja sitten taas setMessage ja ispositive ym sekä timeout
    
    // const handleDeleteClick = id => {
    //     CustomerService.remove(id)
    //     .then(promise => {
    //         setCustomers(customers.filter(filtered => filtered.id !== id))//ok
    //         if (promise.status === 200) {
    //             setMessage('Poisto onnistui!')
    //             setIsPositive(true)
    //             setShowMessage(true)

    //             setTimeout(() => {
    //                 setShowMessage(false)
    //             }, 5000
    //             ); //settimeout
    //         } //if
    //         setNäytetäänkö(false) //Vaihdetaan tila edestakaisin, jotta saadaan listaus päivitettyä
    //         setNäytetäänkö(true)
    //     }) //then promise
    // } //handleDeleteClick päättyy

    //2.4. lisätty uusi poistonkäsittely:

    const handleDeleteClick = id => {
        //parametrina saadun id:n avulla kaivetaan esiin kaikki kyseisen customerin tiedot. Find-metodi
        //Kaivetaan esiin koko Customer-olio, jotta alertissa voidaan näyttää CompanyName id:n sijaan
        const customer = customers.find(cust => cust.customerId === id)

        //Poiston varmistus -kyselyikkuna. Window.confirm -toiminto, joka asetetaan const-vakioon. Saa yhden parametrin, joka on se viesti. Se perusteella, klikkaako ok vai peruuta
        //confirm saa arvon true tai false
        const confirm = window.confirm(`Haluatko todella poistaa: ${customer.companyName}:n pysyvästi?`)
        //jos confirm = true
        // ei try-catchia vaan .then-.catch jos asiakkaan poistossa tapahtuu virhettä, ei ajeta ollenkaan if-lohkoa vaan mennään catchiin.
        if (confirm) {

            CustomerService.remove(id)
            .then(response => {
                if (response.status === 200) {
                    //poistetaan customer statesta
                    setCustomers(customers.filter(filtered => filtered.customerId !== id))
                    setMessage(`${customer.companyName}:n poisto onnistui!`)
                    setIsPositive(true)
                    setShowMessage(true)
                    setNäytetäänkö(false)
                    window.scrollBy(0, -10000) //scrollataan ikkuna ylös, jotta nähdään alert 10000 pikseliä yrittää kelata ylös

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 4000)
                } //if-lohko 2 päättyy
            }) //.then päättyy
            .catch(error => {
                setMessage(`Tapahtui virhe: ${error}. Onkohan asiakkaalla tilauksia?`)
                setIsPositive(false)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 7000)
            })//.catch päättyy
        } //if-lohko päättyy
        else { //jos käyttäjä ei vahvistanut poistoa, eli painaa peruuta
            setMessage('Poisto peruutettu')
            setIsPositive(true)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            }, 4000)
        } //else -lohko päättyy
    } //handleDeleteClick-lohko päättyy

    // palauttaa käyttöliittymään h1-elementin "customers", kursori on pointer eli käsi. OnClick vaihtaa useState näytetäänkö aina päinvastaiseksi, eli jos se on ollut
    // tosi -> epätosi
    return (
        <>
        {/* h1-elementin, jossa lukee "customers". Kursori on pointer eli käden kuva. onClick tapahtumankäsittelijä on setNäytetäänkö, käänteinen !näytetäänkö */}
        {/* eli aina kun h1 elementtiä klikataan, vaihtuu tosi->epätosi->tosi jne */}
        {/* h1 sisälle laitettu button, josta asetetaan setLisäystilaksi true, falseksi se asetetaan vasta lisäystila-komponentissa tai jos painetaan cancel */}
            <h1 style={{ cursor: 'pointer' }}
                onClick={() => setNäytetäänkö(!näytetäänkö)}> customers
            <button onClick={() => setLisäystila(true)}>Add new</button>
            </h1>

        {/* eli jos lisäystila ei ole päällä, hakukenttä on näkyvissä ja toisinpäin. Sama koskee customerlistiä. Lisäystilassa molemmat on piilotettu */}
            {!lisäysTila && <input placeholder="Search by company name" value={search} onChange={handleSearchInputChange} />}

{/* Jos customers on tosi, eli data on saatu, ja näytetäänkö = tosi, sitten suoritetaan customers.map eli map-funktio on uutta javascriptiä. Se käy läpi kaikki */}
{/* customersit, jokainen yksittäinen olio aliasoidaan nimellä customer (vapaasti itse nimettävissä), jokaisen kohdalla renderöidään react-komponentti, joka on itse */}
{/* luotu nimeltään Customer. Propsina sinne lähetetään customerin tiedot, jonka arvo on customer-olio*/}
{/* lisäystila asetetaan falseksi lisäystila-komponentissa */}
{/* tänne on lisätty propsiksi handleDeleteClick */}
            {
                customers && näytetäänkö === true && lisäysTila === false && customers.map(customer => {
                    const lowerCaseName = customer.companyName.toLowerCase()
                    if (lowerCaseName.indexOf(search) > -1) {
                        return (
                            <Customer key={customer.customerId} customer={customer} handleDeleteClick={handleDeleteClick} />
                        )
                    } else {
                        return null
                    }
                }
                )
            }
{/* Eli jos ei löydy customereita, näytetään "Loading..." eli jos tulee vaikka viivettä, kun haetaan backendistä dataa */}
            { !customers && <p>Loading...</p>}

            {/* jos lisäystila on totta eli päällä, eli siinä tapauksessa renderöidään CustomerAdd-komponentti, johon on lähetetty propseina setLisäystila ym, jotta niitä */}
            {/* tietoja voidaan komponentista käyttää (setNäytetäänkö on turha) */}
            {/* Ei tarvi välttämättä sanoa lisäystila === true, riittää kuten yllä lisäysTila && <CustomerAdd... */}
            {lisäysTila === true && <CustomerAdd setLisäystila={setLisäystila} setNäytetäänkö={setNäytetäänkö} customers={customers} setCustomers={setCustomers}
            setMessage={setMessage} setShowMessage={setShowMessage} setIsPositive={setIsPositive} />}

        </>
    )

   }
    

// exportataan CustomerList (se importataan App.js-tiedostossa)
export default CustomerList