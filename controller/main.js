'use strict';
var workerList = [];

getWorkers()

uiRender()


//Hàm thêm nhân viên
function addWorker() {
    var worker = getData();

    if (worker) {
        workerList.push(worker)

        saveWorkers(workerList)

        assignValue('', '', '', '', '', '', '', '')

        uiRender()
    }

}

//Hàm render dữ liệu
function uiRender() {
    var content = '';

    for (var i = 0; i < workerList.length; i++) {
        var worker = new Workers();
        var workerItem = workerList[i];

        Object.assign(worker, workerItem)

        content +=
            `
        <tr>
            <td>${worker.accountName}</td>
            <td>${worker.workerName}</td>
            <td>${worker.email}</td>
            <td>${worker.startedDate}</td>
            <td>${worker.position}</td>
            <td>${worker.totalSal()}</td>
            <td>${worker.wokerRank()}</td>
            <td>
                <button class="btnDelete" onclick = "deleteWorker('${worker.accountName}')">
                    <i class="fa fa-trash"></i>
                </button>
                <button class="btnEdit" onclick = "getWorkerData('${worker.accountName}')" data-toggle = "modal"  data-target = "#myModal">
                    <i class="fa fa-pencil"></i>
                </button>
            </td>
        </tr>
        `
    }
    getEle('tableDanhSach').innerHTML = content
}

//Hàm xóa nhân viên
function deleteWorker(accName) {
    var index = findWorker(accName);

    if (index != -1) {
        workerList.splice(index, 1);
        saveWorkers(workerList)
        uiRender()
    }
}

//Hàm lấy dữ liệu để cập nhật
function getWorkerData(account){
    getEle('tknv').readOnly = true;
    getEle('btnCapNhat').disabled = false;

    var index = findWorker(account);
    var worker = workerList[index]

    assignValue(
        worker.accountName,
        worker.workerName,
        worker.email,
        worker.passWord,
        worker.startedDate,
        worker.pay,
        worker.position,
        worker.workHours,
    )
}

//Hàm cập nhật dữ liệu
function updateWorker(){
    var updatedWorker = getData();
    var index = findWorker(updatedWorker.accountName)

    workerList[index] = updatedWorker;

    saveWorkers(workerList)
    uiRender()
    getEle('tknv').readOnly = false;
}

//Hàm đóng modal
function closeModal() {
    //Xóa giá trị input
    assignValue('', '', '', '', '', '', '', '')

    //Xóa các thông báo validation
    getEle('tbTKNV').innerHTML = '';
    getEle('tbTen').innerHTML = '';
    getEle('tbEmail').innerHTML = '';
    getEle('tbMatKhau').innerHTML = '';
    getEle('tbNgay').innerHTML = '';
    getEle('tbLuongCB').innerHTML = '';
    getEle('tbChucVu').innerHTML = '';
    getEle('tbGiolam').innerHTML = '';

    //Tắt chế độ chỉ đọc tài khoản
    getEle('tknv').readOnly = false;

    //Disable nút cập nhật
    getEle('btnCapNhat').disabled = true;
}

//Hàm tìm kiếm nhân viên theo xếp loại
function searchWorker() {

    var searchInput = getEle('searchName'),
        filterInput = searchInput.value.toUpperCase(),
        table = document.querySelector('.myTable'),
        tr = table.getElementsByTagName('tr'),
        td, txtValue, textValueAscent;

    for(var i = 0; i < tr.length; i++){
        td = tr[i].getElementsByTagName('td')[6];

        if (td){
            txtValue = removeAscent(td.textContent || td.innerText);
            textValueAscent = td.textContent || td.innerText;

            if((txtValue.toUpperCase().indexOf(filterInput) > -1) ||
                (textValueAscent.toUpperCase().indexOf(filterInput) > -1)
                ){
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}