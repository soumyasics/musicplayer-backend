const mongoose = require("mongoose");

const CreatorEpisodeSchema = mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "creators",
  },
  episodeid: {
    type: String,
    required: true,
  },

  episodecount: {
    type: Number,
    required: true,
  },
  audio: {
    type: Object,
    required: true,
  },
});
module.exports = mongoose.model("creatorsPodcast", CreatorEpisodeSchema);
