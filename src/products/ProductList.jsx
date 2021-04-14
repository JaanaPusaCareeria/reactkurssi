import React, { useState, useEffect } from 'react'
import '../App.css'
import ProductService from '../services/product'
import Product from './Product'
import ProductAdd from './ProductAdd'
import Message from '../Message'

const ProductList = () => {

    const [products, setProducts] = useState([]) // tietotyyppi on taulukko
    const [lisäysTila, setLisäystila] = useState(false)

    const [showMessage, setShowMessage] = useState(false)
    const [isPositive, setIsPositive] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        ProductService
            .getAll()
            .then(data => {
                console.log(data)
                setProducts(data)
            })
    }, [lisäysTila])

    if (!lisäysTila && products.length === 0) {
        return (<>
            <h1><nobr> products</nobr>

                <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button></h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            
            <p>Loading...</p>
        </>)
    }

    if (!lisäysTila && products) {
        return (
            <>
                <h1><nobr> products</nobr>

                    <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button></h1>

                { showMessage && <Message message={message} isPositive={isPositive} /> }

                <table className="productListTable">
                    <thead><tr>
                        <th>Productname</th><th>Unitprice</th><th>Units in stock</th>
                        <th>Category ID</th><th></th>
                    </tr>
                    </thead >
                    <tbody>
                        {products.map(product => <Product key={product.productId} product={product} /> )}

                    </tbody>
                </table >
            </>

        )
    }

    if (lisäysTila) {
        return (<>
            <h1>Products</h1>
            { showMessage &&
                <Message message={message} isPositive={isPositive} />
            }
            <ProductAdd setLisäystila={setLisäystila} products={products} setProducts={setProducts} setMessage={setMessage} setShowMessage={setShowMessage}
                setIsPositive={setIsPositive} />
        </>
        )
    }


}
export default ProductList