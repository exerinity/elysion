const fetch = require('node-fetch');
const { options } = require('./invite');

module.exports = {
  name: 'guildtemplate',
  description: 'Get info on a guild template',
  options: [
    {
      name: 'template',
      type: 3,
      description: 'The template code to get info on',
      required: true
    }
  ],
  async execute(bot, interaction) {
    const template = interaction.options.getString('template');
    const res = await fetch(`https://discord.com/api/guilds/templates/${template}`, {
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': 'Bot ' + bot.token,
      },
    });
    const data = await res.json();
    const resusr = (id) => {
      const user = bot.users.cache.get(id);
      return user ? `${user.tag} (${id})` : `Unknown user (${id})`;
    }
    const msg = `\`\`\`
Information about template ${data.code}

General info
----------------------
Template code: ${data.code}
Name: ${data.name}
Description: ${data.description}
Usage count: ${data.usage_count}
Creator: ${resusr(data.creator_id)}

Dates
----------------------
Created at: ${new Date(data.created_at).toUTCString()}
Updated at: ${new Date(data.updated_at).toUTCString()}
\`\`\``;

    return interaction.reply(msg);
  }
}