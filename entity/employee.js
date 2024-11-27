class Employee {
    _employeeId;
    _employeeName;
    _role;

    constructor(employeeId, employeeName, role) {
        this._employeeId = employeeId;
        this._employeeName = employeeName;
        this._role = role;
    }

    getEmployeeId() {
        return this._employeeId;
    }

    setEmployeeId(value) {
        this._employeeId = value;
    }

    getEmployeeName() {
        return this._employeeName;
    }

    setEmployeeName(value) {
        this._employeeName = value;
    }

    getRole() {
        return this._role;
    }

    setRole(value) {
        this._role = value;
    }

    // Truy cập thông tin khách hàng dựa vào mã khách hàng
    accessCustomerData(customerId, bank) {
        const customer = bank.findCustomer(customerId); // Gọi phương thức tìm khách hàng từ lớp Bank
        if (customer) {
            console.log(`Thông tin khách hàng (ID: ${customerId}):`);
            console.log(`Tên: ${customer.name}`);
            console.log(`Tài khoản:`);
            customer.getAccounts().forEach(account => {
                console.log(`- Số tài khoản: ${account.accountNumber}, Loại: ${account.accountType}, Số dư: ${account.balance}`);
            });
        } else {
            console.log(`Không tìm thấy khách hàng với ID: ${customerId}`);
        }
    }

    // Xử lý giao dịch
    processTransaction(transaction, bank) {
        if (!transaction || !bank) {
            console.log("Dữ liệu giao dịch hoặc ngân hàng không hợp lệ.");
            return;
        }

        const { transactionId, type, amount, fromAccountNumber, toAccountNumber } = transaction;

        console.log(`Nhân viên ${this._employeeName} đang xử lý giao dịch: ${transactionId}`);

        switch (type) {
            case TypeTransaction.DEPOSIT:
                const depositAccount = findAccountByNumber(fromAccountNumber);
                if (depositAccount) {
                    depositAccount.deposit(amount);
                    createAndSaveTransaction(bank._transactions, TypeTransaction.DEPOSIT, amount, "D");
                    console.log("Gửi tiền thành công.");
                } else {
                    console.log("Tài khoản không tồn tại.");
                }
                break;

            case TypeTransaction.WITHDRAW:
                const withdrawAccount = findAccountByNumber(fromAccountNumber);
                if (withdrawAccount) {
                    withdrawAccount.withdraw(amount);
                    createAndSaveTransaction(bank._transactions, TypeTransaction.WITHDRAW, amount, "W");
                    console.log("Rút tiền thành công.");
                } else {
                    console.log("Tài khoản không tồn tại.");
                }
                break;

            case TypeTransaction.TRANSFER:
                bank.transfer(fromAccountNumber, toAccountNumber, amount, "T");
                break;

            default:
                console.log("Loại giao dịch không hợp lệ.");
        }
    }
}