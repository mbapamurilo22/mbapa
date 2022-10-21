const express = require('express');
const clientsRoute = express.Router();

// Client model
let Client = require('../models/Client');

// Add Client
clientsRoute.route('/create').post((req, res, next) => {
  Client.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get All Clients
clientsRoute.route('/').get((req, res) => {
  Client.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single employee
clientsRoute.route('/read/:id').get((req, res) => {
  Client.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update employee
clientsRoute.route('/update/:id').put((req, res, next) => {
  Client.findByIdAndUpdate(
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
clientsRoute.route('/delete/:id').delete((req, res, next) => {
  Client.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = clientsRoute
