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
        res.send({error: "internal server error get all"})
    }
})

router.get("/:pid", async (req, res)=>{
    try {
        let {pid} = req.params
        let product = await productManager.getProduct(pid)
        let {limit}=req.query
        res.send(product)
    } catch (error) {
        res.send({error: "internal server error get id"})
    }
})

router.delete("/:pid", async (req, res)=>{
    try {
        let {pid} = req.params
        let product = await productManager.removeProduct(pid)
        res.send(product)
    } catch (error) {
        res.send({error: "internal server error delete"})
    }
})

router.put("/:pid", async (req, res)=>{
    try {
        let {pid} = req.params
        let {title, description, code, price, status, stock, category, thumbnails} = req.body
        let updatedProduct = await productManager.updateProduct(pid,{title, description, code, price, status, stock, category, thumbnails})
        res.send(updatedProduct)
    } catch (error) {
        res.send({error: "internal server error update"})
    }
})

router.post("/", async(req,res)=>{
    try {
        let {title, description, code, price, status, stock, category, thumbnails} = req.body
        let newProduct = await productManager.addProduct({title, description, code, price, status, stock, category, thumbnails})
        res.send(newProduct)

    } catch (error) {
        res.send({error: "internal server error add"})
    }
})

module.exports={router}