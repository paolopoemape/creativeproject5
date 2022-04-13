const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();


const users = require("./users.js");
const User = users.model;
const photos = require("./photos.js");
const Photo = photos.model;
const validUser = users.valid;
const comment = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  comment: String,
  photo: {
    type: mongoose.Schema.ObjectId,
    ref: 'Photo'
  },
      Date: Date
  });


const Comment = mongoose.model('Comment',  comment);
// upload photo
router.post("/:id", validUser, async (req, res) => {
  let comment = new Comment({
    user: req.user,
    comment: req.body.comment,
    photo: req.params.id,
    Date: Date.now()
  });
   try {
     console.log(comment)
      await comment.save();
      res.send(comment);
   } catch (error) {
     console.log(error);
     res.sendStatus(500);
   }
 });


 router.get("/:id", async (req, res) => {
   let photo = await Photo.findOne({
     _id: req.params.id});
   let comments = await Comment.find({
       photo: photo,
    }).populate('user').populate('photo');
    try {
      res.send(comments);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });


module.exports = {
  model: comment,
  routes: router,
}
