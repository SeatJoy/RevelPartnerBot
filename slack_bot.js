'use strict';
 
let Botkit = require('botkit');
let utils = require('./utils.js');
let server = require('./server.js');
const config = require("./config.js");

let slackbot = Botkit.slackbot({
  interactive_replies: true
});

// Configure slackbot
slackbot.configureSlackApp({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  redirectUri: config.redirectUri,
  scopes: ['bot'],
});

let bot = slackbot.spawn({})

slackbot
.createWebhookEndpoints(server)
.createOauthEndpoints(server, (err,req,res) => { 
  if (err) return res.status(500).send('Error:' + err);
  res.send('Success!');
 });

slackbot.on('create_bot', (bot,config) => {

  spawnedBot = bot;
  if (_bots[bot.config.token]) {
    // already online! do nothing.
    // create loyalty logic
  } else {
    bot.startRTM((err) => {
      if (!err) {
        trackBot(bot);
      }

      bot.startPrivateConversation({user: config.createdBy}, (err,convo) => {
        if (err) {
          console.log(err);
        } else {
          convo.say('Runner Bot is ONLINE!!!');
        }
      });

    });
  }

});

slackbot.on('rtm_open',function(bot) {
  console.log('** The RTM api just connected!');
});

slackbot.on('bot_group_join', (bot, message) => {

})