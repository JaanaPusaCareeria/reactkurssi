import React, { useState } from 'react'
import '../App.css'

const Product = ({ product, handleDeleteClick, handleEditClick }) => {

    return (

        <>
        {/* HUOM nämä pitää olla samalla tavoin kuin miten backendista data tulee. Esim jos JSONissa tulee username => username, jos firstName =>firstName */}
            <tr>
                <td>{product.productName}</td>
                <td>{product.unitPrice}</td>
                <td>{product.unitsInStock}</td>
                <td>{product.categoryId}</td>
                <td>
                    <button className="nappi" onClick={() => handleDeleteClick(product.productId)}>Delete</button>
                    <button className="nappi" onClick={() => handleEditClick(product)}>Edit</button>
                </td>
            </tr>
        </>

    ) //return päättyy

} // const Login päättyy

export default Product