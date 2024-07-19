const express = require('express')
const {getSingleProduct, getProducts, createProduct, deleteProduct, updateProduct} = require('../controller/ProductController')

//Router
const router = express.Router()

router.get('/:id', getSingleProduct)

router.get('/', getProducts)

router.post('/', createProduct)

router.delete('/:id', deleteProduct)

router.patch('/:id', updateProduct)

module.exports = router
