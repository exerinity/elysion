const fetch = require('node-fetch');

module.exports = {
    name: 'guildicon',
    description: 'Get this guild icon, banner, and splash if applicable',
    async execute(bot, interaction) {
        const guild = interaction.guild;
        const res = await fetch(`https://discord.com/api/guilds/${guild.id}`, {
            withCredentials: true,
            credentials: 'include',
            headers: {
                'Authorization': 'Bot ' + bot.token,
            },
        });
        const data = await res.json();

        const icon = data.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${data.icon}.png?size=4096` : 'N/A';
        const banner = data.banner ? `https://cdn.discordapp.com/banners/${guild.id}/${data.banner}.png?size=4096` : 'N/A';
        const splash = data.splash ? `https://cdn.discordapp.com/splashes/${guild.id}/${data.splash}.png?size=4096` : 'N/A';

        const msg = `Icon: ${icon}\nBanner: ${banner}\nSplash: ${splash}`;

        return interaction.reply(msg);
    },
};
