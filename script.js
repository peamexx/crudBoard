import DATA from './db.js';

// tag
const table = document.querySelector('table');
const tbody = document.querySelector('tbody');
const pagination = document.querySelector('.pagination');

// input
const id = document.querySelector('inpId');
const username = document.querySelector('inpName');
const age = document.querySelector('inpAge');

// button
const btnRead = document.querySelector('.btnRead');

// data
const totalCnt = DATA.length; // 총 개수
const perCnt = 8; // 한페이지 당 보일 개수

// event
window.addEventListener('load', createPagi);
pagination.addEventListener('click', loadD);
btnRead.addEventListener('click', readD);

// read
document.querySelector('.totalCntA').textContent = totalCnt;

// function
// 페이징 로드(최초)
function createPagi() {
    let cnt = totalCnt / perCnt;

    for(let i=0; i<cnt; i++) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.textContent = i + 1;
        li.append(a);
        pagination.append(li);
    }

    pagination.querySelector('li').classList.add('active');

    readD(perCnt);
};

// 게시글 로드(최초+조건)
function readD(perCnt, startIdx, endIdx) {
    if(!endIdx) { // 페이지 로딩 시(최초)
        startIdx = 0;
        resetData(perCnt, startIdx);
    } else { // 페이징 눌렀을 때
        perCnt = endIdx + 1;
        resetData(perCnt, startIdx, endIdx);
    }
};

// 페이징 클릭 시 게시물 새로 로드
function loadD(e) {
    let target = e.target;
    let selected = Number(target.textContent); // 선택된 페이징 넘버

    let startIdx = Number(((perCnt * selected) - perCnt));
    let endIdx = Number(((perCnt * selected) - 1));

    tbody.querySelectorAll('tr').forEach((el) => el.remove()); // 게시물 삭제
    pagination.querySelectorAll('li').forEach((el) => el.classList.remove('active'));  // 페이징 .active 삭제
    target.closest('li').classList.add('active'); // 선택된 페이징에 .active 추가

    readD(perCnt, startIdx, endIdx);
};

// 게시물 생성(코어)
function resetData(perCnt, startIdx, endIdx) {
    DATA.forEach((el, index) => {
        if(startIdx <= index && index < perCnt) {
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            td.textContent = el.id;
            tr.append(td);
    
            let td2 = document.createElement('td');
            td2.textContent = el.name;
            tr.append(td2);
    
            let td3 = document.createElement('td');
            td3.textContent = el.age;
            tr.append(td3);
    
            tbody.append(tr);
        }
    });
};