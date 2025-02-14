module.exports = {
    name: 'test',
    description: 'Does it work?',
    async execute(bot, interaction) {
        await interaction.reply('```\n\nyes\n\n```');
    }
};