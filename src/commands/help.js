const { MessageEmbed } = require("discord.js");

module.exports = {
  name: 'help',
  description: 'Informações sobre o bot',

  /**
   * @param {string[]} args
   */
  run: async (client, message, args) => {
    let Commands = client.commands.map(
      (cmd) =>
        `\`${client.botconfig.DefaultPrefix}${cmd.name}\` - ${cmd.description}`
    );

    let Embed = new MessageEmbed()
      .setAuthor({ name: `Commands of ${client.user.username}`, iconURL: client.botconfig.IconURL })
      .setColor('#0099ff')
      .setDescription(`${Commands.join("\n")}

      Discord Music Bot Version: v1
      [GitHub](https://github.com/AlanTomaiz)`)
      // .addField('Inline field title', 'Some value here', true)
      // .setImage('https://i.imgur.com/AfFp7pu.png')
      .setTimestamp()
      .setFooter({ text: 'Have a nice day!' });

    message.channel.send({ embeds: [Embed] });
  }
}