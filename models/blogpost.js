var mongoose = require('mongoose');

module.exports = mongoose.model('BlogPost', {
    id      : Int32Array,
    title   : String,
    location: {city : String, country : String},
    image   : ImageData,
    content : String
});