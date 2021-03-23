const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  lat: {type: Number, required: true},
  lng: {type: Number, required: true},
  owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Coordinates', schema)
