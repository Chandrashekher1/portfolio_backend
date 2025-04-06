const express = require('express');
const mongoose = require('mongoose');
const app = express();


mongoose.connect('mongodb://localhost:27017/Images', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.listen(3000, () => {
    console.log("Server started on 3000 port.");
});