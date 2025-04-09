const { SlashCommandBuilder } = require('discord.js');
const { apiKey } = require('../../config.json');
const apiUrl = 'https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('account')
        .setDescription('Information about your account')
        .addStringOption(option =>
            option.setName('account-name')
            .setDescription('Account Name like name#tag')
            .setRequired(true)),
    async execute(interaction) {
        const accountName = interaction.options.getString('account-name');
        let array = accountName.split("#");
        let name = array[0];
        let tag = array[1];
        let apiUrlCall = apiUrl.concat(name, "/", tag, "?api_key=", apiKey);
        fetch(apiUrlCall).then(response => {
            if (!response.ok) {
                console.log('Network response was not ok!');
            }
            return response.json();
        }).then(outputData => {
            console.log(outputData);
            let output = JSON.stringify(outputData, null, 2);
            interaction.reply(`${output}`);
        }).catch(error => {
            console.error('Error:', error);
        });
        
        
    },
}