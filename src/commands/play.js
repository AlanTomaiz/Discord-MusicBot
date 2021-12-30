const ytdl = require("ytdl-core");
const play = require("../services/play");

module.exports = {
  name: 'play',
  description: 'Toque suas musicas favoritas',

  /**
   * @param {string[]} args
   */
  run: async (client, interaction, args) => {
    const voiceChannel = interaction.member.voice.channel;
    const serverQueue = client.queue.get(interaction.guild.id);

    if (!voiceChannel) {
      return client.sendError(
        interaction.channel,
        '❌ | **Você precisa entrar em um canal de voz primeiro!**'
      );
    }

    if (serverQueue && voiceChannel !== interaction.guild.me.voice.channel) {
      return client.sendError(
        interaction.channel,
        `❌ | **Você precisa está no mesmo canal que ${client.user.username}**`
      );
    }

    const SearchString = args.join(" ");
    if (!SearchString) {
      return client.sendError(
        interaction.channel,
        `**Modo de uso - **\`${client.PREFIX}play [song]\``
      );
    }

    const videoPattern = /^(https?:\/\/)?(www\.)?(m\.|music\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const urlValid = videoPattern.test(args[0]);
    if (!urlValid) {
      return client.sendError(
        interaction.channel,
        '❌ | **Você deve informar uma URL do youtube.**'
      );
    }

    const queueConstruct = {
      textChannel: interaction.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    const songInfo = await ytdl.getInfo(SearchString).catch(() => {});
    if (!songInfo) {
      return client.sendError(
        interaction.channel,
        '❌ | **Áudio não encontrado.**'
      );
    }

    const song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
      duration: songInfo.videoDetails.lengthSeconds
    };

    if (serverQueue) {
      serverQueue.songs.push(song);

      return client.sendSuccess(
        interaction.channel,
        `✅ **${song.title}** foi adicionado na playlist por ${interaction.author}`
      );
    }

    queueConstruct.songs.push(song);
    client.queue.set(interaction.guild.id, queueConstruct);

    try {
      queueConstruct.connection = await voiceChannel.join();
      play(client, interaction, queueConstruct.songs[0]);
    } catch (error) {
      client.log(error.message);

      await voiceChannel.leave();
      client.queue.delete(message.guild.id);

      return client.sendError(
        interaction.channel,
        `❌ | **Não pude entrar no canal: ${error.message}**`
      );
    }
  }
}