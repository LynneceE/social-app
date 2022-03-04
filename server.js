const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;



//use json
//use routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes')); // pull from routes folder



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-app', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

//log mongo queries
mongoose.set('debug', true);


//confirm connection w/ link
app.listen(PORT, () =>console.log(`🔥 You're connected on http://localhost:${PORT}`));