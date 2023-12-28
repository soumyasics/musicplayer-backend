const express = require("express");
const router = express.Router();
const listener=require('./Listener/ListenerController')
// const Creator=require('./Creator')


router.post('/listenerregister',listener.upload,listener.ListenerRegister)
router.post('/listenerlogin',listener.ListenerLogin)
module.exports=router