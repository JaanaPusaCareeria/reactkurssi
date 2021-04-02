// importataan useState, jotta sitä voidaan käyttää
import React, { useState } from 'react'
// import logo from './logo.svg';
import './App.css';
// importataan CustomerList
import CustomerList from './CustomerList'
import Kello from './Kello'
import Message from './Message'

// const-muuttuja App
const App = () => {
// Määritellään useStatella luku-niminen tila ja tilan muutosfunktio setLuku. Oletusarvoksi annettu 0.
// const [luku, setLuku] = useState(0) <- nämä liittyy laskuri-komponenttiin
// Määritellään, näytetäänkö kello vai ei. Boolean arvo. Jos false, näytetään asiakkaat (customers), jos true, näytetään kello.
const [clock, setClock] = useState(false)
// Messageen liittyvät statet
const [showMessage, setShowMessage] = useState(false)
const [isPositive, setIsPositive] = useState(false)
const [message, setMessage] = useState('')

// palauttaa divin, jonka classname on App
//h1 komponentissa on onClick-event, klikkaamalla clock muuttuu päinvastaiseksi, mitä se on ollut.
return (
  <div className="App">
    <header className="App-header">
      <h2 onClick={() => setClock(!clock)}>Northwind Traders Limited </h2>
    </header>

{/* message-komponentti istutetaan tähän <Message/> ja sinne annetaan propsina messagen sisältö ja isPositive -tieto */}
{/* Jos showMessage on false, kuten se oletuksena on, silloin tätä ei ollenkaan näytetä */}
{/* Jos jossain komponentissa asetetaan message ja isPositive ja asetetaan showMessage trueksi */}
{ showMessage && <Message message={message} isPositive={isPositive} /> }

{/* Tässä kutsutaan kelloa ja antaa sille koon parametrinä */}
{/* eli jos kellon state, boolean arvo on true, näytetään kello ja jos se on false, näytetään asiakkaat */}
{/* jos clock = false, tuodaan CustomerList */}
    {clock && <Kello koko={500} />}
{/* Jos kelloa ei näytetä, näytetään CustomerList ja sen lapsikomponentti */}
{/* Jos halutaan CustomerListista, Customerista ja CustomerAddista käyttää Message-komponenttia, nämä kontrollointimetodit pitää lähettää eri komponenteille */}
    {!clock && <CustomerList setShowMessage={setShowMessage} setIsPositive={setIsPositive} setMessage={setMessage} />}
  </div>
)
}


export default App;
