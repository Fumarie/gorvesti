const { Schema, model } = require("mongoose")

const News = new Schema({
    title: {type: String, required: true},
    fullLink: {type: String, required: true, unique: true},
    formattedTime: {type: String, required: true},
    fullText: {type: String, required: true}
})

module.exports = model("News", News)