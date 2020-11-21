module.exports = {
    setup(client) {
        client.stop = false;
    },

    onNullCommand(message){
        message.client.execute("reply", message, {});
    },
    onInvalidCommand(message, args, commandName){
        message.client.execute("reply", message, args);
    },
    onWebhook(message){
        message.react('🎁');
    },

    prefix: "all",
};