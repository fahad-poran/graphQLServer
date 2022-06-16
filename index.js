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

app.use(cors({
        origin: "*",
        credentials: true,
}));
        //end point
app.use('/graphql',graphqlHTTP({
     schema,
     graphiql: process.env.NODE_ENV === 'development'
}))

app.get('/',(req,res)=>{
        res.send('Running Server For Heroku');
});
app.listen(port,console.log(`server running on port: ${port}`));
