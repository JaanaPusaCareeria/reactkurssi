import React, { useState, useEffect } from 'react'
import '../App.css'
import EmployeeService from '../services/employee'
import Employee from './Employee'
import EmployeeAdd from './EmployeeAdd'
import Message from '../Message'

const EmployeeList = () => {

    const [employees, setEmployees] = useState([]) // tietotyyppi on taulukko
    const [lisäysTila, setLisäystila] = useState(false)

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
    }, [lisäysTila])

    if (!lisäysTila && employees.length === 0) {
        return (<>
            <h1><nobr> Employees</nobr>

                <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button></h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }

            <p>Loading...</p>
        </>)
    }

    if (!lisäysTila && employees) {
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
                        {employees.map(employee => <employee key={employee.employeeId} employee={employee} /> )}

                    </tbody>
                </table >
            </>

        )
    }

    if (lisäysTila) {
        return (<>
            <h1>Employees</h1>
            { showMessage &&
                <Message message={message} isPositive={isPositive} />
            }
            <EmployeeAdd setLisäystila={setLisäystila} employees={employees} setEmployees={setEmployees} setMessage={setMessage} setShowMessage={setShowMessage}
                setIsPositive={setIsPositive} />
        </>
        )
    }


}
export default EmployeeList