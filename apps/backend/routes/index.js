const express= require('express');
const app=express();
const bodyparser=require('body-parser')
const cors=require('cors');
const userroute=require('./user')
const docrouter = require('./doc')

const rootrouter= express.Router();
app.use(cors())
app.use(bodyparser.json())
app.use(express.json())
rootrouter.use('/user',userroute)
rootrouter.use('/doc',docrouter)

module.exports = rootrouter;