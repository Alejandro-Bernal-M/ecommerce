const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();

//env
env.config();

// database connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('Database connected'));


app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from server'
  });
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port = ${process.env.PORT}`)
});