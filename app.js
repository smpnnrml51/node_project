"use strict"
const express=require('express')
const hbs = require('hbs')
require("dotenv").config();
const mongoose = require('mongoose')
const port = process.env.PORT || 5000

const Model = require('./models/model.js');
const app=express()
// load handlebars
app.set('view-engine','hbs')
app.set('views','./views');
app.use(express.static('assets'));
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.static('./htmlcssthings'))

app.get('/',(req,res)=>{
    res.render('index.hbs')
})

// app.post('/signup',(req,res)=>{
//     console.log(req.body);
//     res.send(req.body.name)
// }) 

app.listen(port,()=>{
    console.log(`running on http://localhost:${port}`);
})

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/?retryWrites=true&w=majority`;
console.log(uri);
mongoose.connect(uri);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log(collection);
//   // perform actions on the collection object
//   client.close();
// });`

app.post('/signup', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        idnum:req.body.idnum
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})