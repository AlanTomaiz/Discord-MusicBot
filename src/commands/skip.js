module.exports = {
  name: 'skip',
  description: 'Pula a música atual.',

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

    queue.playing = true;
    queue.connection.dispatcher.end();

    return client.sendError(
      interaction.channel,
      `⏭ | ${interaction.author} pulou a música!`
    );
  }
}