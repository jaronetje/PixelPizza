const discord = require('discord.js');
const PixelPizza = require('pixel-pizza');
const { createEmbed, capitalize, editEmbed, sendEmbed } = PixelPizza;
const { red, blue } = PixelPizza.colors;
const { query } = require("../dbfunctions");
const { statuses } = PixelPizza.config;

module.exports = {
    name: "applications",
    description: "show all applications",
    aliases: ["apps"],
    minArgs: 0,
    usage: "<status>",
    cooldown: 0,
    userType: "staff",
    neededPerms: [],
    pponly: true,
    removeExp: false,
    /**
     * Execute this command
     * @param {discord.Message} message 
     * @param {string[]} args 
     * @param {PixelPizza.PPClient} client 
     * @returns {Promise<void>}
     */
    async execute(message, args, client) {
        const status = args.join(" ");
        let embedMsg = createEmbed({
            color: red.hex,
            title: `**${capitalize(this.name)}**`
        });
        let results;
        if(!args.length){
            results = await query("SELECT applicationId FROM application WHERE status = 'none'");
        } else if (!statuses.applications.includes(status)){
            embedMsg = editEmbed(embedMsg, {
                description: `${status} is not a valid status`,
                fields: [
                    {name: "Statuses", value: statuses.applications.join(", ")}
                ]
            });
            if (!client.canSendEmbeds) embedMsg = `${embedMsg.description}\n\n${embedMsg.fields[0].name}\n${embedMsg.fields[0].value}`; 
            return message.channel.send(embedMsg);
        } else {
            results = await query("SELECT applicationId FROM application WHERE status = ?", [status]);
        }
        let orderString = results.length ? "`" : "no applications have been found";
        for(let i in results){
            let result = results[i];
            orderString += result.applicationId;
            if(i == results.length - 1){
                orderString += "`";
            } else {
                orderString += ", ";
            }
        }
        sendEmbed(editEmbed(embedMsg, {
            color: blue.hex,
            description: orderString
        }), client, message);
    }
}