const sequelize = require('./BACKEND/util/database');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

const userRoutes = require('./BACKEND/routes/user-routes');

app.use('/user', userRoutes);

sequelize
   .sync({force:true})
   .then(result=>{
      app.listen(3000);
   })
   .catch(err=>{
     console.log(err);
   })