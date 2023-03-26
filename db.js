// mongoDb connection

//1 import moongose for connection
const mongoose = require('mongoose')
mongoose.set('strictQuery', true);

// 2 define conncection String
mongoose.connect('mongodb://127.0.0.1:27017/LeeCart', {
    useNewUrlParser: true
})


//3 Create  a model to store data  with schema
const Product = mongoose.model('Product', {
    name: String,
    description: String, 
    price: Number,
    tax: Number,
    mrp: Number,
    image:Array
})






//4 export for using in other files
module.exports = {  Product }
