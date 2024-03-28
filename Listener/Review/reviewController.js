const express = require("express");
const ListenerreviewSchema = require("./reviewSchema");
const mongoose = require("mongoose");

const listenerReview = (req, res) => {
    // console.log(req.body);
    //  console.log(req.file);
      let Reviews = new ListenerreviewSchema({
        feedback: req.body.feedback,
        listenername: req.body.listenername,
        creatorname: req.body.creatorname,
        creatorid: req.body.creatorid,
      });
      Reviews
        .save()
        .then((response) => {
          res.json({
            status: 200,
            msg: "Thank you",
            data:response
          });
        })
        .catch((err) => {
          if (err.code == 11000) {
            res.json({
              status: 409,
              msg: "Already Given",
            });
          } else {
            console.log(err);
            res.json({
              status: 500,
              msg: "submit faild",
            });
          }
        });
    };
module.exports={listenerReview}