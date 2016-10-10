'use strict';

let rp = require('request-promise');
let utils = require('./utils.js');

let routes = (server) => {
  /* Revel summary reports endpoint */

  // daily sales
  server.get('/daily/summary/report', (req, res) => {
    let options = req.body;
    rp(utils.getDailySummary(options))
    .then((data) => {
      //do something with that data
    })
  });

  // hourly sales
  server.get('/hourly/summary/report', (req, res) => {
    let options = req.body;
    rp(utils.getHourlySummary(options))
    .then((data) => {
      //do something with that data
    })
  });

  /* Revel inventory Endpoints */
  
  // summary
  server.get('/inventory/summary', (req, res) => {
    let options = req.body;
    rp(utils.getInventorySummary(options))
    .then((data) => {
      //do something with that data
    })
  });

  // current products
  server.get('/inventory/current/products', (req, res) => {
    let options = req.body;
    rp(utils.getCurrentInventory(options))
    .then((data) => {
      //do something with that data
    })
  });

  // current ingredients
  server.get('inventory/current/ingredients', (req, res) => {
    let options = req.body;
    rp(utils.getCurrentIngredients(options))
    .then((data) => {
      //do something with that data
    })
  });

  /* Fan Post endpoints */

  server.post('alert/fans', (req, res) => {
    // black magic - add logic to filter which fans to alert
    rp(utils.postMessageToFBFans());
    rp(utils.postMessageToTwitFans());
  });

};

module.exports = routes