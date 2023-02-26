const Message = require('../models/message');

const sendMessage = async (req, res)=>{
    try{
        const msg = await Message.create({message:req.body.message, userId:req.user.id, groupId:req.params.id});
        res.status(201).json({newMessage: msg})
    } catch(err){
        res.status(500).json({error:err});
    }
}

const getMessages = async (req, res)=>{
    try{
        const grpId = req.params.id;
        console.log('grpId:', grpId);
        await Message.findAll({where:{groupId:grpId}})
        .then(messages=>{
            return res.status(200).json({messages:messages, success:true})
        })
    } catch(err){
        res.status(500).json({error:err});
    }
}

module.exports = { sendMessage, getMessages}