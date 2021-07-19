require('dotenv').config(); // .env용

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err) console.log(err);
    else {
        console.log('DB에 연걸되었습니다.')
    }
});

app.use(express.static('src'));
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.listen(3000, () => console.log('서버 시작'));