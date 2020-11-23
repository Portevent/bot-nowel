// noinspection JSUnusedLocalSymbols
module.exports = {
    name: 'loot_reaction',
    description: 'Loot un message (non inutilisable manuellement)',
    secret: true,
    locked: true,
    cooldown: 0.1,
    async execute(messageReaction, args) {
        let users = await messageReaction.users.fetch();

        users.delete(messageReaction.message.client.user.id);

        for(let user of users.values()){
            if(!user.bot && !messageReaction.message.client.inventory.userExists(user.id)){
                messageReaction.message.client.execute('greet', messageReaction.message, user);
            }
        }

        const bonus = 1 + users.size/4; // 25% de bonus par joueur participants
        let loot = await messageReaction.message.client.execute('loot', messageReaction.message, [bonus, users]);

        messageReaction.message.client.editWebhook(messageReaction.message.channel, {
            "content": loot.meta_loot.name + " **" + (loot.quantity>1?loot.quantity + 'x':'') + loot.item.emoji + loot.item.name + "**! Bravo à " + users.map(user => user.username)
        }, messageReaction.message.id);
        await messageReaction.message.reactions.removeAll();

    },
};