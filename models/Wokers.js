function Workers(_accountName, _workerName, _email, _passWord, _startedDate, _pay, _position, _workHours) {
    this.accountName = _accountName;
    this.workerName =_workerName;
    this.email = _email;
    this.passWord = _passWord;
    this.startedDate = _startedDate;
    this.pay = _pay;
    this.position = _position;
    this.workHours = _workHours;
    this.totalSal = function(){
        var position = this.position;
        if(position === 'Sếp'){
            return this.pay * 3;
        }
        else if(position === 'Trưởng phòng'){
            return this.pay * 2;
        }
        else if(position === 'Nhân viên'){
            return this.pay * 1;
        }
    }
    this.wokerRank = function(){
        if(this.workHours >= 192){
            return 'Nhân viên xuất sắc'
        }
        else if(this.workHours >= 176){
            return 'Nhân viên giỏi'
        }
        else if(this.workHours >= 160){
            return 'Nhân viên khá'
        }
        else if(this.workHours < 160){
            return 'Nhân viên trung bình'
        }
    }
}