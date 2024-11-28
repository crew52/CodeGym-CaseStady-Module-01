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
function createAndSaveTransaction(transactions, type, amount, prefix) {
    if (!transactions) {
        transactions = []; // Khởi tạo nếu chưa tồn tại
    }
    const transactionId = `${prefix}${Date.now()}`; // Tạo mã giao dịch động dựa trên prefix
    const transaction = new Transaction(transactionId, type, amount);
    transactions.push(transaction);
    transaction.record(); // Ghi log hoặc lưu giao dịch nếu cần
    return transaction;
}

//
function createInterestTransaction(account, interest, transactions) {
    createAndSaveTransaction(transactions, TypeTransaction.INTEREST, interest, "I");
    console.log(`Lãi suất ${interest} được ghi nhận vào tài khoản ${account._accountNumber}.`);
}

