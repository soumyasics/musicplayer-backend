const AddMusicSchema = require("./AdminAddmusicSchema");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const multipleUpload = multer({ storage: storage }).array("files", 2);

const AddAMusic = async (req, res) => {

    let AddAMusic = new AddMusicSchema({
        MusicTitle: req.body.MusicTitle,
        directorname: req.body.directorname,
        filmoralbum: req.body.filmoralbum,
        coverimage: req.files[0],
        audio: req.files[1],
        });
    await AddAMusic
        .save()
        .then((response) => {
            res.json({
                status: 200,
                msg: "Music uploaded Succesfully",
                data: response
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
                    msg: " upload failed",
                });
            }
        });
}


const viewAllMusic = (req, res) => {

    AddMusicSchema.find({}).exec()
        .then(data => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                })
            } else {
                res.json({
                    status: 200,
                    msg: "No Data obtained "
                })
            }
        }).catch(err => {
            res.json({
                status: 500,
                msg: "Data not Inserted",
                Error: err
            })
        })

}

const DeleteASong = (req, res) => {
    musicid = req.params.musicid
    AddMusicSchema.findByIdAndDelete(musicid
    )
      .exec()
      .then((data) => {
        res.json({
          status: 200,
          msg: "deleted successfully",
          data: data
        });
      })
      .catch((err) => {
        res.json({
          status: 500,
          msg: "Data not deleted",
          Error: err,
        });
      });
  }
  
module.exports = {
    multipleUpload, AddAMusic, viewAllMusic,DeleteASong
}