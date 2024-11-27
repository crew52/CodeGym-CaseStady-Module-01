class Customer {
    _customerId;
    _customerName;
    _accounts;

    constructor(customerId, customerName) {
        this._customerId = customerId;
        this._customerName = customerName;
        this._accounts = [];
    }

    getCustomerId() {
        return this._customerId;
    }

    setCustomerId(value) {
        this._customerId = value;
    }

    getCustomerName() {
        return this._customerName;
    }

    setCustomerName(value) {
        this._customerName = value;
    }

    getAccounts() {
        return this._accounts;
    }

    setAccounts(value) {
        this._accounts = value;
    }

    addAccount(account){
        if(this._accounts.length < 2){
            this._accounts.push(account);
            console.log(`Ban da mo thanh cong! tai khoan ${account._accountType} voi so tai khoan la ${account._accountNumber}`);
        }
        else {
            console.log(`Khach Hang ${this._customerName} khong the mo them tai khoan.`)
        }
    }

    // Hiển thị thông tin khách hàng
    displayInfo() {
        console.log(`Customer ID: ${this._customerId}`);
        console.log(`Name: ${this._customerName}`);
        console.log("Accounts:");
        this._accounts.forEach((account, index) => {
            console.log(`${index + 1}. Account Number: ${account._accountNumber}, Balance: ${account._balance}, Type: ${account._accountType}`);
        });
    }
}