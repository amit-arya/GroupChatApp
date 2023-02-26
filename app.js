const sequelize = require('./BACKEND/util/database');
const User = require('./BACKEND/models/user');
const Message = require('./BACKEND/models/message');
const Group = require('./BACKEND/models/group');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({
   origin : "http://127.0.0.1:5500",
   credentials: true
}));

const userRoutes = require('./BACKEND/routes/user-routes');
const msgController = require('./BACKEND/controllers/messageController');
const groupController = require('./BACKEND/controllers/groupController');

User.hasMany(Message);
Message.belongsTo(User);

Group.hasMany(Message);
Message.belongsTo(Group);

User.belongsToMany(Group, {through: 'User_Groups'});
Group.belongsToMany(User, {through: 'User_Groups'});

app.use('/user', userRoutes);

const userAuthentication = require('./BACKEND/middleware/auth');
app.use('/send-message/:id', userAuthentication.authenticate, msgController.sendMessage);
app.use('/get-messages/:id', msgController.getMessages);
app.use('/creategroup', userAuthentication.authenticate, groupController.createGroup);
app.use('/get-groups', userAuthentication.authenticate, groupController.getGroups);
app.use('/get-group/:id', groupController.getGroupName);

sequelize
   .sync()
   .then(result=>{
      app.listen(3000);
   })
   .catch(err=>{
     console.log(err);
   })