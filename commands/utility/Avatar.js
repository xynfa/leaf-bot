// core modules
const url = require("url");
const path = require("path");

// community modules
const { Command, Argument, types } = require("xyncp");
const Promise = require("promise");
const Discord = require("discord.js");

// imports
const Mention = require("../../types/Mention.js");

class Avatar extends Command {

    constructor() {
        super("avatar");

        this.args = [
            new Argument("member")
                .setType(new Mention("member"))
                .setOptional(true)
        ];
        this.aliases = [ "icon", "profilepicture", "pfp" ];
    }

    execute(output, message, client) {
        return new Promise((resolve, reject) => {
            const member = output.args.member || message.member;

            message.channel.send({
                files: [
                    {
                        attachment: member.user.displayAvatarURL,
                        name: `${member.displayName}${path.extname(url.parse(member.user.displayAvatarURL).pathname)}`
                    }
                ]
            })
                .then((message) => resolve())
                .catch(reject);
        });
    }

}

// exports
module.exports = Avatar;