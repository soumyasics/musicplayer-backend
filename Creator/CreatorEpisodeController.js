const CreatorEpisodeSchema = require("./CreatorEpisodeSchema");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./upload");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

const multipleUpload = multer({ storage: storage }).single("files");
const singleupload = multer({ dest: 'uploads/' }).single('file')

const CreatorEpisode=async(req,res)=>{ 

    let CreatorEpisode = new CreatorEpisodeSchema({
        episodetitle:req.body.episodeTitle,
        episodecount: req.body.episodeCount,
        podcastId: req.body.podcastId,
        audio: req.file
    });
    CreatorEpisode
      .save()
      .then((response) => {
        res.json({
          status: 200,
          msg: "Podcast uploaded Succesfully",
          data:response
        });
      })
      .catch((err) => {
        if (err.code == 11000) {
          res.json({
            status: 409,
            msg: "already uploaded",
          });
        }
         else {
          console.log(err);
          res.json({
            status: 500,
            msg: "error",
          });
        }
      });
  }

  const viewEpisode=(req,res)=>{
    
    CreatorEpisodeSchema.find({}).exec()
    .then(data=>{
      if(data.length>0){
      res.json({
          status:200,
          msg:"Data obtained successfully",
          data:data
      })
    }else{
      res.json({
        status:200,
        msg:"No Data obtained "
    })
    }
  }).catch(err=>{
      res.json({
          status:500,
          msg:"Data not Inserted",
          Error:err
      })
  })
  
  }

  const viewEpisodeById = (req, res) => {
    const id = req.params.id;

    CreatorEpisodeSchema.findById(id)
        .exec()
        .then((data) => {
            if (data) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 400,
                    msg: "No data obtained"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                status: 500,
                msg: "Error fetching data",
                Error: err
            });
        });
};




  const editEpisode = (req, res) => {
    id=req.params.id
    CreatorEpisodeSchema.findByIdAndUpdate(id,
        {
            episodetitle: req.body.episodetitle,
            episodecount: req.body.episodecount,
            audio: req.file
        }
    )
    .exec()
    .then((data) => {
        res.json({
            status: 200,
            msg: "Updated successfully",
        });
    })
    .catch((err) => {
        res.json({
            status: 500,
            msg: "Data not Updated",
            Error: err,
        });
    });
  }
module.exports={CreatorEpisode, multipleUpload,viewEpisode,singleupload,editEpisode,viewEpisodeById}