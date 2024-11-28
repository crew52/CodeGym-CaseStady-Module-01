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
            return false; // Return false if fromAccount is not found
        }

        let toAccount = findAccountByNumber(this._customers, toAccountNumber);
        if (!toAccount) {
            console.log(`Không tìm thấy tài khoản nhận tiền với số tài khoản: ${toAccountNumber}`);
            return false; // Return false if toAccount is not found
        }

        // Check if the sender account has sufficient balance
        if (fromAccount.getBalance() < amount) {
            console.log(`Tài khoản ${fromAccountNumber} không đủ số dư để thực hiện giao dịch.`);
            return false; // Return false if insufficient balance
        }

        // Perform the transfer
        fromAccount.withdraw(amount);
        toAccount.deposit(amount);

        // Create and save the transaction
        createAndSaveTransaction(this._transactions, TypeTransaction.TRANSFER, amount, "T");

        console.log(`Chuyển tiền thành công từ tài khoản ${fromAccountNumber} đến tài khoản ${toAccountNumber}. Số tiền: ${amount}`);
        console.log(`Số dư tài khoản gửi ${fromAccountNumber}: ${fromAccount.getBalance()} VND`);
        console.log(`Số dư tài khoản nhận ${toAccountNumber}: ${toAccount.getBalance()} VND`);
        return true; // Return true if the transfer was successful
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