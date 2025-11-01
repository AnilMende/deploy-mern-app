const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/authModel")
        .then(() => {
            console.log("MongoDB Connected")
        }).catch((err) => {
            console.log("MongoDB Connection error", err);
        })