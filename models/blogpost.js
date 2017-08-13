var mongoose = require('mongoose');

module.exports = mongoose.model('BlogPost', {
    title   : String,
    date    : Date,
    location: {city : String, country : String},
    image   : {image: Buffer, contentType: String},
    content : String
});