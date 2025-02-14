// welcome to this... thing. 
// this is the simpler counterpart of ex3. i got pretty annoyed with the complexity of it (shocker) so i made this,
// without readability in mind - this is targeted to developers, or people with good eyes
const { Client, Intents, Collection } = require('discord.js');
const { token, id } = require('./i.json');
const fs = require('fs');
const path = require('path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
bot.cmds = new Collection();

const files = fs.readdirSync('./cmd').filter(f => f.endsWith('.js'));
const cmds = [];
for (const f of files) {
    const cmd = require(`./cmd/${f}`);
    bot.cmds.set(cmd.name, cmd);
    console.log(`${cmd.name} loaded...`);
    cmds.push({ name: cmd.name, description: cmd.description, options: cmd.options || [], integration_types: [0, 1], contexts: [0,1,2] });
    // these integration_types and contexts allow you to use commands everywhere which is rlly cool
    // i saw a youtube tutorial on how to do this but they parsed that to an individual command file which seemed very inefficient,
    // so i improvised
}

bot.on('ready', async () => {
    console.log(`${bot.user.tag} is online.`);
    bot.user.setStatus('dnd');
    const rest = new REST({ version: '9' }).setToken(token);
    try {
        console.log('Registering...');
        await rest.put(Routes.applicationCommands(id), { body: cmds });
        console.log('Done');
    } catch (error) {
        console.log('Failed to register commands:\n')
        console.error(error);
    }
});

bot.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const cmd = bot.cmds.get(interaction.commandName);
    if (!cmd) return;
    try {
        await cmd.execute(bot, interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: "```\n\n"+error+"\n\n```", ephemeral: true });
    }
});

bot.login(token);