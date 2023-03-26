// import express inside index.js file
const express = require('express')

// importing service
const service = require('./service')
const db = require('./db')

// create server app using express
const app = express()
app.use(express.json())

// adding  product
app.post('/products', (req, res) => {
    const price = parseFloat(req.body.price);
    const tax = 18
    const mrp = price + price * (tax / 100);
    service.addproduct(req.body.name, req.body.description, price, tax, mrp, req.body.image)
        .then(data => {
            res.status(data.statuscode).json(data)
        })
})

// listng product
app.get('/products', (req, res) => {
    service.productlist()
        .then(data => {
            res.status(data.statuscode).json(data);
        })
})



// app.get('/products', (req, res) => {
//     service.productlist()
//         .then(data => {
//             discount = 20
//             const products = data.data.map(product => {
//                 const finalprice = product.price - (product.price * discount / 100); // apply 20% discount
//                 return { ...product, finalprice, discount };
//             });
//             res.status(data.statuscode).json(products);
//         })
// })


app.delete('/products/:name', (req, res) => {
    const name = req.params.name;
    db.Product.deleteOne({ name: name })
        .then(() => {
            res.status(200).json({ message: 'Product deleted successfully!' });
        })
        .catch((error) => {
            res.status(500).json({ error: error });
        });
});



app.put('/products/:name', (req, res) => {
    const { name } = req.params;
    const { description, price, tax, mrp } = req.body;
    service.updateproduct(name, description, price, tax, mrp)
        .then(data => {
            res.status(data.statuscode).json(data)
        })
})





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })