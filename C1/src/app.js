const express=require("express")
const {ProductManager} = require("./dao/ProductManager.js")

const PORT=3000

const app=express()

const productManager = new ProductManager()

app.get("/products", async (req, res)=>{
    let products = await productManager.getProducts()
    res.send(products)
})

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}` )
})