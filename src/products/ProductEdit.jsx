import React, { useState } from 'react'
import '../App.css'
import ProductService from '../services/product'

const ProductEdit = ({ setMuokkaustila, setProducts, products, setMessage, setShowMessage, setIsPositive, muokattavaProduct }) => {

        const [newProductId, setNewProductId] = useState(muokattavaProduct.productId)
        const [newProductName, setNewProductName] = useState(muokattavaProduct.productName)
        const [newSupplierId, setNewSupplierId] = useState(muokattavaProduct.supplierId)
        const [newCategoryId, setNewCategoryId] = useState(muokattavaProduct.categoryId)
        const [newQuantityPerUnit, setNewQuantityPerUnit] = useState(muokattavaProduct.quantityPerUnit)
        const [newUnitPrice, setNewUnitPrice] = useState(muokattavaProduct.unitPrice) 
        const [newUnitsInStock, setNewUnitsInStock] = useState(muokattavaProduct.unitsInStock)
        const [newUnitsOnOrder, setNewUnitsOnOrder] = useState(muokattavaProduct.unitsOnOrder)
        const [newReorderLevel, setNewReorderLevel] = useState(muokattavaProduct.reorderLevel)
        // const [newDiscontinued, setNewDiscontinued] = useState(0)

        const submitProduct = (event) => {
            event.preventDefault()
            var changedProduct = {
                productId: newProductId,
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

            ProductService
            .update(changedProduct) //put pyyntö backendille, viittaa update-metodiin customer.js:ssä
            .then(response => {
    
                if (response.status === 200) {
    
                    const id = changedProduct.productId
    
                    setProducts(products.filter(filtered => filtered.productId !== id))
                    setProducts(products.concat(changedProduct))
    
                    setMessage(`Päivitetty ${changedProduct.productName}`)
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
    
            setTimeout(() => {
                setMuokkaustila(false)
            }, 500);
    
        } //SubmitEmployee

        return (
            <form onSubmit={submitProduct}>
                <div>
                    <p>ID: {newProductId}</p>
                </div>
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

                <button className="nappi" type="submit" style={{ background: 'green'}}>Save</button>

                <button className="nappi" onClick={() => setMuokkaustila(false)} style={{ background: 'red '}}>Cancel</button>

            </form>


        ) //return päättyy

} //EmployeeEdit päättyy

export default ProductEdit