const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    // publishedYear: {
    //     type: Number,
    //     required: true,
    // },
    genre: [{
        type: String,
        enum: ['Autobiography','Fiction','Business','Non-Fiction', 'Mystery', 'Thriller', 'Science Fiction', 'Fantasy', 'Romance', 'Historical', 'Biography', 'Self-Help', 'Other'],
        required: true,
    }],
    language: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        default: 'United States'
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 10,
    },
    summary: {
        type: String, 
    },
    coverImageUrl: {
        type: String,
    },
}, { timestamps: true})

const Books = mongoose.model('Books', bookSchema)

module.exports = Books