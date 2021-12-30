module.exports = {
  name: 'stop',
  description: 'Para a música/playlist.',

  /**
   * @param {string[]} args
   */
  run: (client, interaction) => {
    const queue = client.queue.get(interaction.guild.id);

    if (!queue) {
      return client.sendError(
        interaction.channel,
        '❌ | **Não há nada reproduzindo.**'
      );
    }

    queue.songs = [];
    queue.connection.dispatcher.end();

    return client.sendError(
      interaction.channel,
      `⏹ | ${interaction.author} parou a música!`
    );
  }
}