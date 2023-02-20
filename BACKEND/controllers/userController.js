const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupUser = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;

        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async (err, hash) => {
            const user = await User.create({ name: name, email: email, phone: phone, password: hash });
            res.status(201).json({ newUser: user })
        })
    } catch (err) {
        res.status(500).json({ error: err });
    }
}

const generateAccessToken = (id, name)=>{
    return jwt.sign({userId:id, name:name }, 'wliefvfevbkeq13874tr13r3143j');
}

const loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        console.log(email);

        const users = await User.findAll({ where: {email} });

        if (users.length > 0) {
            bcrypt.compare(password, users[0].password, (err, result)=>{
                if(err){
                    throw new Error('something went wrong');
                }
                if(result==true){
                    res.status(200).json({success:true, message: 'User logged in successfully',
                    token: generateAccessToken(users[0].id, users[0].name) });
                }
                else{
                    res.status(401).json({success:false, message: 'Incorrect password'});
                }
            })
        }
        else {
            res.status(404).json({ success: false, message: "User doesn't exist" })
        }

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

module.exports = { signupUser, loginUser, generateAccessToken };