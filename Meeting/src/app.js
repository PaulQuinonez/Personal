const express = require('express');
require ('./comandos')
const {connectDB} = require ('./db')

const app = express();

async function main(){

    await connectDB();
    
}

main()

module.exports = app;