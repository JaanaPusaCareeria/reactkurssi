import React, { useState } from 'react'
import '../App.css'
import LoginService from '../services/login'
// vaatii npm install md5 -komennon, tällä salasanan hashays
import md5 from 'md5'

const LoginAdd = ({ setLisäystila, setLogins, logins, setMessage, setShowMessage, setIsPositive }) => {

        // State-määritykset, id:tä ei anneta vaan tietokanta luo sen
        const [newUserName, setNewUsername] = useState('')
        const [newPassword, setNewPassword] = useState('')
        const [passwordAgain, setPasswordAgain] = useState('') // Varmistusta varten

        const [newFirstname, setNewFirstname] = useState('')
        const [newLastname, setNewLastname] = useState('')
        const [newEmail, setNewEmail] = useState('')
        const [newAccesslevelId, setNewAccesslevelId] = useState(0) // Numeroarvo alustukseen!

        const submitLogin = (event) => {
            event.preventDefault()
            // Jos salasanat ei täsmää, palauttaa alertin ja pysähdytään tähän, tyhjennetään salasanakentät
            if (newPassword !== passwordAgain) {
                setNewPassword('')
                setPasswordAgain('')
                return (alert('Salasanat eivät täsmänneet.'))
            } //if päättyy

            var newLogin = {
                username: newUserName,
                password: md5(newPassword), // Tässä tehdään hashays. Teithän "npm install md5"
                firstname: newFirstname,
                lastname: newLastname,
                email: newEmail,
                accesslevelId: parseInt(newAccesslevelId) // Täytyy näköjään väkisin parseroida
            } //newLogin päättyy

            console.log(newLogin)

            LoginService
                .create(newLogin)
                .then(response => {

                    if (response.status === 200) {
                        setLogins(logins.concat(newLogin))

                        setMessage(`Lisätty ${newLogin.username}`)
                        setIsPositive(true)
                        setShowMessage(true)

                        setTimeout(() => {
                            setShowMessage(false)
                        }, 4000);
                    } //if päättyy

                }) //.then päättyy
                .catch(error => {
                    setMessage(`Tapahtui virhe. Tässä lisätietoa: ${error}`)
                    setIsPositive(false)
                    setShowMessage(true)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 7000);
                }) //.catch päättyy

                setTimeout(() => {
                    setLisäystila(false)
                }, 500);
        } // submitCustomer päättyy

        return (
            <form onSubmit={submitLogin}>
                <div>
                <input type="text" value={newUserName} placeholder="Username" 
                onChange={({ target }) => setNewUsername(target.value)} required/>
                </div>
                <div>
                    <input type="password" value={newPassword} placeholder="Password"
                    onChange={({ target }) => setNewPassword(target.value)} required/>
                </div>
                <div>
                    <input type="password" value={passwordAgain} placeholder="Re-enter password"
                    onChange={({ target }) => setPasswordAgain(target.value)} required/>
                </div>
                <div>
                    <input type="text" value={newFirstname} placeholder="Firstname"
                    onChange={({ target }) => setNewFirstname(target.value)} required/>
                </div>
                <div>
                    <input type="text" value={newLastname} placeholder="Lastname"
                    onChange={({ target }) => setNewLastname(target.value)} required/>
                </div>
                <div>
                    <input type="email" value={newEmail} placeholder="Email"
                    onChange={({ target }) => setNewEmail(target.value)}/>
                </div>
                <div>
                    <p>Access level ID</p>
                    <input type="number" value={newAccesslevelId} placeholder="Access level ID"
                    onChange={({ target }) => setNewAccesslevelId(target.value)}/>
                </div>

                {/* tällä subnmitoidaan koko form */}
                <button className="nappi" type="submit" style={{ background: 'green'}}>Create</button>

                {/* cancel-buttonissa on setLisäysTila(false), jolloin palataan asiakasnäyttöön */}
                <button className="nappi" onClick={() => setLisäystila(false)} style={{ background: 'red '}}>Cancel</button>

            </form>


        ) //return päättyy

} //LoginAdd päättyy

export default LoginAdd