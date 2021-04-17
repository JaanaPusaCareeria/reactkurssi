import React, { useState } from 'react'
import '../App.css'
import ProductService from '../services/product'

const ProductAdd = ({ setLisäystila, setProducts, products, setMessage, setShowMessage, setIsPositive }) => {

        // State-määritykset, id:tä ei anneta vaan tietokanta luo sen
        const [newProductName, setNewProductName] = useState('')
        const [newSupplierId, setNewSupplierId] = useState(0)
        const [newCategoryId, setNewCategoryId] = useState(0)
        const [newQuantityPerUnit, setNewQuantityPerUnit] = useState('')
        const [newUnitPrice, setNewUnitPrice] = useState(0) 
        const [newUnitsInStock, setNewUnitsInStock] = useState(0)
        const [newUnitsOnOrder, setNewUnitsOnOrder] = useState(0)
        const [newReorderLevel, setNewReorderLevel] = useState(0)
        // const [newDiscontinued, setNewDiscontinued] = useState(0)

        const submitProduct = (event) => {
            event.preventDefault()
            var newProduct = {
                productName: newProductName,
                supplierId: newSupplierId,
                categoryId: newCategoryId,
                quantityPerUnit: newQuantityPerUnit,
                unitPrice: newUnitPrice,
                unitsInStock: newUnitsInStock,
                unitsOnOrder: newUnitsOnOrder,
                reorderLevel: newReorderLevel
                // discontinued: newDiscontinued,
                // imageLink: newImageLink
            } 

            console.log(newProduct)

            ProductService
                .create(newProduct)
                .then(response => {

                    if (response.status === 200) {
                        setProducts(products.concat(newProduct))
                        setMessage(`Lisätty ${newProduct.productName}`)
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
            <form onSubmit={submitProduct}>
                <div>
                <input type="text" value={newProductName} placeholder="Productname" 
                onChange={({ target }) => setNewProductName(target.value)} required/>
                </div>
                <div>
                <p>Supplier ID</p>
                <input type="number" value={newSupplierId} placeholder="Supplier id" 
                onChange={({ target }) => setNewSupplierId(target.value)}/>
                </div>
                <div>
                    <p>Category ID</p>
                    <input type="number" value={newCategoryId} placeholder="Category id"
                    onChange={({ target }) => setNewCategoryId(target.value)}/>
                </div>
                <div>
                    <input type="text" value={newQuantityPerUnit} placeholder="Quantity per unit"
                    onChange={({ target }) => setNewQuantityPerUnit(target.value)}/>
                </div>
                <div>
                    <p>Unit price</p>
                    <input type="number" value={newUnitPrice} placeholder="Unit price"
                    onChange={({ target }) => setNewUnitPrice(target.value)}/>
                </div>
                <div>
                    <p>Units in stock</p>
                    <input type="number" value={newUnitsInStock} placeholder="Units in stock"
                    onChange={({ target }) => setNewUnitsInStock(target.value)}/>
                </div>
                <div>
                    <p>Units on order</p>
                    <input type="number" value={newUnitsOnOrder} placeholder="Units on order"
                    onChange={({ target }) => setNewUnitsOnOrder(target.value)}/>
                </div>
                <div>
                    <p>Reorder level</p>
                    <input type="number" value={newReorderLevel} placeholder="Reorder level"
                    onChange={({ target }) => setNewReorderLevel(target.value)}/>
                </div>
                {/* <div>
                    <input type="text" value={newDiscontinued} placeholder="Discontinued"
                    onChange={({ target }) => setNewDiscontinued(target.value)}/>
                </div> */}
                {/* <div>
                    <input type="text" value={newImageLink} placeholder="Imagelink"
                    onChange={({ target }) => setNewImageLink(target.value)}/>
                </div> */}

                <button className="nappi" type="submit" style={{ background: 'green'}}>Create</button>
                <button className="nappi" onClick={() => setLisäystila(false)} style={{ background: 'red '}}>Cancel</button>

            </form>


        ) //return päättyy

} //LoginAdd päättyy

export default ProductAdd