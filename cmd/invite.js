const fetch = require('node-fetch');

module.exports = {
    name: 'invite',
    description: 'Get info on a server invite code',
    options: [
        {
            name: 'invite',
            type: 3,
            description: 'The invite code to get info on',
            required: true
        }
    ],
    async execute(bot, interaction) {
        const invite = interaction.options.getString('invite');
        const res = await fetch(`https://discord.com/api/invites/${invite}`, {
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
        const reschn = (id) => {
            const channel = bot.channels.cache.get(id);
            return channel ? `#${channel.name} (${id})` : `Unknown channel (${id})`;
        }
        const msg = `\`\`\`
Information about invite ${data.code}

General info
----------------------
Invite code: ${data.code}
Inviter: ${resusr(data.inviter.id)}
Channel: ${reschn(data.channel.id)}
Guild: ${data.guild.name} (${data.guild.id})

Dates
----------------------
Expires at: ${new Date(data.expires_at).toUTCString()}
----------------------
If you instead wanted to invite the bot, please open my profile and press "Add App".
If you want more info on the server, use this command: /guildinfo ${data.guild.id}. If you want more info on the inviter, use this command: /userinfo ${data.inviter.id}.
\`\`\``;

        return interaction.reply(msg);
    },
};