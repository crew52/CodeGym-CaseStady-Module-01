// Tìm tài khoản theo số tài khoản
function findAccountByNumber(customers, accountNumber) {
    for (let customer of customers) {
        let accounts = customer.getAccounts();
        for (let account of accounts) {
            if (account._accountNumber === accountNumber) {
                return account;
            }
        }
    }
    return null;
}

// Tạo và lưu giao dịch
function createAndSaveTransaction(transactions, type, amount) {
    const transactionId = `T${Date.now()}`;
    const transaction = new Transaction(transactionId, type, amount);
    transactions.push(transaction);
    transaction.record(); // Ghi log hoặc lưu giao dịch nếu cần
    return transaction;
}

