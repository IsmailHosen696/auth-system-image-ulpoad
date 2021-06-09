const mongoose = require('mongoose');
const path = require('path');
const coverImageBasePath = 'uploads/bookCovers';

const MemoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    imagename: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
})

MemoSchema.virtual('imagepath').get(function () {
    if (this.imagename != null) {
        return path.join('/', coverImageBasePath, this.imagename)
    }
})

module.exports = mongoose.model('Memo', MemoSchema);
module.exports.coverImageBasePath = coverImageBasePath;