import React, { useState } from 'react'
import './App.css'

const Customer = ({ customer, handleDeleteClick }) => {

    const [näytäEnemmän, setNäytäEnemmän] = useState(false)

    return (
        <>
        
        {/* <h3 onMouseOver={() => setNäytäEnemmän(!näytäEnemmän)}
            onMouseLeave={() => setNäytäEnemmän(!näytäEnemmän)}
        >
            {customer.companyName} <button>Delete</button>
            <button>Edit</button>
        </h3> */}

        <h3 onClick={() => setNäytäEnemmän(!näytäEnemmän)}>
            {customer.companyName}
            {/* Delete-nappiin on laitettu handleDeleteClick tapahtumankäsittelijä, jolla parametrina lähetetään customer.customerId */}
            {/* Customer tulee propsina ylhäältä jo muutenkin, ja kun päästään käsiksi muihinkin tietoihin, päästään käsiksi myös customerId:hen */}
            {/* Se lähetetään handleDeleteClickiin joka on CustomerListissä */}
            {/* handleDeleteClick on saatu propsina täällä Customerissa, joten siksi sitä voidaan napista kutsua */}
            <button onClick={() => handleDeleteClick(customer.customerId)}>Delete</button>
            <button>Edit</button>
            </h3>

        {näytäEnemmän && <div className="customerWindow">
            <table>
                <thead>
                    <tr>
                        <th>Contact Person</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{customer.ContactName}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.address}</td>
                        <td>{customer.city}</td>
                        <td>{customer.country}</td>
                    </tr>
                </tbody>
            </table></div>}
        </>
    )
}

export default Customer