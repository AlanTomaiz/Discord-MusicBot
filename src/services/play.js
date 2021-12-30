const ytdl = require("ytdl-core-discord");

module.exports = async (client, interaction, song) => {
  const queue = client.queue.get(interaction.guild.id);

  if (!song) {
    setTimeout(() => {
      queue.channel.leave();
      client.sendSuccess(interaction.channel, `Deixando o canal de voz!`);
    }, 1000);

    return client.queue.delete(interaction.guild.id);
  }

  let stream = null;
  const streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";

  try {
    stream = await ytdl(song.url, { highWaterMark: 1 << 25 });
  } catch (err) {
    client.log(err.message);
  }

  queue.connection.on("disconnect", () => client.queue.delete(interaction.guild.id));

  const dispatcher = queue.connection;
  dispatcher.play(stream, { type: streamType });

  dispatcher.on("finish", () => {
    queue.songs.shift();
    module.exports.play(queue.songs[0], message);
  });

  dispatcher.on("error", (err) => {
    client.log(err.message);

    queue.songs.shift();
    module.exports.play(queue.songs[0], message);
  });

  client.sendSuccess(
    interaction.channel,
    `🎶 Tocando: **${song.title}** ${song.url}`
  );
}