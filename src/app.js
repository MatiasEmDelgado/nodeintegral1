const express = require("express")
const productRouter = require("./routers/productsRouter.js").router
const PORT=3000

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/products", productRouter)

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}` )
})