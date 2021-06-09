const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyuser } = require('../../config/protectroute');
let loguserId;
const fs = require('fs');
const Memorie = require('../models/Memorie');
const path = require('path');
const multer = require('multer');
const uploadPath = path.join('public', Memorie.coverImageBasePath);
const upload = multer({
    dest: uploadPath,
});
router.get('/', verifyuser, (req, res) => {
    const uid = req.userId;
    User.findOne({ _id: uid }).then(user => {
        res.render('dashboard', { user });
    });
});

router.get('/login', (req, res) => {
    res.render('login')
});
router.get('/logout', (req, res) => {
    res.cookie('user', "", { maxAge: 10 })
    res.redirect('/login');
});

router.get('/register', (req, res) => {
    res.render('register')
});
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const error = [];
    if (error.length > 0) {
        res.render('register', { error });
    }
    User.findOne({ email }).then(user => {
        if (user) {
            error.push({ msg: "User Already Registered!" });
            res.render('register', { error, name, email })
        } else {
            try {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                newUser.save().then(user => {
                    res.redirect('/login');
                }).catch(err => {
                    console.log(err);
                })
            } catch (error) {
                console.log(error);
            }
        }
    });
});
const maxage = 60 * 60 * 24 * 3;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECREET_TOKEN, { expiresIn: maxage });
};

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const error = [];
    User.findOne({ email }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    const token = createToken(user._id);
                    res.cookie('user', token, { maxAge: maxage * 1000 });
                    res.redirect(`/`);
                } else {
                    error.push({ msg: "password is not matching!" });
                    res.render('login', { error, email });
                }
            });
        } else {
            error.push({ msg: 'user not found !' });
            res.render('login', { error });
        }
    })
});

router.get('/memo/:id', async (req, res) => {
    const uid = req.params.id;
    const data = await Memorie.find({ uid }).sort({ date: 'desc' })
    res.render('memo', { data });
});

router.get('/add', verifyuser, (req, res) => {
    const uid = req.userId;
    User.findOne({ _id: uid }).then(user => {
        loguserId = user._id
        res.render('add', { loguserId: user._id })
    });
});

router.post('/add', upload.single('image'), async (req, res) => {
    const filename = req.file != null ? req.file.filename : null
    let memo = new Memorie({
        title: req.body.title,
        desc: req.body.desc,
        uid: req.body.uid,
        imagename: filename
    });
    try {
        const newMemo = await memo.save();
        res.redirect(`/memo/${loguserId}`);
    } catch (error) {
        console.log(error);
        if (book.imagename != null) {
            removeBookCover(book.imagename)
        }
        res.render('add', { loguserId })
    }
});

function removeBookCover(filename) {
    fs.unlink(path.join(uploadPath, filename), err => {
        if (err) {
            console.log(err);
        }
    });
};

module.exports = router;