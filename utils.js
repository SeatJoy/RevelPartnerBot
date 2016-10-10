'use strict';

let rp = require('request-promise');
const config = require("./config.js");
const urls = require("./urls.js")

// Revel Summary Endpoint Options

function getDailySummary(opts) {
  return {
    method: "GET",
    uri: urls.revel_sales_summary,
    headers: {
      "API-AUTHENTICATION": config.revelApiKeySecret, 
    },
    body: {
      posstation: opts.pos,
      employee: opts.employee,
      show_unpaid: opts.show_unpaid,
      show_irregular: opts.show_irregular,
      range_from: opts.range_from,
      range_to: opts.range_to,
      establishment: opts.establishment,
      format: "json"
    },
    json: true
  }
}

function getHourlySummary(opts) {
  return {
    method: "GET",
    uri: urls.revel.hourly_summary,
    headers: {
      "API-AUTHENTICATION": config.revelApiKeySecret, 
    },
    body: {
      posstation: opts.pos,
      employee: opts.employee,
      show_unpaid: opts.show_unpaid,
      show_irregular: opts.show_irregular,
      range_from: opts.range_from,
      range_to: opts.range_to,
      establishment: opts.establishment,
      format: "json"
    },
    json: true
  }
}

function getInventorySummary(opts) {
  return {
    method: "GET",
    uri: urls.revel.inventory_sumamry,
    headers: {
      "API-AUTHENTICATION": config.revelApiKeySecret, 
    },
    body: {
      establishment: opts.establishment,
      user: opts.user,
      product_class: opts.product_class,
      search_query: opts.search_query,
      vendor: opts.vendor,
      inactive: opts.inactive,
      offset: opts.offset,
      limit: opts.limit,
      range_from: opts.range_from,
      range_to: opts.range_to,
    },
    json: true
  }
}

function getCurrentInventory(opts) {
  return {
    method: "GET",
    uri: urls.revel.inventory_current,
    headers: {
      "API-AUTHENTICATION": config.revelApiKeySecret, 
    },
    body: {
      establishment: opts.establishment,
      track_in_inventory: true,
      active: true,
      format: "json"
    },
    json: true  
  };
}

function getCurrentIngredients(opts) {
  return {
    method: "GET",
    uri: urls.revel.inventory_ingredients,
    headers: {
      "API-AUTHENTICATION": config.revelApiKeySecret, 
    },
    body: {
      establishment: opts.establishment,
      track_in_inventory: true,
      active: true,
      format: "json"
    },
    json: true
  };
}

// Test Merchant Facebook endpoint

function postMessageToFBFans(opts) {
  return {
    method: 'POST',
    uri: urls.app.facebook_post,
    body: {
      entry: [{ 
        messaging: [{
          sender: {
            id: opts.channel
          },
          timestamp: date.getTime(),
          message: {
            text: opts.text,
            attachments: opts.attachments
          },
        }]
      }]
    },
    json: true
  }
}

// Test Merchant Twitter endpoint

function postMessageToTwitFans(opts) {
  return {
    method: "POST",
    uri: urls.app.twitter_post,
    headers: {
      "API-AUTHENTICATION": config.revelApiKeySecret, 
    },
    body: {
      establishment: opts.establishment,
      track_in_inventory: true,
      active: true,
      format: "json"
    },
    json: true
  };
}

module.exports = { 
  getHourlySummary: getHourlySummary,
  getDailySummary: getDailySummary,
  getInventorySummary: getInventorySummary,
  getCurrentInventory: getCurrentInventory,
  getCurrentIngredients: getCurrentIngredients,
  postMessageToFBFans: postMessageToFBFans,
  postMessageToTwitFans: postMessageToTwitFans
}