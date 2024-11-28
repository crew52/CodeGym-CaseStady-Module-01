function findAccountByNumber(customersOrCustomer, accountNumber) {
    let accounts = [];
    // Nếu đầu vào là một mảng khách hàng
    if (Array.isArray(customersOrCustomer)) {
        for (let customer of customersOrCustomer) {
            accounts = accounts.concat(customer.getAccounts());
        }
    }
    // Nếu đầu vào là một khách hàng đơn lẻ
    else if (customersOrCustomer instanceof Customer) {
        accounts = customersOrCustomer.getAccounts();
    }

    // Tìm tài khoản theo số tài khoản
    for (let account of accounts) {
        if (account._accountNumber === accountNumber) {
            return account;
        }
    }

    return null;
}


// Tạo và lưu giao dịch
function createAndSaveTransaction(transactions, type, amount, fromAccount, toAccount, prefix) {
    if (!transactions) {
        transactions = []; // Khởi tạo nếu chưa tồn tại
    }

    // Tạo mã giao dịch động dựa trên prefix
    const transactionId = `${prefix}${Date.now()}`;

    // Tạo đối tượng giao dịch mới với các thông tin đầy đủ
    const transaction = new Transaction(transactionId, type, amount, fromAccount, toAccount);

    // Lưu giao dịch vào danh sách
    transactions.push(transaction);

    // Ghi log hoặc lưu giao dịch nếu cần
    transaction.record();

    // Trả về đối tượng giao dịch đã được lưu
    return transaction;
}


//
function createInterestTransaction(account, interest, transactions) {
    createAndSaveTransaction(transactions, TypeTransaction.INTEREST, interest, "I");
    console.log(`Lãi suất ${interest} được ghi nhận vào tài khoản ${account._accountNumber}.`);
}

