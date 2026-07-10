const fs = require("fs")

class ProductManager {

    constructor(path="../src/data/products.json"){
        //C:\Users\Matu\Desktop\cursos\node\nodeintegral1\src\data\products.json
        this.path=path
    }

    async getProducts(){
        console.log("hola")
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
            const products = await this.getProducts()
            const product = products.find(prod=>prod.id==id)
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
        const products = await this.getProducts()
        const {title, description, code, price, status, stock, category, thumbnails} = product
        const id=products[products.length-1].id+1
        const newProduct = {id, title, description, code, price, status, stock, category, thumbnails}
        products.push(newProduct)
        await fs.promises.writeFile(this.path, JSON.stringify(products,null, 5))
        return newProduct
    }

    async removeProduct(id){
        const products = await this.getProducts()
        const deletedProduct = products.find(prod=>prod.id==id)
        const index = products.findIndex(prod => prod.id == id);

        if(deletedProduct){
            products.splice(index, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(products,null, 5))
        } else {
            throw new Error(`Cannot delete, product ${id} doesnt exist`)
        }
        return deletedProduct
    }

    async updateProduct(pid, product={}){
        const products = await this.getProducts()
        const index = products.findIndex(prod => prod.id == pid)

        if(index){
            //esta magia si q pedi ayuda, porque tenia una cadena de if con los params, pero
            // si bien no la tengo muy facil como me gustaria, se entiende la logica
            // se crea un object en formato json con todos los values que no vengan vacios
            const updates = Object.fromEntries(
                Object.entries(product).filter(
                        ([_, value]) => value !== undefined && value !== ''
                    )
            )

            products[index] = {
            ...products[index],
            ...updates
            };
            
            await fs.promises.writeFile(this.path, JSON.stringify(products,null, 5))
        } else {
            throw new Error(`Cannot update, product ${id} doesnt exist`)
        }

        return products[index]
    }
}

( async () => {
  const prod = new ProductManager();
  
  // Agrega 'await' aquí para que el script espere la ejecución del método
  const resultado = await prod.updateProduct(12,{"title": "otra baratija","description": "solo pa proba"}); 
 // console.log("Resultado final:", resultado);
})();

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
