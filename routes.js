const express = require("express");
const router = express.Router();

const listener=require('./Listener/ListenerController')
const creator=require('./Creator/CreatorController')
const creatorpodcast=require('./Creator/CreatorPodcastController')
const admin=require('./Admin/AdminControl')
const subscriptionController=require('./Listener/Subscriptions/subscriptionController')
const episode=require('./Creator/CreatorEpisodeController')
const listenerreview=require('./Listener/Review/reviewController')
//Listeners
router.post('/listenerLogin',listener.ListenerLogin)
router.post('/listenerregister',listener.upload,listener.ListenerRegister)
router.post('/editListenerById',listener.upload,listener.editListenerById)
router.post('/viewListenerById',listener.viewListenerById)
router.post('/deleteListenerById/:id',listener.deleteListenerById)
router.post('/listenerforgotpassword',listener.forgotPwd)
router.post('/viewListeners',listener.viewListeners)
router.post('/getAllpodcast',listener.getAllPodcast)
router.post('/addToWishlist',listener.addToWishlist)
router.post('/getWishlist',listener.getWishlist)


//Creators
router.post('/creatorLogin',creator.CreatorLogin)
router.post('/CreatorRegister',creator.upload,creator.CreatorRegister)
router.post('/editCreatorById',creator.upload,creator.editCreatorById)
router.post('/viewCreatorById',creator.viewCreatorById)
router.post('/creator_upload_podcast',creatorpodcast.multipleUpload,creatorpodcast.creatorUploadPodcast)
router.post('/getPodcastByID',creatorpodcast.viewCreatorPodcastById)
router.post('/creator_edit_upload_podcast',creatorpodcast.multipleUpload,creatorpodcast.editCreatorPodcastById)
router.post('/getAllPodcastByCreator',creatorpodcast.getAllPodcastByCreator)
router.post('/deleteCreatorById/:id',creator.deleteCreatorById)
router.post('/forgotPwdCreator',creator.forgotPwdCreator)
router.post('/viewCreators',creator.viewCreators)
router.post("/viewepisode/:id", episode.viewEpisode)
router.post("/getAllPodcast", creatorpodcast.getAllPodcast)
router.post("/getPodcastByPodcastId", creatorpodcast.getPodcastByPodcastId)
router.post("/getEpisodedOfPodcast", creatorpodcast.getEpisodedOfPodcast)
router.post("/podcastcollection", creatorpodcast.creatorpodcastCollection)

router.post("/listenercollection", listener.listenerCollection)
router.post("/creatorCollection",creator.creatorCollection)
router.post("/getSubscriptions",creator.getSubscriptions)
// episode



router.post('/uploadepisode',episode.singleupload, episode.CreatorEpisode)
router.post('/editepisode/:id',episode.singleupload,episode.editEpisode)
router.post('/viewepisodebyid/:id',episode.singleupload, episode.viewEpisodeById)
router.post('/deleteepisode/:id',episode.singleupload, episode.DeleteEpisode)
//admin
router.post('/admin_login',admin.adiminLogin)



//Subsription routes
//Done By Soumya

// router.post('/subscribeCreator/:id',subscriptionController.subscribeCreator)
// router.post('/viewSubscriptionByCreatorId/:id',subscriptionController.viewSubscriptionByCreatorId)
// router.post('/viewSubscriptionById/:id',subscriptionController.viewSubscriptionById)
// router.post('/updatePayment/:id',subscriptionController.updatePayment)
// router.post('/viewSubscriptionByListenerId/:id',subscriptionController.viewSubscriptionByListenerId)

//demo routes
//Done By Ajeena
router.post('/subscribePodcast',subscriptionController.subscribePodcast)
router.post('/viewSubscriptionByListenerId',subscriptionController.getSubscriptionByListenerId)
router.post('/viewsubscriptions',subscriptionController.Subcsriptions)
router.post('/listenerreview',listenerreview.listenerReview)
router.post('/getreviewodpodcast',listenerreview.getreviewodpodcast)
router.post('/getReviewaById',listenerreview.getCreatorReview)


module.exports=router