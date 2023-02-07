const mongoose = require("mongoose");
const schema = mongoose.Schema;

let instapostSchema = new schema({
    name: { type: String },
    location: { type: String },
    description: { type: String },
    postImage: { type: JSON },
    likes : { type: Number },
    date : { type: String }
});

let postModel = mongoose.model("Instapost",instapostSchema);
module.exports = postModel;