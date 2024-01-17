const mongoose = require("mongoose");

const CreatorPodcastSchema = mongoose.Schema({
  creatorname: {
    type: String,
    required: true,
  },
  podcastname: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
  audio: {
    type: Object,
    required: true,
  },

  image: {
    type: Object,
  },
});
module.exports = mongoose.model("creatorsPodcast", CreatorPodcastSchema);
