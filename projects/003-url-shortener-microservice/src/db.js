const mongoose = require('mongoose')


// connessione al database di mongodb
const {MongoClient} = require('mongodb'); //class
const { response } = require('express')
const dbUri = 'mongodb+srv://mrleon:tTl2CJQwuULohtBN@clusternoel.na3wadp.mongodb.net/?retryWrites=true&w=majority'
const mongoClient = new MongoClient(dbUri); //instance

async function run(){
    await mongoClient.connect();   // return a promis so I use await
    console.log('you are connected on Db')
}run().catch(e =>console.log('Errorr connection' + e))

module.exports = run;