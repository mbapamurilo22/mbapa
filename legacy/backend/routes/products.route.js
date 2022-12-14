const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Types = mongoose.Types;
const productsRoute = express.Router();
const integrate = require('../omie-integrator/integrator.js');

// Product model
let Product = require('../models/Product');

// Add Product
productsRoute.route('/create').post((req, res, next) => {
  const id = new Types.ObjectId();
  req.body._id = id;
  Product.create(req.body).then((data)  => {
    res.json(data); 
    integrate.integrate('create', data._id, 'products', data);
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
        integrate.integrate('edit', data._id, 'products', data);
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
