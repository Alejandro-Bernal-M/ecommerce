const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');

//env
env.config();

// database connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('Database connected'));


app.use(express.json());
app.use(express.urlencoded({extended: true}))
// user route middleware
app.use('/api', authRoutes);
app.use('/api', adminRoutes);



app.listen(process.env.PORT, () => {
  console.log(`Server is running on port = ${process.env.PORT}`)
});