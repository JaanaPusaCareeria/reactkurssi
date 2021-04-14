import React, { useState } from 'react'
import '../App.css'

const Employee = ({ employee }) => {

    return (

        <>
        {/* HUOM nämä pitää olla samalla tavoin kuin miten backendista data tulee. Esim jos JSONissa tulee username => username, jos firstName =>firstName */}
            <tr>
                <td>{employee.lastName}</td>
                <td>{employee.firstName}</td>
                <td>{employee.title}</td>
                <td>{employee.city}</td>
                <td>
                    <button className="nappi">Delete</button>
                </td>
            </tr>
        </>

    ) //return päättyy
}

export default Employee