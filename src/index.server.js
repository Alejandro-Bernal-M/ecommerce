const express = require('express');
const env = require('dotenv');
const app = express();

//env
env.config();

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from server'
  });
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port = ${process.env.PORT}`)
});