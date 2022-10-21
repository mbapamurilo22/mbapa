const express = require('express');
const salesRoute = express.Router();

// Sale model
let Sale = require('../models/Sale');

// Add Sale
salesRoute.route('/create').post((req, res, next) => {
  Sale.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get All Sales
salesRoute.route('/').get((req, res) => {
  Sale.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single employee
salesRoute.route('/read/:id').get((req, res) => {
  Sale.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update employee
salesRoute.route('/update/:id').put((req, res, next) => {
  Sale.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
        console.log('Data updated successfully');
      }
    },
  )
})

// Delete employee
salesRoute.route('/delete/:id').delete((req, res, next) => {
  Sale.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = salesRoute
