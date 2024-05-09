const express = require('express')
const { getUsers, getSingleUser, createUser, deleteUser, updateUser, loginUser, staffOnline} = require('../controller/usersController') 
//ROUTER
const router = express.Router()

//GET
router.get('/', getUsers)

//GET SINGLE
router.get('/:id', getSingleUser)

//POST 
router.post('/', createUser)

//POST LOGIN
router.post('/login', loginUser)

//DELETE
router.delete('/:id', deleteUser)

//PATCH
router.patch('/:id', updateUser)

module.exports = router