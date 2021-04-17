import React, { useState, useEffect } from 'react'
import '../App.css'
import EmployeeService from '../services/employee'
import Employee from './Employee'
import EmployeeAdd from './EmployeeAdd'
import Message from '../Message'
import EmployeeEdit from './EmployeeEdit'

const EmployeeList = () => {

    const [employees, setEmployees] = useState([]) // tietotyyppi on taulukko
    const [lisäysTila, setLisäystila] = useState(false)

    const [muokkausTila, setMuokkaustila] = useState(false)
    const [muokattavaEmployee, setMuokattavaEmployee] = useState({}) 

    const [showMessage, setShowMessage] = useState(false)
    const [isPositive, setIsPositive] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        EmployeeService
            .getAll()
            .then(data => {
                console.log(data)
                setEmployees(data)
            })
    }, [lisäysTila, muokkausTila])

        // Tämä ajetaan kun ollaan poistamassa käyttäjää
        const handleDeleteClick = id => {
            const employee = employees.find(employee => employee.employeeId === id)
            const confirm = window.confirm(`Haluatko todella poistaa: ${employees.lastName}:n pysyvästi?`)
    
            if (confirm) {
                EmployeeService.remove(id)
                    .then(response => {
                        if (response.status === 200) {
                            // Poistetaan login statesta
                            setEmployees(employees.filter(filtered => filtered.employeeId !== id))
    
                            setMessage(`${employee.lastName}:n poisto onnistui!`)
                            setIsPositive(true)
                            setShowMessage(true)
                            window.scrollBy(0, -10000) // Scrollataan ylös jotta nähdään alert :)
    
                            setTimeout(() => {
                                setShowMessage(false)
                            }, 4000 )
                        } //if
                    }) //.then
                    .catch(error => {
                        console.log(error)
                        setMessage(`Tapahtui virhe: ${error}`)
                        setIsPositive(false)
                        setShowMessage(true)
    
                        setTimeout(() => {
                            setShowMessage(false)
                        }, 7000 )
                    }) //.catch
            } //if
            else {
                setMessage('Poisto peruutettu')
                setIsPositive(true)
                setShowMessage(true)
    
                setTimeout(() => {
                    setShowMessage(false)
                }, 4000 )
            } //else
        } // handleDeleteClick

        const handleEditClick = employee => {
            setMuokattavaEmployee(employee)
            setMuokkaustila(true)
        }

    if (!lisäysTila && !muokkausTila && employees.length === 0) {
        return (
        <>
            <h1><nobr> Employees</nobr>
            <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button></h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <p>Loading...</p>
        </>
        ) //return
    } //if

    if (!lisäysTila && employees && !muokkausTila) {
        return (
            <>
                <h1><nobr> Employees</nobr>
                <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button></h1>
                { showMessage && <Message message={message} isPositive={isPositive} /> }
                <table className="employeeListTable">
                    <thead><tr>
                        <th>Lastname</th><th>Firstname</th><th>Title</th>
                        <th>City</th><th></th>
                    </tr>
                    </thead >
                    <tbody>
                        {employees.map(employee => <Employee key={employee.employeeId} employee={employee} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} /> )}
                    </tbody>
                </table >
            </>
        ) //return
    } //if

    if (lisäysTila) {
        return (
        <>
            <h1>Employees</h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <EmployeeAdd setLisäystila={setLisäystila} employees={employees} setEmployees={setEmployees} setMessage={setMessage} setShowMessage={setShowMessage}
            setIsPositive={setIsPositive} />
        </>
        ) // return
    } //if

    if (muokkausTila) {
        return (
        <>
            <h1>Employees</h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            {muokkausTila && <EmployeeEdit setMuokkaustila={setMuokkaustila} muokattavaEmployee={muokattavaEmployee} employees={employees} setEmployees={setEmployees} setMessage={setMessage} setShowMessage={setShowMessage}
            setIsPositive={setIsPositive} />} 
        </>
        )//return
    }//if

} //EmployeeList

export default EmployeeList