const express = require('express');
const routes = express.Router();
let loguserId;
const Memorie = require('../models/Memorie');
const imagetype = [ 'image/png', 'imags/jpg', 'image/gif', 'image/jpeg' ]
const { verifyuser } = require('../../config/protectroute');
const User = require('../models/User');

routes.get('/memo/:id', verifyuser, async (req, res) => {
    const uid = req.params.id;
    const data = await Memorie.find({ uid }).sort({ date: 'desc' })
    res.render('memo', { data });
});

routes.get('/add', verifyuser, (req, res) => {
    const uid = req.userId;
    User.findOne({ _id: uid }).then(user => {
        loguserId = user._id
        res.render('add', { loguserId: user._id })
    });
});

routes.post('/add', async (req, res) => {
    let memo = new Memorie({
        title: req.body.title,
        desc: req.body.desc,
        uid: req.body.uid,
    });
    saveCover(memo, req.body.image);
    try {
        const newMemo = await memo.save();
        res.redirect(`/memo/${loguserId}`);
    } catch (error) {
        console.log(error);
        res.render('add', { loguserId })
    }
});

function saveCover(memo, imageEncoded) {
    if (imageEncoded == null) return;
    const image = JSON.parse(imageEncoded);
    if (image != null && imagetype.includes(image.type)) {
        memo.image = new Buffer.from(image.data, 'base64');
        memo.imageType = image.type
    }
}
module.exports = routes;