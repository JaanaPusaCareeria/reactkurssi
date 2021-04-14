import React, { useState } from 'react'
import '../App.css'

const Login = ({ login, handleDeleteClick }) => {

    return (

        <>
        {/* HUOM nämä pitää olla samalla tavoin kuin miten backendista data tulee. Esim jos JSONissa tulee username => username, jos firstName =>firstName */}
            <tr>
                <td>{login.userName}</td>
                <td>{login.firstname}</td>
                <td>{login.lastname}</td>
                <td>{login.email}</td>
                <td>
                    <button className="nappi" onClick={() => handleDeleteClick(login.loginId)}>Delete</button>
                </td>
            </tr>
        </>

    ) //return päättyy

} // const Login päättyy

export default Login