const fs = require("fs")

class ProductManager {

    constructor(path="../src/data/products.json"){
        this.path=path
    }

    async getProducts(){
        if(fs.existsSync(this.path)){
            return JSON.parse(await fs.promises.readFile(this.path, "utf-8"))
        } else {
            return []
        }
    }

}

module.exports={
    ProductManager
}
