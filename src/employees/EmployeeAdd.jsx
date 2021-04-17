import React, { useState } from 'react'
import '../App.css'
import EmployeeService from '../services/employee'

const EmployeeAdd = ({ setLisäystila, setEmployees, employees, setMessage, setShowMessage, setIsPositive }) => {

        // State-määritykset, id:tä ei anneta vaan tietokanta luo sen
        const [newLastName, setNewLastName] = useState('')
        const [newFirstName, setNewFirstName] = useState('')
        const [newTitle, setNewTitle] = useState('')
        const [newTitleOfCourtesy, setNewTitleOfCourtesy] = useState('')
        const [newBirthDate, setNewBirthDate] = useState('') 
        const [newHireDate, setNewHireDate] = useState('')
        const [newAddress, setNewAddress] = useState('')
        const [newCity, setNewCity] = useState('')
        const [newRegion, setNewRegion] = useState('')
        const [newPostalCode, setNewPostalCode] = useState('')
        const [newCountry, setNewCountry] = useState('')
        const [newHomePhone, setNewHomePhone] = useState('')
        const [newExtension, setNewExtension] = useState('')
        // const [newNotes, setNewNotes] = useState('')
        // const [newReportsTo, setNewReportsTo] = useState('')
        // const [newPhotoPath, setNewPhotoPath] = useState('')

        const submitEmployee = (event) => {
            event.preventDefault()
            var newEmployee = {
                lastName: newLastName,
                firstName: newFirstName,
                title: newTitle,
                titleOfCourtesy: newTitleOfCourtesy,
                birthDate: newBirthDate,
                hireDate: newHireDate,
                address: newAddress,
                city: newCity,
                region: newRegion,
                postalCode: newPostalCode,
                country: newCountry,
                homePhone: newHomePhone,
                extension: newExtension
                // reportsTo: newReportsTo,
                // photoPath: newPhotoPath
            } 

            console.log(newEmployee)

            EmployeeService
                .create(newEmployee)
                .then(response => {

                    if (response.status === 200) {
                        setEmployees(employees.concat(newEmployee))

                        setMessage(`Lisätty ${newEmployee.lastName}`)
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
        } // submit

        return (
            <form onSubmit={submitEmployee}>
                <div>
                <input type="text" value={newLastName} placeholder="Lastname" 
                onChange={({ target }) => setNewLastName(target.value)} required/>
                </div>
                <div>
                <input type="text" value={newFirstName} placeholder="Firsname" 
                onChange={({ target }) => setNewFirstName(target.value)} required/>
                </div>
                <div>
                    <input type="text" value={newTitle} placeholder="Title"
                    onChange={({ target }) => setNewTitle(target.value)}/>
                </div>
                <div>
                    <input type="text" value={newTitleOfCourtesy} placeholder="Title of courtesy"
                    onChange={({ target }) => setNewTitleOfCourtesy(target.value)}/>
                </div>
                <div>
                    <input type="date" value={newBirthDate} placeholder="Birthdate"
                    onChange={({ target }) => setNewBirthDate(target.value)}/>
                </div>
                <div>
                    <input type="date" value={newHireDate} placeholder="Hiredate"
                    onChange={({ target }) => setNewHireDate(target.value)}/>
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
                    <input type="text" value={newRegion} placeholder="Region"
                    onChange={({ target }) => setNewRegion(target.value)}/>
                </div>
                <div>
                    <input type="text" value={newPostalCode} placeholder="Postal code"
                    onChange={({ target }) => setNewPostalCode(target.value)}/>
                </div>
                <div>
                    <input type="text" value={newCountry} placeholder="Country"
                    onChange={({ target }) => setNewCountry(target.value)}/>
                </div>              
                <div>
                    <input type="text" value={newHomePhone} placeholder="Home phonenumber"
                    onChange={({ target }) => setNewHomePhone(target.value)}/>
                </div>
                <div>
                    <input type="text" value={newExtension} placeholder="Extension"
                    onChange={({ target }) => setNewExtension(target.value)} />
                </div>
                {/* <div>
                    <input type="text" value={newReportsTo} placeholder="Reports to"
                    onChange={({ target }) => setNewReportsTo(target.value)}/>
                </div>
                <div>
                    <input type="text" value={newPhotoPath} placeholder="Photopath"
                    onChange={({ target }) => setNewPhotoPath(target.value)}/>
                </div> */}

                {/* tällä subnmitoidaan koko form */}
                <button className="nappi" type="submit" style={{ background: 'green'}}>Create</button>

                {/* cancel-buttonissa on setLisäysTila(false), jolloin palataan asiakasnäyttöön */}
                <button className="nappi" onClick={() => setLisäystila(false)} style={{ background: 'red '}}>Cancel</button>

            </form>


        ) //return päättyy

} //LoginAdd päättyy

export default EmployeeAdd