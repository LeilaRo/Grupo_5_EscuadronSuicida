const path= require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/products.json')
const jsonProducts = fs.readFileSync(productsFilePath, "utf-8");
//Traducir ese archivo json: luego lo usaremos en saveProduct para guardar los productos que se crean
const products = JSON.parse(jsonProducts);

// const controlador={

//     productCart: (req, res) => {
//         res.render(path.resolve(__dirname, '../views/products/productCart'), {products})
//     }

// }

//module.exports = controlador;