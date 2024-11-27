class Bank{
    _customers;
    _transactions;


    constructor() {
        this._customers = [];
        this._transactions = [];
    }


    getCustomers() {
        return this._customers;
    }

    setCustomers(value) {
        this._customers = value;
    }

    getTransactions() {
        return this._transactions;
    }

    setTransactions(value) {
        this._transactions = value;
    }

    // Thêm khách hàng mới
    addCustomer(customer){
        this._customers.push(customer);
        console.log(`Customer added: ${customer._customerName}`);
    }

    findCustomer(customerId){
        return this._customers.find(customer => customer._customerId === customerId);
        /*
        .find(callback): Đây là một phương thức của mảng trong JavaScript. Nó duyệt qua
        từng phần tử trong mảng và trả về phần tử đầu tiên thỏa mãn điều kiện được định nghĩa trong hàm callback.
         */
    }

    // Thực hiện chuyển tiền giữa hai tài khoản dựa trên số tài khoản
    transfer(fromAccountNumber, toAccountNumber, amount) {
        let fromAccount = findAccountByNumber(fromAccountNumber);
        if (!fromAccount) {
            console.log(`Không tìm thấy tài khoản gửi tiền với số tài khoản: ${fromAccountNumber}`);
            return;
        }

        let toAccount = findAccountByNumber(toAccountNumber);
        if (!toAccount) {
            console.log(`Không tìm thấy tài khoản nhận tiền với số tài khoản: ${toAccountNumber}`);
            return;
        }

        // Kiểm tra loại tài khoản
        if (fromAccount._accountType === AccountType.SAVINGS) {
            console.log(`Tài khoản gửi tiền ${fromAccount._accountNumber} thuộc loại tiết kiệm, không thể chuyển tiền.`);
            return;
        }

        if (toAccount._accountType === AccountType.SAVINGS) {
            console.log(`Tài khoản nhận tiền ${toAccount._accountNumber} thuộc loại tiết kiệm, không thể nhận tiền.`);
            return;
        }

        // Kiểm tra số dư tài khoản gửi tiền
        if (fromAccount._balance < amount) {
            console.log(`Tài khoản ${fromAccount._accountNumber} không đủ số dư để thực hiện giao dịch.`);
            return;
        }

        // Thực hiện giao dịch
        fromAccount.withdraw(amount);
        toAccount.deposit(amount);

        createAndSaveTransaction(this._transactions, TypeTransaction.TRANSFER, amount);

        console.log(`Chuyển tiền thành công từ tài khoản ${fromAccountNumber} đến tài khoản ${toAccountNumber}. Số tiền: ${amount}`);
    }

    // Hiển thị danh sách khách hàng
    displayCustomers() {
        console.log("Bank Customers:");
        this._customers.forEach((customer, index) => {
            console.log(`${index + 1}. ${customer._customerName} (ID: ${customer._customerId})`);
        });
    }

    // Hiển thị lịch sử giao dịch
    displayTransactions() {
        console.log("Transaction History:");
        this._transactions.forEach(transaction => console.log(transaction.display()));
    }
}