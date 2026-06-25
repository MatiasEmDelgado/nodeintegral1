const fs = require("fs")

class ProductManager {

    constructor(path="./C1/src/data/products.json"){
        this.path=path
    }

    async getProducts(){
        try {
            if(fs.existsSync(this.path)){
                return JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
            } else {
                return []
            }
        } catch(error) {
            console.log(error)
        }
    }

    async getProduct(id){
        try {
            let products = await this.getProducts()
            let product = products.find(prod=>prod.id==id)
            if(product){
                return product
            } else {
                throw new Error(`Product ${id} doesnt exist`)
            }
        } catch(error) {
            console.log(error)
        }

    }

    async addProduct(product={}){
        let products = await this.getProducts()
        let {title, description, code, price, status, stock, category, thumbnails} = product
        let id=products[products.length-1].id+1
        let newProduct = {id, title, description, code, price, status, stock, category, thumbnails}
        products.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(products,null, 5))
        return newProduct
    }

}

/* const prod = new ProductManager();

(async () => {
    prod.addProduct({
    "title": "lechita",
    "description": "rica",
    "code": "LIM-010",
    "price": 140.00,
    "status": true,
    "stock": 18,
    "category": "alimento",
    "thumbnails": ["vacio"]
  })
})(); */

module.exports={
    ProductManager
}
