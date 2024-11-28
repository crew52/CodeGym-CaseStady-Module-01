class Transaction {
    _transactionId;
    _type;
    _amount;
    _timestamp;
    _fromAccount;
    _toAccount;

    constructor(transactionId, typeTransaction, amount, fromAccount, toAccount) {
        this._transactionId = transactionId;
        this._type = typeTransaction;
        this._amount = amount;
        this._timestamp = new Date().toLocaleString();
        this._fromAccount = fromAccount;
        this._toAccount = toAccount;
    }

    getTransactionId() {
        return this._transactionId;
    }

    setTransactionId(value) {
        this._transactionId = value;
    }

    getType() {
        return this._type;
    }

    setType(value) {
        this._type = value;
    }

    getAmount() {
        return this._amount;
    }

    setAmount(value) {
        this._amount = value;
    }

    getTimestamp() {
        return this._timestamp;
    }

    setTimestamp(value) {
        this._timestamp = value;
    }


    getFromAccount() {
        return this._fromAccount;
    }

    setFromAccount(value) {
        this._fromAccount = value;
    }

    getToAccount() {
        return this._toAccount;
    }

    setToAccount(value) {
        this._toAccount = value;
    }

    record(){
        console.log(`Transaction Recorded: 
            ID: ${this._transactionId}, 
            Type: ${this._type}, 
            fromAccount: ${this._fromAccount},
            Amount: ${this._amount}, 
            toAccount: ${this._toAccount},
            Timestamp: ${this._timestamp}`);

    }

    display() {
        // Kiểm tra nếu fromAccount và toAccount là đối tượng
        // const fromAccount = (this._fromAccount && this._fromAccount.accountNumber) ? this._fromAccount.accountNumber : this._fromAccount;
        // const toAccount = (this._toAccount && this._toAccount.accountNumber) ? this._toAccount.accountNumber : this._toAccount;

        return {
            transactionId: this._transactionId,
            type: this._type,
            amount: this._amount,
            timestamp: this._timestamp,
            fromAccount: fromAccount,
            toAccount: toAccount,
        };
    }
}