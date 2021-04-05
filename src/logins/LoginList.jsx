import React, { useState, useEffect } from 'react'
import '../App.css'
import LoginService from '../services/login.js'
import Login from './Login.jsx'
import LoginAdd from './LoginAdd.jsx'
import Message from '../Message'

const LoginList = () => {

    const [logins, setLogins] = useState([]) //tietotyyppi on taulukko
    const [lisäysTila, setLisäystila] = useState(false)
    
    const [showMessage, setShowMessage] = useState(false)
    const [isPositive, setIsPositive] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        LoginService
            .getAll()
            .then(data => {
                setLogins(data)
            })
    }, [lisäysTila])

    // tämä ajetaan, kun ollaan poistamassa käyttäjää
    const handleDeleteClick = id => {

        // kaivetaan esiin koko login-olio, jotta alertissa voidaan näyttää käyttäjänimi id:n sijaan
        const login = logins.find(login => login.loginId === id)

        //Poiston varmistus -kyselyikkuna
        const confirm = window.confirm(`Haluatko todella poistaa: ${login.userName}:n pysyvästi?`)

        if (confirm) {

            LoginService.remove(id)
            .then(response => {
                if (response.status === 200) {
               
                    setLogins(logins.filter(filtered => filtered.loginId !== id))
                    
                    setMessage(`${login.userName}:n poisto onnistui!`)
                    setIsPositive(true)
                    setShowMessage(true)
                    window.scrollBy(0, -10000) //scrollataan ikkuna ylös, jotta nähdään alert 10000 pikseliä yrittää kelata ylös

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 4000)
                } //if-lohko 2 päättyy
            }) //.then päättyy
            .catch(error => {
                console.log(error)
                setMessage(`Tapahtui virhe: ${error}`)
                setIsPositive(false)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                }, 7000)
            })//.catch päättyy
        } //if-lohko päättyy
        else { //jos käyttäjä ei vahvistanut poistoa
            setMessage('Poisto peruutettu')
            setIsPositive(true)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            }, 4000)
        } //else -lohko päättyy
    } //handleDeleteClick-lohko päättyy

    // RETURN on se, mitä renderöidään ruudulle
    // Tässä vähän erilaisia ehtolauserakenteita kuin customerissa

    // Jos logineja ei ole ehtinyt tulla kannasta stateen
    // Jos lisäystila ei ole päällä eli on false ja logins-taulukon pituus on 0, palautettaan Logins-header, jonka alla Add new-button
    // Jos showMessage on true niin näytetään message niiden alla
    if (!lisäysTila && logins.length === 0) {
        return (<>
            <h1><nobr> Logins</nobr>
            <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button></h1>
            {/* jos if:n sisällä halutaan vielä yksi yksittäinen asia laittaa ehdolliseksi */}
             { showMessage && <Message message={message} isPositive={isPositive} /> }
             <p>Loading...</p>
             </>)
    } //if päättyy

    // Jos statessa on jo kannasta saapuneet loginit ja lisäystila on pois päältä
    if (!lisäysTila && logins) {
        return (
            <>
             <h1><nobr> Logins</nobr>
            <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button></h1>

            { showMessage && <Message message={message} isPositive={isPositive} /> }

            <table className="loginsListTable">
                <thead><tr>
                    <th>Username</th><th>Firstname</th><th>Lastname</th><th>Email</th>
                </tr>
                </thead>
                <tbody>
                    {/* logins.map, jokaiselle login-oliolle renderöidään login-komponentti */}
                    {logins.map(login =>

                    <Login key={login.loginId} login={login}
                    handleDeleteClick={handleDeleteClick} />
                    )
                    }
                </tbody>
            </table>

            </>
        ) //return päättyy
    } // if päättyy

    if (lisäysTila) {
        return (<>
            <h1>Logins</h1>
            { showMessage &&
                <Message message={message} isPositive={isPositive} />
            }
            <LoginAdd setLisäystila={setLisäystila} logins={logins} setLogins={setLogins} setMessage={setMessage} setShowMessage={setShowMessage}
                setIsPositive={setIsPositive} />
        </>
        )
    }

} //const LoginList päättyy

export default LoginList