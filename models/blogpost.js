var mongoose = require('mongoose');

module.exports = mongoose.model('BlogPost', {
    title   : String,
    location: {city : String, country : String},
    image   : {data: Buffer, contentType: String},
    content : String
});