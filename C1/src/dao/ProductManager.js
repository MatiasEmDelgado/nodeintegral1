const fs = require("fs")

class ProductManager {

    constructor(path="../src/data/products.json"){
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
                //throw new Error(`Product ${id} doesnt exist`)
                return []
            }
        } catch(error) {
            console.log(error)
        }

    }

}

module.exports={
    ProductManager
}
