require('dotenv').config();
const connectDB = require('./config/db');

const express = require('express');
const schema = require('./schema/schema');

const port = process.env.PORT || 5000;
const {graphqlHTTP} = require('express-graphql');
const app = express();

connectDB();
        //end point
app.use('/graphql',graphqlHTTP({
     schema,
     graphiql: process.env.NODE_ENV === 'development'
}))


app.listen(port,console.log(`server running on port: ${port}`));