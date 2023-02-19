const User = require('../models/user');
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');

const signupuser = async (req, res) =>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;

        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async(err, hash)=>{
            const user = await User.create({name: name, email:email, phone: phone, password: hash });
            res.status(201).json({newUser: user})
        })
    } catch(err){
        res.status(500).json({error: err});
    }
}

module.exports = {signupuser};