// community modules
const { Command, Option, Argument, types } = require("xyncp");
const Promise = require("promise");

class Random extends Command {

    constructor() {
        super("random");

        this.args = [
            new Argument("min")
                .setType(new types.Num()),
            new Argument("max")
                .setType(new types.Num())
        ];
        this.options = {
            "--": [
                new Option("float"),
                new Option("count")
                    .setAliases([ "amount" ])
                    .setArgs([
                        new Argument("count")
                            .setType(new types.Num({
                                min: 1,
                                max: 12,
                                integer: true
                            }))
                    ])
            ]
        }
        this.aliases = [ "rand", "rnd", "gen" ];
    }

    execute(output, message, client) {
        return new Promise((resolve, reject) => {
            if (output.args.max <= output.args.min) {
                return resolve(new Error("max must be higher than min"));
            }
    
            const count = output.options.count ? output.options.count.count : 1;
            const values = [];
    
            for (let i = 0; i < count; i++) {
                const value = (Math.random() * ((output.args.max + 1) - output.args.min)) + output.args.min;
    
                values.push(output.options.float ? value : Math.floor(value));
            }
    
            message.channel.send(values.join("\n"))
                .then((message) => resolve())
                .catch(reject);
        });
    }

}

// exports
module.exports = Random;