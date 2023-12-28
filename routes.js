const express = require("express");
const router = express.Router();
const listener=require('./Listener/ListenerController')
const creator=require('./Creator/CreatorController')

// const Creator=require('./Creator')


router.post('/listenerregister',listener.upload,listener.ListenerRegister)
router.post('/editListenerById/:id',listener.upload,listener.editListenerById)
router.post('/viewListenerById/:id',listener.viewListenerById)
router.post('/deleteListenerById/:id',listener.deleteListenerById)
router.post('/forgotPwd',listener.forgotPwd)
router.post('/viewListeners',listener.viewListeners)
router.post('/listenerLogin',listener.ListenerLogin)


router.post('/CreatorRegister',creator.upload,creator.CreatorRegister)
router.post('/editCreatorById',creator.upload,creator.editCreatorById)
router.post('/viewCreatorById/:id',creator.viewCreatorById)
router.post('/deleteCreatorById/:id',creator.deleteCreatorById)
router.post('/forgotPwdCreator',creator.forgotPwdCreator)
router.post('/viewCreators',creator.viewCreators)
module.exports=router