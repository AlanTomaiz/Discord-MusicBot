const dotenv = require('dotenv').config();

module.exports = {
  Admins: ['UserID', 'UserID'], // Admins of the bot
  DefaultPrefix: process.env.Prefix || '!', // Default prefix, Server Admins can change the prefix
  Token: process.env.APP_TOKEN || '', // Discord Bot Token
  YoutubeSecret: process.env.APP_YOUTUBE_KEY || '', // Youtube API KEY
  IconURL: '', // URL of all embed author icons
};
