const { prefix } = require('../config_files/config.json');

module.exports = {
    name: 'help',
    description: 'Liste des commandes',
    aliases: ['commands', 'aide', 'ls', 'list', 'liste'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Liste des commandes');
            commands.map(command => {
                if(!command.secret && !command.adminOnly ){
                    data.push('**' + command.name + '** : ' + command.description);
                }
            })
            data.push(`\nPour avoir plus de détails sur une commande : \`${prefix}help [commande]\` `);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!').then(message => message.delete(10000));
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?').then(message => message.delete(10000));
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true });

    },
};