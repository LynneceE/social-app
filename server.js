const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;



//use json
//use routes



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-circle', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//log mongo queries
mongoose.set('debug', true);

//confirm connection
app.listen(PORT, () =>console.log(`🔥 You're connected on http://localhost:${PORT} `));