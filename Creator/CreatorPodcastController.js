const CreatorPodcastSchema = require("./CreatorPodcastSchema");
const CreatorEpisode = require("./CreatorEpisodeSchema");
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

const creatorUploadPodcast = async (req, res) => {
  // console.log("test");
  // console.log(req.file);
  // console.log(req.files);
  let creatorsPodcast = new CreatorPodcastSchema({
    creatorname: req.body.creatorname,
    podcastname: req.body.podcastname,
    description: req.body.description,
    price: req.body.price,
    coverimage: req.files[0],
    audio: req.files[1],
    creatorId: req.body.creatorId,
  });
  creatorsPodcast
    .save()
    .then((response) => {
      res.json({
        status: 200,
        msg: "Podcast uploaded Succesfully",
        data: response,
      });
    })
    .catch((err) => {
      if (err.code == 11000) {
        res.json({
          status: 409,
          msg: "already uploaded",
        });
      } else {
        // console.log(err);
        res.json({
          status: 500,
          msg: "upload failed ",
        });
      }
    });
};

const viewCreatorPodcastById = (req, res) => {
  // console.log(req.body);
  CreatorPodcastSchema.findById({ _id: req.body.id })
    .then((data) => {
      // console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

const editCreatorPodcastById = (req, res) => {
  CreatorSchema.findByIdAndUpdate(
    { _id: req.body.id },
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      dob: req.body.dob,
      gender: req.body.gender,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      pincode: req.body.pincode,
      mobile: req.body.mobile,
      country: req.body.country,
      image: req.file,
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
};
const getAllPodcastByCreator = (req, res) => {
  CreatorPodcastSchema.find({ creatorId: req.body.id })
    .then((data) => {
      // console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

const getAllPodcast = (req, res) => {
  CreatorPodcastSchema.find()
    .then((data) => {
      // console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

const getPodcastByPodcastId = (req, res) => {
  // console.log(req.body.id)
  CreatorPodcastSchema.find({ _id: req.body.id })
    .then((data) => {
      // console.log(data)
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log("err");
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};

const getEpisodedOfPodcast = (req, res) => {
  // console.log(req.body.id);
  // console.log("req.body.id");
  CreatorEpisode.find({ podcastId: req.body.id })
    .then((data) => {
      // console.log(data);
      res.json({
        status: 200,
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log("err");
      res.json({
        status: 500,
        msg: "No Data obtained",
        Error: err,
      });
    });
};
const creatorpodcastCollection = async (req, res) => {
  try {
    const creatorpodcastCollection = await CreatorPodcastSchema.find({});
    const count = creatorpodcastCollection.length;
    res.json({ count });
    // console.log(donorCollections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  creatorUploadPodcast,
  multipleUpload,
  viewCreatorPodcastById,
  editCreatorPodcastById,
  getAllPodcastByCreator,
  getAllPodcast,
  getPodcastByPodcastId,
  getEpisodedOfPodcast,
  creatorpodcastCollection,
};
