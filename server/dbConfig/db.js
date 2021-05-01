const mongoose = require('mongoose')

var url = 'mongodb://localhost:27017/Directory';

mongoose.connect(url, {useNewUrlParser: true,  useUnifiedTopology: true} )
.catch(err => {
    console.log(err)
})

const db = mongoose.connection

db.on('error', () => console.log('connection error'))
db.once('open', () => console.log('db connected'))

module.exports = db