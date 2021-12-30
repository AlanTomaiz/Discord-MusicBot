const dotenv = require('dotenv').config();

module.exports = {
  Admins: ['UserID', 'UserID'], // Admins of the bot
  EmbedColor: 'RANDOM', //Color of most embeds
  DefaultPrefix: process.env.Prefix || '!', // Default prefix, Server Admins can change the prefix
  Token: process.env.APP_TOKEN || '', // Discord Bot Token
  ClientID: process.env.ClientID || '', // Discord Client ID
  ClientSecret: process.env.ClientSecret || '', // Discord Client Secret
  IconURL: '', // URL of all embed author icons
};
