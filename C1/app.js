const express=require("express")

const PORT=3000

const app=express()

app.get("/products", (req, res)=>{
    res.send("Products...")
})

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}` )
})