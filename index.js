const database = require('./config/database');
const apiRoutes = require('./modules');
const express = require('express');
const middleware = require('./config/middleware');

const app = express();

const Port = process.env.PORT　|| 3000;

middleware(app);

app.get('/',(req,res)=>{
    res.send('this is test');
})

apiRoutes(app);

app.listen(3000, err=> {
    if (err){
        throw err;
    }else{
        console.log("The test Server Has Started!");
    }
});