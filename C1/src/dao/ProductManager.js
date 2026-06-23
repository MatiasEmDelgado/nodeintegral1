class ProductManager {

    #products;

    constructor(){
        this.#products=[]
    }

    addProduct(title, description, price, thumbnail, code, stock){
        if (!title || !description || !price || !thumbnail || !code || stock === undefined || stock === null) {
            console.log("Alguno de los parametros estan faltantes y son requeridos, por favor verifique");
            return;
        }
        const codes = this.#products.map(({ code }) => code);
        if(codes.includes(code)){
            console.log("El codigo de producto no puede repetirse");
            return;
       }

        let id= this.#products.length+1;
        let newProduct={
            id,
            title, 
            description,
            price,
            thumbnail,
            code,
            stock
        }
        this.#products.push(newProduct);
    }

    getProducts(){
        console.log(this.#products);
        return this.#products;
    }

    getProductById(id){
        const product = this.#products.find(prod => prod.id === id);
        if(product){
            console.log(product);
            return product;
        } else {
            console.log("No hay producto con ese id");
            return;
        }
    }
}

const prod1=["Jabon", "muy limpio", 2, "indefinido por el momento", 123123, 1000];

let productManager = new ProductManager();
console.log("Ingreso un producto valido")
productManager.addProduct(...prod1)
productManager.getProducts();

const prod2=["Carbon", "muy sucio", "indefinido por el momento", 123123, 1000];
console.log("Ingreso un producto invalido")
productManager.addProduct(...prod2)
productManager.getProducts();

const prod3=["Carbon", "muy sucio", 10, "indefinido por el momento", 123123, 1000];
console.log("Ingreso un producto invalido por codigo duplicao")
productManager.addProduct(...prod3)
productManager.getProducts();

const prod4=["Carbon", "muy sucio", 4, "indefinido por el momento", 123124, 1000];
console.log("Ingreso otro producto valido")
productManager.addProduct(...prod4)
productManager.getProducts();

console.log("Buscando prod con id 2");
productManager.getProductById(2);
console.log("Buscando prod con id 3");
productManager.getProductById(3);
console.log("Buscando prod con id 1");
productManager.getProductById(1);