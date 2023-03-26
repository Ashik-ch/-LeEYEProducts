// import db
const db = require('./db')


const addproduct = (name, description, price, tax, mrp, image) => {
    return db.Product.findOne({ name })
        .then(data => {
            if (data) {
                return {
                    statuscode: 400,
                    status: false,
                    message: "Already exist"
                }
            }
            else {
                const newProduct = new db.Product({ name, description, price, tax, mrp, image })
                newProduct.save()
                return {
                    statuscode: 200,
                    status: true,
                    message: "Product Add successfully",
                    newProduct
                }
            }
        })
}


const productlist = () => {
    return db.Product.find()
        .then(data => {
            if (data) {
                return {
                    statuscode: 200,
                    status: true,
                    message: "Show successful",
                    data: data,
                }
            } else {
                return {
                    statuscode: 400,
                    status: false,
                    message: "Show Failed"
                }
            }
        })
}


// const deleteproduct = (name) => {
//     return db.Product.deleteOne({ name })
//         .then((result) => {
//             console.log("result", result);
//             if (result) {
//                 return {
//                     result,
//                     status: true,
//                     message: "Deleted  successfully",
//                     statuscode: 200,
//                     "id": id
//                 }
//             }
//             else {
//                 return {
//                     status: false,
//                     message: "Deletion  failed",
//                     statuscode: 400
//                 }
//             }
//         })
// }


const updateproduct = (name, description, price, tax, mrp) => {
    return db.Product.findOneAndUpdate({ name }, { description, price, tax, mrp }, { new: true })
        .then((result) => {
            console.log("result", result);
            if (result) {
                return {
                    result,
                    status: true,
                    message: "updated  successfully",
                    statuscode: 200,
                }
            }
            else {
                return {
                    status: false,
                    message: "Not Found",
                    statuscode: 400
                }
            }
        })
}

module.exports = { addproduct, productlist,  updateproduct }