const express = require('express');
const productsRoute = express.Router();

// Product model
let Product = require('../models/Product');

// Add Product
productsRoute.route('/create').post((req, res, next) => {
  Product.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get All Products
productsRoute.route('/').get((req, res) => {
  Product.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single employee
productsRoute.route('/read/:id').get((req, res) => {
  Product.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update employee
productsRoute.route('/update/:id').put((req, res, next) => {
  Product.findByIdAndUpdate(
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
productsRoute.route('/delete/:id').delete((req, res, next) => {
  Product.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = productsRoute
