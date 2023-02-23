const sequelize = require('./BACKEND/util/database');
const User = require('./BACKEND/models/user');
const Message = require('./BACKEND/models/message');

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

User.hasMany(Message);
Message.belongsTo(User);

app.use('/user', userRoutes);

const userAuthentication = require('./BACKEND/middleware/auth');
app.use('/message', userAuthentication.authenticate, msgController.sendMessage);

sequelize
   .sync()
   .then(result=>{
      app.listen(3000);
   })
   .catch(err=>{
     console.log(err);
   })