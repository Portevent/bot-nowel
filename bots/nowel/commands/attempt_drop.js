// noinspection JSUnusedLocalSymbols
module.exports = {
    name: 'attempt_drop',
    description: {
        "fr": 'Tente un drop de cadeau / collectable (Utilisé quand quelqu\'un envoi un message)',
        "en": 'Run a gift/collectable drop attempt (used when someone send a message)'
    },
    admin: true,
    guildOnly: true,
    secret: true,
    execute(message, args) {
        let nb = Math.random() * Math.max(1, 1 + (2 * (5 - message.client.messageSinceLastDrop)));

        if(nb < 0.5){
            message.client.execute('drop', message, []);
            message.client.messageSinceLastDrop = 0;
        }else{
            message.client.messageSinceLastDrop++;
        }
    },
};