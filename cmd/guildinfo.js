const fetch = require('node-fetch');

module.exports = {
    name: 'guildinfo',
    description: 'Get guild info',
    options: [
        {
            name: 'guild',
            type: 3,
            description: 'The guild to get info on',
            required: false
        }
    ],
    async execute(bot, interaction) {
        const guild = interaction.options.getString('guild') || interaction.guild;
        const res = await fetch(`https://discord.com/api/guilds/${guild.id}`, {
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': 'Bot ' + bot.token,
            },
        });
        const data = await res.json();
        const reschn = (id) => {
            const channel = interaction.guild.channels.cache.get(id);
            return channel ? `#${channel.name} (${id})` : `Unknown channel (${id})`;
        };
        const resusr = (id) => {
            const user = interaction.guild.members.cache.get(id);
            return user ? `${user.user.tag} (${id})` : `Unknown user (${id})`;
        }

        const msg = `\`\`\`
Information about ${data.name} (${data.id})

General info
----------------------
Guild name: ${data.name}
Created: ${guild.createdAt.toUTCString()}
Owner: ${resusr(data.owner_id)}
Region: ${data.region} (this is deprecated, voice channels have individual regions)
Verification level: ${data.verification_level}
Explicit content filter: ${data.explicit_content_filter}
MFA level: ${data.mfa_level}
Max members: ${data.max_members}
Max video channel users: ${data.max_video_channel_users}
Widget enabled: ${data.widget_enabled ? "Yes" : "No"}
Safety alerts channel: ${data.safety_alerts_channel_id ? reschn(data.safety_alerts_channel_id) : "Not set"}
Rules channel: ${data.rules_channel_id ? reschn(data.rules_channel_id) : "Not set"}
Public updates channel: ${data.public_updates_channel_id ? reschn(data.public_updates_channel_id) : "Not set"}

Features
----------------------
${data.features.length} features:\n${data.features.length > 0 ? data.features.join(', ') : "None"}

Roles
----------------------
${data.roles.length} roles:\n${data.roles.map(role => `${role.name}`).join(', ')}

Emojis
----------------------
${data.emojis.length} emojis:\n${data.emojis.map(emoji => `${emoji.name}`).join(', ') || "None"}

Banner
----------------------
${data.banner ? `https://cdn.discordapp.com/banners/${data.id}/${data.banner}.png` : 'No banner'}

Splash
----------------------
${data.splash ? `https://cdn.discordapp.com/splashes/${data.id}/${data.splash}.png` : 'No splash'}

Description
----------------------
${data.description || 'No description available'}
\`\`\``;
        await interaction.reply({ content: msg });

    }
}
