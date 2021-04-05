// importataan useState, jotta sitä voidaan käyttää
import React, { useState } from 'react'
// import logo from './logo.svg';
import './App.css';
// importataan CustomerList
import CustomerList from './customers/CustomerList'
import Kello from './Kello'
// import Message from './Message'
import EmployeeList from './employees/EmployeeList'
import ProductList from './products/ProductList'
import LoginList from './logins/LoginList'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap/dist/css/bootstrap.min.css'
// importataan BrowserRouter Router-nimelle, aliasoidaan se samalla. Löytyy React routerin dokumentaatiosta
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// const-muuttuja App
const App = () => {
// Määritellään useStatella luku-niminen tila ja tilan muutosfunktio setLuku. Oletusarvoksi annettu 0.
// const [luku, setLuku] = useState(0) <- nämä liittyy laskuri-komponenttiin
// Määritellään, näytetäänkö kello vai ei. Boolean arvo. Jos false, näytetään asiakkaat (customers), jos true, näytetään kello.
const [clock, setClock] = useState(false)


// Messageen liittyvät statet
// siirretty 2.4. alkaen suoraan komponentteihin
// const [showMessage, setShowMessage] = useState(false)
// const [isPositive, setIsPositive] = useState(false)
// const [message, setMessage] = useState('')

// palauttaa divin, jonka classname on App
//h1 komponentissa on onClick-event, klikkaamalla clock muuttuu päinvastaiseksi, mitä se on ollut.
return (
  <div className="App">
    <header className="App-header">
      {/* marquee eli juokseva otsikkoteksti */}
      <h2 onClick={() => setClock(!clock)}>Northwind Traders Limited </h2>
    </header>

{/* Kääritään router-toiminnallisuuden sisään koko navbar. Navbar tulee react-bootstrapista. Link on react-routerin asia. Kun sanotaan Link to, voidaan määritellä */}
{/* että kun asiaa x klikataan, osoitteeseen tulee esim /Products. Eli kun siellä on se localhost/3000, siihen tulee /Products. Vaikuttaa selaimen osoiteriviin */}
{/* Navbar, nav puhtaasti bootstrap-asioita */}
{/* Link to, switch route ja path liittyy toisiinsa.  */}
{/* Navbariin tulee Customers-teksti. Kun sitä klikataan, osoiterivin osoitteeksi muuttuu localhost/portti/Customers. Switch taas päättää osoiterivin tekstin perusteella */}
{/* mikä komponentti renderöidään. Tänne ei pysty lähettämään propseja. Kaikki statet täytyy määritellä komponenteissa itsessään, esim myös message */}
    <Router>

      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Alkusivu tulossa</Navbar.Brand>

        <Nav className="mr-auto">
          <Link to={'/Customers'} className='nav-link'>Customers</Link>
          <Link to={'/Logins'} className='nav-link'>Logins</Link>
          <Link to={'/Products'} className='nav-link'>Products</Link>
          <Link to={'/Employees'} className='nav-link'>Employees</Link>
        </Nav>
      </Navbar>

      <Switch>
        <Route path='/Customers' component={CustomerList} />
        <Route path='/Logins' component={LoginList} />
        <Route path='/Products' component={ProductList} />
        <Route path='/Employees' component={EmployeeList} />
      </Switch>

    </Router>

{/* message-komponentti istutetaan tähän <Message/> ja sinne annetaan propsina messagen sisältö ja isPositive -tieto */}
{/* Jos showMessage on false, kuten se oletuksena on, silloin tätä ei ollenkaan näytetä */}
{/* Jos jossain komponentissa asetetaan message ja isPositive ja asetetaan showMessage trueksi */}
{/* Messagen asiat siirretty suoraan komponentteihin 2.4. */}
{/* { showMessage && <Message message={message} isPositive={isPositive} /> } */}


{/* Tässä kutsutaan kelloa ja antaa sille koon parametrinä */}
{/* eli jos kellon state, boolean arvo on true, näytetään kello ja jos se on false, näytetään asiakkaat */}
{/* jos clock = false, tuodaan CustomerList */}
    {clock && <Kello koko={400} />}


{/* Jos kelloa ei näytetä, näytetään CustomerList ja sen lapsikomponentti */}
{/* Jos halutaan CustomerListista, Customerista ja CustomerAddista käyttää Message-komponenttia, nämä kontrollointimetodit pitää lähettää eri komponenteille */}
{/* Messagen asiat siirretty suoraan komponentteihin 2.4. */}
    {/* {!clock && <CustomerList setShowMessage={setShowMessage} setIsPositive={setIsPositive} setMessage={setMessage} />} */}


  </div>
)
}


export default App;
