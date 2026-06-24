const express=require("express")
const {ProductManager} = require("./dao/ProductManager.js")

const PORT=3000

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const productManager = new ProductManager()

app.get("/products", async (req, res)=>{
    try {

        let products = await productManager.getProducts()
        let {limit}=req.query
        if(limit){
            products=products.slice(0,limit)
        }
        res.send(products)
    } catch (error) {
        res.send({"error": "Internal server error"})
    }
})

app.get("/product/:id", async (req, res)=>{
    try {
        let {id} = req.params
        let product = await productManager.getProduct(id)
        let {limit}=req.query
        res.send(product)
    } catch (error) {
        res.send({"error": "Internal server error"})
    }
})

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}` )
})