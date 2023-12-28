const express = require("express");
const ListenerSchema = require("./ListenerSchema");
const mongoose = require("mongoose");
const multer = require("multer");
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

const ListenerRegister = (req, res) => {
  console.log(req ,"ll");
  let image = req.file;
  let listener = new ListenerSchema({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    dob: req.body.dob,
    gender: req.body.gender,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    mobile: req.body.mobile,
    country: req.body.country,
    image: image,
  });
  listener
    .save()
    .then((response) => {
      res.json({
        status: 200,
        msg: "saved",
        data:response
      });
    })
    .catch((err) => {
      if (err.code == 11000) {
        res.json({
          status: 409,
          msg: "Email Id Already Registered",
        });
      } else {
        console.log(err);
        res.json({
          status: 500,
          msg: "error",
        });
      }
    });
};

const ListenerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const listener = await ListenerSchema.findOne({ email: email });
    if (listener) {
      if (listener.password === password) {
        const token = jwt.sign(
          { email: listener.email, password: listener.password },
          "secret_key",
          { expiresIn: 86400 }
        );
        return res
          .status(200)
          .json({ message: "Login successful", token, id: listener._id });
      } else {
        return res.status(401).json({ message: "Password is incorrect" });
      }
    } else {
      return res.status(404).json({ message: "listener does not exist" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  upload,
  ListenerRegister,
  ListenerLogin,
};
