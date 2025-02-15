module.exports = {
    name: 'about',
    description: 'blah blah blah',
    async execute(bot, interaction) {
        const msg = `\`\`\`
Elysion is an extremely simple bot by exerinity. It is virtually the simpler counterpart of ex3, if that's even possible.

Cool stuff:
- No embeds
- Very lightweight
- Open source (This is the official build by the developer)
- No data collection AT ALL.

Not so cool stuff:
- No embeds
- No embeds
- No embeds

What should I use? ex3 or elysion?
If you want visually appealing embeds, lots of interactivity, and a broader set of functionality, use ex3.
If you don't, use elysion. elysion is for presenting information in a simple, borderline readable way.

Both support using commands everywhere. However, elysion is the quickest, and more immediate. So, it really depends on how good your eyes are xD
Why not use both?
\`\`\``;
        await interaction.reply({ content: msg });
    }
}