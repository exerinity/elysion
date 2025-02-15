const fetch = require('node-fetch');

module.exports = {
    name: 'ip',
    description: 'Get information for an IP address',
    options: [
        {
            name: 'ip',
            description: 'The IP address',
            type: 3,
            required: true
        }],
    async execute(bot, interaction) {
        const ip = interaction.options.getString('ip');
        const res = await fetch(`https://ipwho.is/${ip}`);
        const data = await res.json();

        if (!data.success) {
            return await interaction.reply({ content: `unsuccessful`, ephemeral: true });
        }

        const msg = `\`\`\`
Information about ${ip}

General info
----------------------
IP: ${data.ip}
Type: ${data.type}

ISP
----------------------
ASN: ${data.connection.asn}
Organization: ${data.connection.org}
ISP: ${data.connection.isp}
Domain: ${data.connection.domain}

Location
----------------------
Continent: ${data.continent} (${data.continent_code})
Country: ${data.country} (${data.country_code})
Region: ${data.region} (${data.region_code})
City: ${data.city}
Postal code: ${data.postal}
Latitude: ${data.latitude}
Longitude: ${data.longitude}
Capital: ${data.capital}
Calling Code: +${data.calling_code}
Is in EU: ${data.is_eu ? 'Yes' : 'No'}
Borders: ${data.borders || 'None'}

Timezone
----------------------
Timezone: ${data.timezone.id} (${data.timezone.utc})
Offset: ${data.timezone.offset} seconds
Abbreviation: ${data.timezone.abbr}
Daylight Saving: ${data.timezone.is_dst ? 'Yes' : 'No'}
Current Time: ${data.timezone.current_time}
\`\`\``;
        
        await interaction.reply({ content: msg });
    }
}
