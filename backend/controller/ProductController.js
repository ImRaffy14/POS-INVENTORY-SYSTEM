const mongoose = require('mongoose')
const User = require('../model/userModel')
const multer  = require('multer')
const fs = require('fs');
const path = require('path');
const products = require('../model/ProductModel')

//GET Single

const getSingleProduct = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(400).json({msg: 'INVALID ID'})    
    }

    const product = await products.findById(id)

    if(!product){
        return res.status(401).json({msg: 'Product not found'})
    }

    res.status(200).json(product)
}

//GET 

const getProducts = async (req, res) => {
    const product = await products.find({}).sort({createdAt: -1})
    res.status(200).json(product)
}

//POST

const createProduct = async (req, res) =>{
    const {name, amount} = req.body

    const product = await products.create({name, amount})
    console.log('tanga')
    res.status(200).json({msg:'tanga'})
}

//DELETE

const deleteProduct = async (req, res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(400).json({msg: 'INVALID ID'})    
    }

    const product = await products.findById(id)

    if(!product){
        return res.status(401).json({msg: 'Product not found'})
    }

    const delProduct = await products.findOneAndDelete({ _id: id})
    res.status(200).json(delProduct)

}

//PATCH (UPDATE)

const updateProduct = async ( req, res) => {

    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: "Invalid ID"})
    }

    const product = await products.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!product){
       return res.status(404).json({msg: "product not found"})
    }

    res.status(200).json(product)
}



module.exports = {
    getSingleProduct,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct
}