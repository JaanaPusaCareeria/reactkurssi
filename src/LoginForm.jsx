import React, { useState } from 'react'
import './App.css'
// auth-tiedostossa kirjautumismetodi
import AuthService from './services/auth'
import md5 from 'md5'

// Saa parametrinä currentUser staten jota säilytetään app.js-tiedostossa sekä messageen liittyvät, jotta voidaan asettaa message tästä komponentista
const LoginForm = ({ currentUser, setCurrentUser, setMessage, setIsPositive, setShowMessage }) => {

    // Login-lomakkeen kenttiä vastaavat statet
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // Login-napin painallus ajaa tämän authenticate-metodin eli funktion
    const authenticate = (event) => {
        event.preventDefault() //estetään sivun päivitys tms

        // asetetaan userForAuth, input-kentistä menee stateen ja sieltä tänne kun ajetaan submit ja samalla häshätään salasana
        const userForAuth = {
            username: username,
            password: md5(password) //vaida kommenti ao. kanssa, jos kannassa hashatty salasana
            // password: password
        } //const userForAuth

        // kutsutaan AuthServicen authenticate-metodia
        AuthService //Käytetään AuthServicen metodia authenticate()
        .authenticate(userForAuth)
        .then(response => {

            // palvelimen vastauksena tullut käyttäjä talletetaan selaimen local storageen palvelimen vastauksesta
            // päätetään tallettaa vain 2 tietoa, vaikka responsessa tulee kaikki tiedot paitsi salasana
            localStorage.setItem('user', response.userName)
            localStorage.setItem('token', response.token)

            // asetetaan käyttäjänimi currentUser-stateen, jota säilytetään app.js:ssä
            // nyt username on local storagessa ja app.js:ssä. Se laitetaan local storageen, jotta kirjautumistieto säilyy vaikka selain päivitetään.
            setCurrentUser(response.userName)

            // Annetaan ilmoitus käyttäen message-komponenttia, joka sijaitsee App.js -komponentissa navbarin alapuolella
            // LoginForm on niin pieni ja nurkassa, että sen sisällä ei voi näyttää messagea
            setMessage(`Tervetuloa ${response.userName}`)
            setIsPositive(true)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
                
            }, 4000); //setTimeout
        }) //AuthService

        .catch(error => {
            setMessage(`Error ${error}`)
            setIsPositive(false)  // Erroreille punainen viesti
            setShowMessage(true)

            // Message pois pienen viiveen jälkeen:
            setTimeout(() => {
                setShowMessage(false)
            }, 4000

            )
        }) //.catch

    } //const authenticate

    // Tämä funktio ajetaan, kun tehdään Logout
    // tämä ei oikein voi epäonnistua joten siksi ei ole virheenkäsittelyä, toki sen voi laittaa
    const logout = () => {
        localStorage.clear()
        setCurrentUser(null)

        setMessage('Kirjautuit ulos onnistuneesti')
        setIsPositive(true)
        setShowMessage(true)
        
        setTimeout(() => {
            setShowMessage(false)
        }, 4000);
    } //const logout

    // Empty-napin painallus ajaa tämän
    const emptyFields = () => {
        setPassword('')
        setUsername('')
    } //const emptyFields

    // Jos App.js:n useEffect-funktio ei löydä local storagesta käyttäjää eli ei ole kirjautuneena, tilanne on tämä eli näkyy kirjautumislomake
    // Eli miten Loginform renderöidään tilanteesta riippuen
    if (!currentUser) {
        return (
            <>
            <form className="login-form" onSubmit={authenticate}>
                <input className="login-input" value={username} type="text" placeholder="username" onChange={({ target }) => setUsername(target.value)} />
                <input className="login-input" value={password} type="password" placeholder="pawssword" onChange={({ target }) => setPassword(target.value)} />
                <button type="submit" className="login-button">Login</button>
                <p className="cancel-button" onClick={emptyFields}>Empty</p>
            </form>
            </>
        ) //return
    } //if !currentUsern
    // Jos currentUser löytyy, näytetään "Logged in as X" ja Logout -nappula
    else if (currentUser) {
        return (
            <div className="käyttäjä-tieto">
                <nobr>{`Logged in as ${currentUser}`}</nobr>
                <button className="cancel-button" onClick={logout}>Logout</button>
            </div>
        )//return
    }//else if

} //const LoginForm

export default LoginForm

