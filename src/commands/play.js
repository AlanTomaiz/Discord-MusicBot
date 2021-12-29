module.exports = {
  name: 'play',
  description: 'Toque suas musicas favoritas',

  /**
   * @param {string[]} args
   */
  run: async (client, message, args) => {
    if (!message.member.voice.channel) {
      return client.sendError(
        message.channel,
        '❌ | **You must be in a voice channel to play something!**'
      );
    }

    const SearchString = args.join(" ");
    if (!SearchString) {
      return client.sendError(
        message.channel,
        `**Usage - **\`${client.botconfig.DefaultPrefix}play [song]\``
      );
    }
    console.log('guild', message.guild.me.voice.channel)
  }
}