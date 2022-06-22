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

// Serve frontend
if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../client/build')));
      
        app.get('*', (req, res) =>
          res.sendFile(
            path.resolve(__dirname, '../', 'client', 'build', 'index.html')
          )
        );
      } else {
        app.get('/', (req, res) => res.send('Please set to production'));
      }

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
