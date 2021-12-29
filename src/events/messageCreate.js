module.exports = async (client, message) => {
  if (message.author.bot || message.channel.type === "dm") return;
  let prefix = client.botconfig.DefaultPrefix;

  if (!message.content.includes(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Searching a command
  const cmd = client.commands.get(command);
  if (!cmd) return;

  cmd.run(client, message, args);
}