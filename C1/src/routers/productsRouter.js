const { Router } = require("express")
const { ProductManager } = require ("../dao/ProductManager.js")

const router = Router()

const productManager = new ProductManager()

router.get("/", async (req, res)=>{
    try {

        let products = await productManager.getProducts()
        let {limit}=req.query
        if(limit){
            products=products.slice(0,limit)
        }
        res.send(products)
    } catch (error) {
        res.send({error: "internal server error"})
    }
})

router.get("/:id", async (req, res)=>{
    try {
        let {id} = req.params
        let product = await productManager.getProduct(id)
        let {limit}=req.query
        res.send(product)
    } catch (error) {
        res.send({error: "internal server error"})
    }
})

module.exports={router}