const {connect, connection} = require ('mongoose');

const connectDB = async () => {

    await connect('mongodb://127.0.0.1:27017/meeting')
    // console.log('MongoDB conectado!')

}

connection.on('error', err => console.log(err))

module.exports = {
    connectDB,
    connection
}