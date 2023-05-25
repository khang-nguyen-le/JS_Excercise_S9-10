'use strict'
const getEle = n => document.getElementById(n)

//Hàm lấy dữ liệu
function getData() {
    var accountName = getEle('tknv').value,
        workerName = getEle('name').value,
        email = getEle('email').value,
        passWord = getEle('password').value,
        startedDate = getEle('datepicker').value,
        pay = getEle('luongCB').value*1,
        position = getEle('chucvu').value,
        workHours = getEle('gioLam').value * 1;

    var isValid = true;
    isValid =
        validateAccount(accountName, 'tbTKNV', 6) &
        validateName(workerName, "tbTen") &
        validateEmail(email, "tbEmail") &
        validatePass(passWord, "tbMatKhau", 6, 10) &
        validateDate(startedDate, "tbNgay") &
        validatePay(pay, "tbLuongCB", 1000000, 20000000) &
        validatePosition(position, "tbChucVu") &
        validateWorkHours(workHours, "tbGiolam", 80, 200);
    
    if (!isValid) {
        return;
    }

    var worker = new Workers(accountName, workerName, email, passWord, startedDate, pay, position, workHours);

    return worker
}

//Hàm gán dữ liệu
function assignValue(accountName, workerName, email, passWord, startedDate, pay, position, workHours) {
    getEle('tknv').value = accountName;
    getEle('name').value = workerName;
    getEle('email').value = email;
    getEle('password').value = passWord;
    getEle('datepicker').value = startedDate;
    getEle('luongCB').value = pay;
    getEle('chucvu').value = position;
    getEle('gioLam').value = workHours;
}

//Hàm tìm nhân viên
function findWorker(accName) {
    var pos = -1;
    workerList.forEach(function (worker, index) {
        if (worker.accountName === accName) {
            pos = index
        }
    })
    return pos
}

//Hàm lưu dữ liệu xuống local
function saveWorkers(workerList) {
    localStorage.setItem('workers', JSON.stringify(workerList))
}

//Hàm lấy dữ liệu từ local
function getWorkers() {
    var workerListLocal = JSON.parse(localStorage.getItem('workers'));
    if (workerListLocal != null) {
        workerList = workerListLocal
    }
}

//Hàm Bỏ dấu tiếng Việt trước khi validate
function removeAscent(str) {
    if (str === null || str === undefined) return str;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}
