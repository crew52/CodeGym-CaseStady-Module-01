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
    deposit(amount, transactions, isTransfer = false) {
        if (amount > 0) {
            this._balance += amount; // Cập nhật số dư sau khi nạp tiền
            console.log(`Đã gửi ${amount}. Số dư tài khoản hiện tại: ${this._balance}`);

            // Lưu giao dịch chỉ khi không phải là giao dịch chuyển tiền
            if (!isTransfer) {
                createAndSaveTransaction(transactions, TypeTransaction.DEPOSIT, amount, "D");
            }
        } else {
            console.log("Số tiền không phù hợp");
        }
    }

    // RUT TIEN TU TK
    withdraw(amount, transactions, isTransfer = false) {
        if (amount > this._balance) {
            console.log("Số dư không đủ");
        } else if (amount <= 0) {
            console.log("Số tiền không phù hợp");
        } else {
            this._balance -= amount; // Cập nhật số dư sau khi rút tiền
            console.log(`Đã rút ${amount}, số dư còn lại: ${this._balance}`);

            // Lưu giao dịch nếu không phải là giao dịch chuyển tiền
            if (!isTransfer) {
                createAndSaveTransaction(transactions, TypeTransaction.WITHDRAW, amount, "W");
            }
        }
    }


    // TINH LAI SUAT CHO TK TICH KIEM
    calculateMonthlyInterest(rate, transactions) {
        if (this._accountType === AccountType.SAVINGS && rate > 0) {
            const interest = this._balance * (rate / 100);
            this._balance += interest; // Cộng lãi vào số dư
            createInterestTransaction(this, interest, transactions); // Ghi giao dịch
            console.log(`Lãi suất hàng tháng: ${interest}. Số dư hiện tại: ${this._balance}`);
            return interest;
        } else {
            console.log("Không thể tính lãi suất. Loại tài khoản không hỗ trợ hoặc tỷ lệ không hợp lệ.");
            return 0;
        }
    }
}