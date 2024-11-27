class Account {
    _accountNumber;
    _accountHolder;
    _balance;
    _accountType;

    constructor(accountNumber, accountHolder, accountType) {
        this._accountNumber = accountNumber; // stk
        this._accountHolder = accountHolder; // chu tk
        this._balance = 0; // so du
        this._accountType = accountType; // type (CHECKING/SAVINGS)
    }

    get accountNumber() {
        return this._accountNumber;
    }

    set accountNumber(value) {
        this._accountNumber = value;
    }

    get accountHolder() {
        return this._accountHolder;
    }

    set accountHolder(value) {
        this._accountHolder = value;
    }

    get balance() {
        return this._balance;
    }

    set balance(value) {
        this._balance = value;
    }

    get accountType() {
        return this._accountType;
    }

    set accountType(value) {
        this._accountType = value;
    }

    // GUI TIEN VAO TK
    deposit(amount){
        if (amount > 0) {
            this._balance += amount;
            console.log(`Da gui ${amount}. So du tai khoan hien tai ${this._balance}`)
        }else {
            console.log("So tien khong phu hop");
        }
    }

    // RUT TIEN TU TK
    withdraw(amount){
        if (amount > this._balance) {
            console.log("So du khong du");
        }else if(amount <= 0){
            console.log("So tien khong phu hop");
        }else {
            this._balance -= amount;
            console.log(`Da rut ${amount}, so du con lai: ${this._balance}`);
        }
    }

    // TINH LAI SUAT CHO TK TICH KIEM
    calculateInterest(rate){
        if (this._accountType === AccountType.SAVINGS && rate > 0){
            let interest = this._balance * (rate/100);
            console.log(`Lai xuat duoc tinh: ${interest}`);
            return interest;
        }else {
            console.log("Tai khoan khong ho tro hoac lai xuat khong phu hop");
            return 0;
        }
    }
}