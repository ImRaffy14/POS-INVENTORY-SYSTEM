const express = require('express')

const { staffOnline } = require('../controller/usersController') 

const router = express()

//GET STAFF ONLINE
router.get('/:id', staffOnline)

module.exports = router