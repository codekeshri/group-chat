const Message = require('../models/message');
const User = require('../models/user');

const jwt = require('jsonwebtoken');

const secret_key=process.env.SECRET_KEY

const sendMessage = async (req, res) => {
  try {
    const message = req.body.message;
    const data = await Message.create({ message: message, userId: req.user.id, groupId: +req.body.activeGroupId});
    const user = await User.findOne({where:{ id: req.user.id}})   
    res.status(200).json({success: true, message: "Message sent successfully",newMessage:{data: data, user: user}})  
    }catch (err) {
      console.log("Error storing message")
    res.status(500).json({ success: false, error: err.message });
  }
}

const getMessage = async(req, res) =>{
    const userId = req.user.id; 
  try{
    const messages = await Message.findAll( {where: {groupId: req.params.groupId}, include: [{model: User, attribute: ['name']}]})
    console.log(`${userId}, ${req.params.groupId}, ${messages}`)
    res.status(200).json({success: true, allMessage: messages});
  }catch(err){
    res.status(500).json({success: false, error: err.message})
  }
}








module.exports = {
  sendMessage,
  getMessage
}