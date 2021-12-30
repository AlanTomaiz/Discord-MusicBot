module.exports = async (client) => {
  const { PREFIX } = client;

  client.user.setStatus('idle');
  client.user.setActivity(`Pornozão`, { type: "WATCHING" });

  // client.user.setActivity(`${PREFIX}help and ${PREFIX}play`, { type: "WATCHING" });
  client.log(`${client.user.username} ready!`);
}