import React, { useState, useEffect } from 'react'
import '../App.css'
import ProductService from '../services/product'
import Product from './Product'
import ProductAdd from './ProductAdd'
import ProductEdit from './ProductEdit'
import Message from '../Message'

const ProductList = () => {

    const [products, setProducts] = useState([]) // tietotyyppi on taulukko
    const [lisäysTila, setLisäystila] = useState(false)

    const [muokkausTila, setMuokkaustila] = useState(false)
    const [muokattavaProduct, setMuokattavaProduct] = useState({}) 

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
    }, [lisäysTila, muokkausTila])

    const handleDeleteClick = id => {

        const product = products.find(product => product.productId === id)
        const confirm = window.confirm(`Haluatko todella poistaa: ${product.productName}:n pysyvästi?`)

        if (confirm) {
            ProductService.remove(id)
                .then(response => {
                    if (response.status === 200) {
                        setProducts(products.filter(filtered => filtered.productId !== id))
                        setMessage(`${product.productName}:n poisto onnistui!`)
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
    } //handleDeleteClick

    const handleEditClick = product => {
        setMuokattavaProduct(product)
        setMuokkaustila(true)
    }

    if (!lisäysTila && !muokkausTila && products.length === 0) {
        return (<>
            <h1><nobr> products</nobr>
            <button className="nappi" onClick={() => setLisäystila(true)}>Add new</button></h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <p>Loading...</p>
        </>)
    }

    if (!lisäysTila && !muokkausTila && products) {
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
                        {products.map(product => <Product key={product.productId} product={product} handleDeleteClick={handleDeleteClick} handleEditClick={handleEditClick} /> )}
                    </tbody>
                </table >
            </>
        ) //return
    }

    if (lisäysTila) {
        return (<>
            <h1>Products</h1>
            { showMessage && <Message message={message} isPositive={isPositive} /> }
            <ProductAdd setLisäystila={setLisäystila} products={products} setProducts={setProducts} setMessage={setMessage} setShowMessage={setShowMessage}
                setIsPositive={setIsPositive} />
        </> 
        ) //return
    }

    if (muokkausTila) {
         return (
         <>
             <h1>Products</h1>
             { showMessage && <Message message={message} isPositive={isPositive} /> }
             <ProductEdit setMuokkaustila={setMuokkaustila} muokattavaProduct={muokattavaProduct} products={products} setProducts={setProducts} setMessage={setMessage} setShowMessage={setShowMessage}
                 setIsPositive={setIsPositive} />
         </>
         )
     }
} //Productlist

export default ProductList