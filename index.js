const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const express = require('express');
const schema = require('./schema/schema');
 
const port = process.env.PORT || 5000;
const {graphqlHTTP} = require('express-graphql');
const { application } = require('express');
const app = express();

connectDB();

app.use(express.static('public'));

app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'public','index.html'));
});

        //end point
app.use('/graphql',graphqlHTTP({
     schema,
     graphiql: process.env.NODE_ENV === 'development'
}))

app.get('/',(req,res)=>{
        res.send('Running Server For Heroku');
});

// Serve frontend

app.listen(port,console.log(`server running on port: ${port}`));
