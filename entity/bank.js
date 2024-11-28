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
        let fromAccount = findAccountByNumber(this._customers, fromAccountNumber);
        if (!fromAccount) {
            console.log(`Không tìm thấy tài khoản gửi tiền với số tài khoản: ${fromAccountNumber}`);
            return false; // Không tìm thấy tài khoản gửi
        }

        let toAccount = findAccountByNumber(this._customers, toAccountNumber);
        if (!toAccount) {
            console.log(`Không tìm thấy tài khoản nhận tiền với số tài khoản: ${toAccountNumber}`);
            return false; // Không tìm thấy tài khoản nhận
        }

        // Kiểm tra số dư tài khoản gửi
        if (fromAccount.getBalance() < amount) {
            console.log(`Tài khoản ${fromAccountNumber} không đủ số dư để thực hiện giao dịch.`);
            return false; // Nếu tài khoản gửi không đủ số dư
        }

        // Thực hiện rút tiền từ tài khoản gửi
        fromAccount.withdraw(amount, this._transactions, true); // Thêm đối số isTransfer để tránh ghi giao dịch Withdraw

        // Chuyển tiền vào tài khoản nhận
        toAccount.deposit(amount, this._transactions, true); // Chỉ gọi deposit 1 lần

        // Tạo và lưu giao dịch chuyển tiền
        createAndSaveTransaction(this._transactions, TypeTransaction.TRANSFER, amount, fromAccount, toAccount,"T");

        console.log(`Chuyển tiền thành công từ tài khoản ${fromAccountNumber} đến tài khoản ${toAccountNumber}. Số tiền: ${amount}`);
        console.log(`Số dư tài khoản gửi ${fromAccountNumber}: ${fromAccount.getBalance()} VND`);
        console.log(`Số dư tài khoản nhận ${toAccountNumber}: ${toAccount.getBalance()} VND`);

        return true; // Giao dịch thành công
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