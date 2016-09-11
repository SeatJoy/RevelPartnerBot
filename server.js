'use strict';

let express = require('express');
let server = express();     
let bodyParser = require('body-parser');
let path = require('path');
let utils = require('./utils.js');
let shellDb = require('./db.js');
let config = require('./config.js');
let date = new Date();

// MIDDLEWARE
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

// HOMEPAGE MIDDLEWARE
server.use('/', express.static(__dirname + '/public'));

// ROUTES
server.get('/retrieve/order', (req, res) => {
  utils.retrieveOrders()
  .then((data) => {

    // parse data and send to the bot
    res.send(utils.parseData(data));
  })
  .catch((err) => {
    console.log(err);
  });
})

server.post('/submit/order', (req, res) => {
  let body = req.body;
  let attendant = shellDb.attendant[0];

  utils.submitOrders(body)
  .then((data) => {
    let customerOpts = {
      first_name: body.first_name,
      last_name: body.last_name,
      channel_name: `${body.first_name.splice(0,4)} ${body.last_name.splice(0,4)}_${body.date.getTime()}`,
      order_items: body.order_items
    };

    // create slack channel
    utils.createPrivateChannel(customerOpts.channelName)
    .then((data) => {
      let botOpts = {
        channel: data.group.id,
        user: config.botId
      }

      // invite bot
      utils.inviteUser(botOpts);
    })

    // update db with customer data
    attendant.customers_serviced.push(customerOpts);
  })
  .then(() => {
    res.send('ok');
  })
  .catch((err) => {
    console.log(err);
  })
})


server.listen(3000, () => {
  console.log('Listening on Port: 3000');
})

module.exports = server;