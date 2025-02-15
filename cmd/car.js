const fetch = require('node-fetch');
const { ninja } = require('../i.json');
const url = `https://api.api-ninjas.com/v1/cars?model=`

module.exports = {
    name: 'car',
    description: 'Get information for a car',
    options: [
        {
            name: 'car',
            description: 'The car model',
            type: 3,
            required: true
        }],
    async execute(bot, interaction) {
        const car = interaction.options.getString('car');
        const res = await fetch(url+car, {
            headers: {
                'x-api-key': ninja
            }
        });
        const data = await res.json();
        const msg = `\`\`\`
${data[0].make} ${data[0].model} (${data[0].year})

General info
----------------------
Class: ${data[0].class}
Fuel type: ${data[0].fuel_type}
Transmission: ${data[0].transmission}

Engine
----------------------
Cylinders: ${data[0].cylinders}
Displacement: ${data[0].displacement}

Fuel efficiency
----------------------
City MPG: ${data[0].city_mpg}
Highway MPG: ${data[0].highway_mpg}
Combined: ${data[0].combination_mpg}

Miscellaneous
----------------------
Drivetrain: ${data[0].drive}
Transmission: ${data[0].transmission}

\`\`\``;
        
        await interaction.reply({ content: msg });  
    }
}