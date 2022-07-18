const express=require('express')
const hbs = require('hbs')
// var bodyParser = require('body-parser')
const port = process.env.PORT || 5000


const app=express()
// load handlebars
app.set('view-engine','hbs')
app.set('views','./views');
app.use(express.static('assets'));
app.use(express.urlencoded());
// app.use(express.static('./htmlcssthings'))

app.get('/',(req,res)=>{
    res.render('index.hbs')
})

app.post('/signup',(req,res)=>{
    console.log(req.body);
    res.send(req.body.name)
}) 

app.listen(port,()=>{
    console.log('server is listening');
})