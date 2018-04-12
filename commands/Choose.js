// community modules
const { Command, Argument, types } = require("xyncp");

class Ball extends Command {

    constructor() {
        super("choose");

        this.args = [
            new Argument("options")
                .setType(new types.List(new types.Str(), {
                    min: 2
                }))
        ];
    }

    execute(output, message, client) {
        message.channel.send(`🤔 ${output.arguments.options[Math.floor(Math.random() * output.arguments.options.length)]}`);
    }

}

// exports
module.exports = Ball;