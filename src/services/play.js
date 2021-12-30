const ytdl = require("ytdl-core-discord");

module.exports = async (interaction, song) => {
  const { client } = interaction;
  const queue = client.queue.get(interaction.guild.id);

  if (!song) {
    setTimeout(() => {
      queue.voiceChannel.leave();
      client.sendSuccess(interaction.channel, `Playlist finalizada, deixando o canal de voz!`);
    }, 1000);

    return client.queue.delete(interaction.guild.id);
  }

  let stream = null;
  const streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";

  try {
    stream = await ytdl(song.url, { highWaterMark: 1 << 25 });
  } catch (err) {
    client.log(err.message);

    client.sendError(
      interaction.channel,
      `❌ Falha ao tocar **${song.title}**`
    );

    queue.songs.shift();
    module.exports(interaction, queue.songs[0]);
  }

  queue.connection.on("disconnect", () => client.queue.delete(interaction.guild.id));

  queue.connection
    .play(stream, { type: streamType })
    .on("finish", () => {
      queue.songs.shift();
      module.exports(interaction, queue.songs[0]);
    })
    .on("error", (err) => {
      client.log(err.message);

      queue.songs.shift();
      module.exports(interaction, queue.songs[0]);
    });

  client.sendSuccess(
    interaction.channel,
    `🎶 Tocando: **${song.title}** ${song.url}`
  );
}