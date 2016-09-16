let mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/test');

let db = mongoose.connection;

db.on('error', () => console.log( 'connection error') )

db.once('open', () => console.log("connected") )

let gridSchema = mongoose.Schema({
  name: { type: String, required: true },
  grid: { type: [Number], required: true }
})

let Grid = mongoose.model('Grid', gridSchema );

function closeMongo() {
  return db.close();
}

module.exports = {Grid, closeMongo};
