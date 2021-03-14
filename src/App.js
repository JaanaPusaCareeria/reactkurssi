// importataan useState, jotta sitä voidaan käyttää
// import React, { useState } from 'react'
// import logo from './logo.svg';
import './App.css';
// importataan CustomerList
import CustomerList from './CustomerList'
// import Kello from './Kello'

// const-muuttuja App
const App = () => {
// Määritellään useStatella luku-niminen tila ja tilan muutosfunktio setLuku. Oletusarvoksi annettu 0.
// const [luku, setLuku] = useState(0) <- nämä liittyy laskuri-komponenttiin
// const-muuttuja jolle määritellään useStatella clock-niminen tila jonka oletusarvo on false. Muutosfunktio setClock
// const [clock, setClock] = useState(false)

// palauttaa divin, jonka classname on App
return (
  <div className="App">
    <header className="App-header">
      {/* onClick-eventissä setClock arvo muuttuu päinvastaiseksi */}
      <h1>Northwind </h1>

      
      <CustomerList />
    </header>

{/* jos clock = true, kellon koko on 500 */}
{/* jos clock = false, tuodaan CustomerList */}
    {/* {clock && <Kello koko={500} />}
    {!clock && <CustomerList />} */}
  </div>
)
}


export default App;
