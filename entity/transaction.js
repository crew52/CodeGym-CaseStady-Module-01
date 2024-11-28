class Transaction {
    _transactionId;
    _type;
    _amount;
    _timestamp;

    constructor(transactionId, typeTransaction, amount) {
        this._transactionId = transactionId;
        this._type = typeTransaction;
        this._amount = amount;
        this._timestamp = new Date().toLocaleString();
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
            Amount: ${this._amount}, 
            Timestamp: ${this._timestamp}`);

    }

    display() {
        return {
            transactionId: this._transactionId,
            type: this._type,
            amount: this._amount,
            timestamp: this._timestamp,
        };
    }
}