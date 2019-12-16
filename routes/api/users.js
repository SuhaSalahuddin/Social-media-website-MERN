const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//Load usermodel
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    tests user route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "User works" }));

// @route   POST api/users/register
// @desc    Register users
// @access  Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exist" });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", //Size
          r: "pg", //Rating
          d: "mm" //Default
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err)
              throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
        res.send(newUser);
      }
    })
    .catch(error => {
      console.log("inside catch");
      console.log("error: ", error);
    });
});

// @route   POST api/users/login
// @desc    Login user / returning JWT token
// @access  Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User.findOne({ email})
    .then(user => {
      //Check for user
      if(!user){
        return res.status(404).json({email:'User not found'});
      }
      //Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch){
            //User Matched
            const payload={
              id: user.id, 
              name: user.name,  
              avatar: user.avatar
            }

            //Sign Token
            jwt.sign(payload, keys.secretOrKey,{expiresIn: 3600}, (err, token) =>{
              res.json({
                success: true,
                token: 'Bearer ' + token
              });
            });

          } else{
            return res.status(400).json({password: 'Password incorrect'})
          }
        })
        res.send(newUser);
    });     
});

// @route   GET api/users/current 
// @desc    return current user
// @access  Private
router.get('/current', passport.authenticate('jwt',{session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});
module.exports = router;
