const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config()
require('./startup/routes')(app)

if (!process.env.portfolio_jwtPrivateKey) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

mongoose.connect('mongodb://localhost:27017/Portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.listen(3000, () => {
    console.log("Server started on 3000 port.");
});