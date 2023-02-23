const Message = require('../models/message');

const sendMessage = async (req, res)=>{
    try{
        const msg = await Message.create({message:req.body.message, userId:req.user.id});
        res.status(201).json({newMessage: msg})
    } catch(err){
        res.status(500).json({error:err});
    }
}

module.exports = { sendMessage }