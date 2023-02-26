const Group = require('../models/group');
const User = require('../models/user');

const createGroup = async (req, res)=>{
    try{
        const user = await User.findOne({where : {id: req.user.id}})
        const group = await Group.create({name:req.body.name});
        await user.addGroup(group);
        res.status(201).json({newGroup: group});
    } catch(err){
        res.status(500).json({Error: err});
    }
}

const getGroups = async (req, res)=>{
    try{
        const user = await User.findAll({ where: {id:req.user.id}, include: Group})
        res.status(201).json({user: user});
    } catch(err){
        res.status(500).json({Error: err});
    }
}

const getGroupName = async (req, res)=>{
    try{
        const group = await Group.findOne({where: { id: req.params.id}})
        res.status(201).json({group:group});
    } catch(err){
        res.status(500).json({Error: err});
    }
}

module.exports = { createGroup, getGroups, getGroupName }