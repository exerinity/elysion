const fetch = require('node-fetch');

module.exports = {
    name: 'userinfo',
    description: 'Get user info',
    options: [
        {
            name: 'user',
            type: 6,
            description: 'The user to get info on',
            required: false
        }
    ],
    async execute(bot, interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = interaction.guild ? interaction.guild.members.cache.get(user.id) : null;
        console.log(user); console.log(member);

        const res = await fetch(`https://japi.rest/discord/v1/user/${user.id}`);
        const { data, presence } = await res.json();

        const msg = `\`\`\`
Information about ${data.username} (${data.id})

General info
----------------------
Display name: ${data.global_name || "N/A"}
Username: @${data.username}
ID: ${data.id}
Tag: ${data.tag}
Bot: ${data.bot ? "Yes" : "No"}
System: ${data.system ? "Yes" : "No"}
Verified: ${data.verified ? "Yes" : "No"}
Has MFA enabled: ${data.mfa_enabled ? "Yes" : "No"}
Discriminator: ${data.discriminator || "has a username"}

Dates
----------------------
Created at: ${new Date(data.createdTimestamp).toUTCString()}
Joined this server: ${member ? member.joinedAt.toUTCString() : "N/A"}

Specifics
----------------------
Nitro: ${data.public_flags_array.includes("NITRO") ? "Yes" : "No"}
Public flags: ${data.public_flags_array.join(", ") || "N/A"} (${data.public_flags})
Avatar: ${data.avatarURL}
Banner: ${data.bannerURL || "N/A"}
Banner colour: ${data.banner_color || "N/A"}
Presence: ${presence?.status || "N/A"}
\`\`\``;
        await interaction.reply({ content: msg });
    }
}