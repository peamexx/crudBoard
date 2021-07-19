require('dotenv').config(); // .env용

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userSchemas = require('./userSchemas');
const ejs = require('ejs');

app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
    if(err) console.log(err);
    else console.log('DB에 연결되었습니다.');   
});

app.set('view engine', 'ejs');

app.use(express.static('src'));
// app.use(express.urlencoded({extended: true}));

// [최초] DB 데이터 ---> 화면에 뿌려줌.
app.get('/', async (req, res) => {
    userSchemas.find({}, (err, el) => {
        res.render('index', {
            DATA: el
        })
    });
});

// 두번쓰면 뒤에꺼는 안잡힘...
app.get('/', async (req, res) => {
    // const data = await userSchemas.find();
    // // let totalCnt = data.length;
    // console.log(data[0].length);
    // document.querySelector('.totalCntA').textContent = 10;
});

// input 입력 ---> DB 데이터 추가
app.post('/add', async (req, res) => {
    const data = await userSchemas.find();
    let mostRecentUserId = data[data.length - 1].userid;

    let post = {
        userid: mostRecentUserId + 1,
        username: req.body.username,
        hobby: req.body.hobby
    };

    new userSchemas(post).save();
    res.redirect('/');
});

app.get('/', (req, res) => res.render('index'));

app.listen(3000, () => console.log('서버 시작'));















// guide
// 1. 데이터 넣기
// let user = {
//     userid: 1,
//     username: 'Macauley Robbins',
//     hobby: 'Improv'
// };
// new userSchemas(user).save();

// 2. 데이터 검색
// const data = await userSchemas.find();
// console.log(data);