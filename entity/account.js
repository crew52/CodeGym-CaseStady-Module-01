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

    getAccountNumber() {
        return this._accountNumber;
    }

    setAccountNumber(value) {
        this._accountNumber = value;
    }

    getAccountHolder() {
        return this._accountHolder;
    }

    setAccountHolder(value) {
        this._accountHolder = value;
    }

    getBalance() {
        return this._balance;
    }

    setBalance(value) {
        this._balance = value;
    }

    getAccountType() {
        return this._accountType;
    }

    setAccountType(value) {
        this._accountType = value;
    }

    // GUI TIEN VAO TK
    deposit(amount, transactions) {
        if (amount > 0) {
            this._balance += amount;
            console.log(`Đã gửi ${amount}. Số dư tài khoản hiện tại: ${this._balance}`);

            // Lưu giao dịch
            createAndSaveTransaction(transactions, TypeTransaction.DEPOSIT, amount, "D");
        } else {
            console.log("Số tiền không phù hợp");
        }
    }

    // RUT TIEN TU TK
    withdraw(amount, transactions) {
        if (amount > this._balance) {
            console.log("Số dư không đủ");
        } else if (amount <= 0) {
            console.log("Số tiền không phù hợp");
        } else {
            this._balance -= amount;
            console.log(`Đã rút ${amount}, số dư còn lại: ${this._balance}`);

            // Lưu giao dịch
            createAndSaveTransaction(transactions, TypeTransaction.WITHDRAW, amount,"W");
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