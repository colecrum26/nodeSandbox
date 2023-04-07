const { EventEmitter } = require('events');
const fs = require('fs')
let eventEmitter = new EventEmitter;

const readStream = fs.createReadStream("./demoFile.txt");

const myEventHandler = (thing) => {
    console.log("inserting some thing into the events")
};

eventEmitter.on("insert", myEventHandler);

eventEmitter.emit("insert", { pokemon: "Zapdos", type: "lightning" });

function addPokemonToDB(pokemon, callback) {
    insertPokemon(pokemon, (err) => {
        if (err) {
            return handleError(err);
        }

        alertUser(pokemon, callback);
    })
}