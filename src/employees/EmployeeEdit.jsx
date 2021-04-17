import React, { useState } from 'react'
import '../App.css'
import EmployeeService from '../services/employee'

const EmployeeEdit = ({ setMuokkaustila, setEmployees, employees, setMessage, setShowMessage, setIsPositive, muokattavaEmployee }) => {

        // State-määritykset, id:tä ei anneta vaan tietokanta luo sen
        const [newEmployeeId, setNewEmployeeId] = useState(muokattavaEmployee.employeeId)
        const [newLastName, setNewLastName] = useState(muokattavaEmployee.lastName)
        const [newFirstName, setNewFirstName] = useState(muokattavaEmployee.firstName)
        const [newTitle, setNewTitle] = useState(muokattavaEmployee.title)
        const [newTitleOfCourtesy, setNewTitleOfCourtesy] = useState(muokattavaEmployee.titleOfCourtesy)
        // const [newBirthDate, setNewBirthDate] = useState(muokattavaEmployee.birthDate )
        // const [newHireDate, setNewHireDate] = useState(muokattavaEmployee.hireDate)
        const [newAddress, setNewAddress] = useState(muokattavaEmployee.address)
        const [newCity, setNewCity] = useState(muokattavaEmployee.city)
        const [newRegion, setNewRegion] = useState(muokattavaEmployee.region)
        const [newPostalCode, setNewPostalCode] = useState(muokattavaEmployee.postalCode)
        const [newCountry, setNewCountry] = useState(muokattavaEmployee.country)
        const [newHomePhone, setNewHomePhone] = useState(muokattavaEmployee.homePhone)
        const [newExtension, setNewExtension] = useState(muokattavaEmployee.extension)

        const submitEmployee = (event) => {
            event.preventDefault()
            var changedEmployee = {
                employeeId: newEmployeeId,
                lastName: newLastName,
                firstName: newFirstName,
                title: newTitle,
                titleOfCourtesy: newTitleOfCourtesy,
                // birthDate: newBirthDate,
                // hireDate: newHireDate,
                address: newAddress,
                city: newCity,
                region: newRegion,
                postalCode: newPostalCode,
                country: newCountry,
                homePhone: newHomePhone,
                extension: newExtension
            } //changedEmployee

            EmployeeService
            .update(changedEmployee) //put pyyntö backendille, viittaa update-metodiin customer.js:ssä
            .then(response => {
    
                if (response.status === 200) {
    
                    const id = changedEmployee.employeeId
    
                    //poistetaan ensin vanha customer statesta. Nämä ei olisi välttämättömiä tehdä, koska kuitenkin päivitetään tilanne tietokannasta.
                    setEmployees(employees.filter(filtered => filtered.employeeId !== id))
                    //ja lisätään uudestaan muuttuneilla tiedoilla
                    setEmployees(employees.concat(changedEmployee))
    
                    setMessage(`Päivitetty ${changedEmployee.lastName}`)
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
    
        } //SubmitEmployee

        return (
            <form onSubmit={submitEmployee}>
                <div>
                    <p>ID: {newEmployeeId}</p>
                </div>
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
                {/* <div>
                    <input type="date" value={newBirthDate} placeholder="Birthdate"
                        onChange={({ target }) => setNewBirthDate(target.value)}/>
                </div>
                <div>
                    <input type="date" value={newHireDate} placeholder="Hiredate"
                        onChange={({ target }) => setNewHireDate(target.value)}/>
                </div> */}
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

                <button className="nappi" type="submit" style={{ background: 'green'}}>Save</button>

                <button className="nappi" onClick={() => setMuokkaustila(false)} style={{ background: 'red '}}>Cancel</button>

            </form>


        ) //return päättyy

} //EmployeeEdit päättyy

export default EmployeeEdit