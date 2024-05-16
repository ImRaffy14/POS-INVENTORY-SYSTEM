const mongoose = require('mongoose')
const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const multer  = require('multer')

// STORAGE ENGINE FOR AVATAR
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      
      cb(null, `${Date.now()}${file.originalname}`)
    }
  })

  
const upload = multer({ storage })



//GET
const getUsers = async (req,res) => {
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}

//GET SINGLE
const getSingleUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: "Invalid ID"})
    }

    const user = await User.findById(id)

    if(!user){
       return res.status(404).json({msg: "User not found"})
    }

    res.status(200).json(user)

}



//POST
const createUser = async (req, res) => {
    try {
        
        upload.single('image')(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            const { email, username, password, role } = req.body;
            const avatarPath = `${req.file.filename}`
            
            let hashedPassword = '';

            if (password) {
                hashedPassword = await bcrypt.hash(password, 10);
            }

            let confirmRole = role;

            if (confirmRole === 'Select Role') {
                confirmRole = '';
            }

            const user = await User.create({ email, username, password: hashedPassword, role: confirmRole, avatar: avatarPath });
            res.status(200).json(user);
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};




//POST LOGIN

    const loginUser = async (req, res) => {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: User._id }, 'secret_key', { expiresIn: '1h' });
            res.status(200).json({token, user});

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };


//GET STAFF ONLINE

    const staffOnline = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: "Invalid ID"})
    }

    const user = await User.findById(id)

    if(!user){
       return res.status(404).json({msg: "User not found"})
    }

    res.status(200).json(user)

}
  


//DELETE
const deleteUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: "Invalid ID"})
    }

    const user = await User.findOneAndDelete({_id: id},{
        ...req.body
    })

    if(!user){
      return  res.status(404).json({msg: 'User not found'})
    }

    res.status(200).json(user)   
}

//PATCH
const updateUser = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: "Invalid ID"})
    }

    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!user){
       return res.status(404).json({msg: "user not found"})
    }

    res.status(200).json(user)
}

module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    loginUser,
    staffOnline,
    
}