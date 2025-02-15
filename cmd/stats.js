const os = require('os');
const { version: dv } = require('discord.js'); 

module.exports = {
    name: 'stats',
    description: 'Get bot stats',
    async execute(bot, interaction) {
        const cn = os.cpus()[0].model;
        const uptime = `${Math.floor(bot.uptime / 1000 / 60 / 60 / 24)}:${Math.floor(bot.uptime / 1000 / 60 / 60 % 24).toString().padStart(2, '0')}:${Math.floor(bot.uptime / 1000 / 60 % 60).toString().padStart(2, '0')}:${(Math.floor(bot.uptime / 1000) % 60).toString().padStart(2, '0')}`;
        const msg = `\`\`\`
About elysion and system stats

General info
----------------------
Commands: ${bot.cmds.size}
Owner: @exerinity
Ping: ${bot.ws.ping} ms
Servers: ${bot.guilds.cache.size}

Versions
----------------------
Node.js: ${process.version}
Discord.js: ${dv}
Operating system: ${os.type()} ${os.release()} (${os.arch()})

System
----------------------
CPU: ${cn}
CPU usage: ${Math.round(process.cpuUsage().system / 1000000)}%
Memory: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB
Memory usage: ${Math.round(process.memoryUsage().heapUsed / process.memoryUsage().heapTotal * 100)}%
Uptime: ${uptime}

\`\`\``;

        await interaction.reply({ content: msg });
    }
};
