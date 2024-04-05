const mongoose = require("mongoose");

const AddMusicSchema = mongoose.Schema({
  MusicTitle: {
    type: String,
    required: true,
  },
  directorname: {
    type: String,
    required: true,
  },

  filmoralbum: {
    type: String,
    required: true,
  },
   coverimage: {
    type: Object,
    required: true,
  },
  audio: {
    type: Object,
    required: true,
  },
});
module.exports = mongoose.model("AddAMusic", AddMusicSchema);
