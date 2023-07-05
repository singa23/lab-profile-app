const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

// PUT /api/users
router.put('/users', isAuthenticated, (req, res, next) => {
  console.log('req.payload', req.payload);
  const { image } = req.body;

  User.findByIdAndUpdate(req.payload._id, { image }, { new: true })
    .then((updatedUser) => {
      res.json(updatedUser); // 200 Ok {_ïd: .... }
    })
    .catch((err) => next(err));
});
// GET /api/users
router.get('/users', isAuthenticated, (req, res, next) => {
  console.log('req.payload', req.payload);
  res.json(req.payload);
});

// POST /api/upload
router.post('/upload', isAuthenticated, (req, res, next) => {
  const { image } = req.body;

  User.create({
    image,
  })
    .then((uploadedImage) => {
      res.json(uploadedImage);
    })
    .catch((err) => next(err));
});

module.exports = router;
