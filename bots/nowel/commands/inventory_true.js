// noinspection JSUnusedLocalSymbols
module.exports = {
    name: 'inventory_true',
    description: {
        "fr": "**inventaire** : Affiche l'inventaire (avec objets cachés)",
        "en": "Display the inventory (with the hidden items)"
    },
    admin: true,
    execute(message, args) {


        const userId = message.author.id;
        const userName = message.author.username;
        const userAvatar = message.author.avatarURL();
        const inventory = message.client.inventory.getInventoryOfUser(userId);

        const language = message.client.getLanguage(message.channel);

        if(!inventory){
            return message.reply({
                "fr": "Tu n'as pas encore d'inventaire",
                "en": "You don't have any items yet"
            }[language]);
        }

        let webhook = {
            "username": {
                "fr": "Inventaire",
                "en": "Inventory"
            }[language],
            "avatar_url": "https://cdn.discordapp.com/attachments/770768439773888532/775420082285183036/icon__0027_Inventaire.png",
            "embeds": [
                {
                    "description": "",
                    "author": {
                        "name": userName,
                        "icon_url": userAvatar
                    },
                    "fields": []
                }
            ]
        };

        for(let category of Object.keys(inventory)){
            let text = "";

            for(let item of inventory[category].items){
                if(item.quantity !== 0) {
                    if (inventory[category].displayFullNameInInventory) {
                        text += item.emoji + item.name[language] + (item.quantity > 1 ? ' (' + item.quantity + ')' : '') + "\n";
                    } else {
                        text += item.emoji + " : " + item.quantity + "\n";
                    }
                }
            }

            if(text !== ""){
                webhook.embeds[0].fields.push({
                    "name": inventory[category].name[language],
                    "inline": true,
                    "value": text
                })
            }
        }

        if(message.channel.type === "dm"){
            webhook.embeds[0].title = webhook.username;
            webhook.embeds[0].author = {};
            message.channel.send('', {
                embed: webhook.embeds[0]
            });
        }

        else{
            message.client.sendWebhook(message.channel, webhook);
        }


        if(message.channel.type !== "dm"){
            message.delete({ timeout: 10000 });
        }
    },
};