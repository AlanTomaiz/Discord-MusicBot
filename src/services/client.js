const { Collection, Client, Intents, MessageEmbed } = require('discord.js');
const Logger = require("./logger");
const path = require('path');
const fs = require('fs');

class DiscordBot extends Client {
  constructor(props) {
    super({ intents: [Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS] });

    this.commands = new Collection();
    this.queue = new Map();
    // this.SongsPlayed = 0;

    this.botconfig = require('../../botconfig');
    this.logger = new Logger('Logs.log');
    this.PREFIX = this.botconfig.DefaultPrefix;

    this.LoadCommands();
    this.LoadEvents();
  }

  log(Text) {
    this.logger.log(Text);
  }

  LoadCommands() {
    const CommandsDir = path.join(__dirname, '..', 'commands');

    fs.readdir(CommandsDir, (err, files) => {
      if (err) this.log(err);
      else {
        files.forEach((file) => {
          const cmd = require(`${CommandsDir}/${file}`);
          const name = file.split(".")[0];

          if (!cmd.name || !cmd.description) {
            return this.log(`Unable to load Command: ${name}.`);
          }

          this.commands.set(name.toLowerCase(), cmd);
          this.log(`Command Loaded: ${name}`);
        });
      }
    });
  }

  LoadEvents() {
    const EventsDir = path.join(__dirname, '..', 'events');

    fs.readdir(EventsDir, (err, files) => {
      if (err) this.log(err);
      else {
        files.forEach((file) => {
          const event = require(`${EventsDir}/${file}`);
          const name = file.split(".")[0];

          this.on(name, event.bind(null, this));
          this.log(`Event Loaded: ${name}`);
        });
      }
    });
  }

  sendError(Channel, Error) {
    const Embed = new MessageEmbed()
      .setColor('#e74c3c')
      .setDescription(Error);

    Channel.send(Embed);
  }

  sendSuccess(Channel, Error) {
    const Embed = new MessageEmbed()
      .setColor('#9b59b6')
      .setDescription(Error);

    Channel.send(Embed);
  }

  build() {
    this.login(this.botconfig.Token);
  }
}

module.exports = DiscordBot;
