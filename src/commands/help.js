const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'help',
  description: 'Lista de todos os comandos.',

  /**
   * @param {string[]} args
   */
  run: async (client, message, args) => {
    let Commands = client.commands.map(
      (cmd) =>
        `\`${client.PREFIX}${cmd.name}\` - ${cmd.description}`
    );

    let Embed = new MessageEmbed()
      .setAuthor(`${client.user.username} ajuda`, client.botconfig.IconURL)
      .setColor('#0099ff')
      .setDescription(`${Commands.join("\n")}

      Discord Music Bot Versão: v1
      [GitHub](https://github.com/AlanTomaiz/Discord-MusicBot)`)
      .setTimestamp();

    message.channel.send(Embed);
  }
}