import DATA from './db.js';

// tag
const tbody = document.querySelector('tbody');
const pagination = document.querySelector('.pagination');

// input
const id = document.querySelector('.inpId');
const username = document.querySelector('.inpName');
const hobby = document.querySelector('.inpHobby');

// select
const select = document.querySelector('select');

// button
const btnRead = document.querySelector('.btnRead');

// data
let totalCnt = DATA.length; // 총 개수
let perCnt = 5; // 한페이지 당 보일 개수

// event
window.addEventListener('load', createPagi);
pagination.addEventListener('click', loadD);
btnRead.addEventListener('click', readD);
select.addEventListener('change', changePerCnt);
tbody.addEventListener('click', enterAuto);


// read
document.querySelector('.totalCntA').textContent = totalCnt;

// function
// 게시글 로드(최초+조건)
function readD(perCnt, startIdx, endIdx) {
    if(!endIdx) { // 페이지 로딩 시(최초)
        startIdx = 0;
        appendData(perCnt, startIdx);
    } else { // 페이징 눌렀을 때
        perCnt = endIdx + 1;
        appendData(perCnt, startIdx, endIdx);
    }

    document.querySelectorAll('.row')[2].scrollTop = 0
};

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

// 페이징 클릭 시 게시물 새로 로드
function loadD(e) {
    let target = e.target;
    let selected = Number(target.textContent); // 선택된 페이징 넘버

    let startIdx = Number(((perCnt * selected) - perCnt));
    let endIdx = Number(((perCnt * selected) - 1));

    // 행여나 페이징 클릭 시 미묘하게 a태그 말고 다른거 클릭하는거 방지
    if(target.closest('li') || target.closest('select')) {
        tbody.querySelectorAll('tr').forEach((el) => el.remove()); // 게시물 전체 삭제
        pagination.querySelectorAll('li').forEach((el) => el.classList.remove('active'));  // 페이징 .active 삭제
    }
    
    if(target.closest('li')) { // 페이징 클릭 시
        target.closest('li').classList.add('active'); // 선택된 페이징에 .active 추가
    } else if(target.closest('select')) { // select 클릭 시
        pagination.querySelectorAll('li').forEach((el) => el.remove()); // 페이징 전체 삭제
        createPagi();
    }

    readD(perCnt, startIdx, endIdx);
};

// select box 클릭 시 게시물 새로 로드
function changePerCnt(e) {
    let value = e.target.value;
    perCnt = value;
    loadD(e);
}

// 게시물 append
function appendData(perCnt, startIdx, endIdx) {
    DATA.forEach((el, index) => {
        const {id, name, hobby} = el;
        if(startIdx <= index && index < perCnt) {
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            td.textContent = id;
            tr.append(td);
    
            let td2 = document.createElement('td');
            td2.textContent = name;
            tr.append(td2);
    
            let td3 = document.createElement('td');
            td3.textContent = hobby;
            tr.append(td3);
    
            tbody.append(tr);
        }
    });
};

// 게시물 클릭 시 input에 자동으로 써줌
function enterAuto(e) {
    let target = e.target;
    let mother = target.closest('tr');

    id.value = mother.querySelectorAll('td')[0].textContent;
    username.value = mother.querySelectorAll('td')[1].textContent;
    hobby.value = mother.querySelectorAll('td')[2].textContent;
};