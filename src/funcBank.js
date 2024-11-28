// Khởi tạo dữ liệu mẫu
const bank = new Bank();
// Khởi tạo danh sách giao dịch
const transactions = [];

let cus1 = new Customer("1","MCK");
let cus2 = new Customer("2","Son Tung MTP");
bank.addCustomer(cus1);
bank.addCustomer(cus2);

// let rew1 = new Account("111111111", "rew1", AccountType.SAVINGS);
let rew2 = new Account("22", "rew2", AccountType.CHECKING);
//
// let son1 = new Account("333333333", "rew52", AccountType.SAVINGS);
let son2 = new Account("44", "son", AccountType.CHECKING);
//
// cus1.addAccount(rew1);
cus1.addAccount(rew2);
// cus2.addAccount(son1);
cus2.addAccount(son2);

rew2.deposit(100000, transactions);
son2.deposit(100000, transactions);

// Chuyển tiền giữa các tài khoản
// bank.transfer('222222222', '444444444', 50000);
// bank.transfer('44', '22', 10000);

// Hiển thị giao dịch
// bank.displayTransactions();

showCustomers();
// display danh sach customer
function  showCustomers() {
    const customerList = document.getElementById('customer-list');
    customerList.innerHTML = "";
    bank._customers.forEach(customer => {
        const listItem = document.createElement('li');
        listItem.textContent = `${customer._customerName} (ID: ${customer._customerId})`;
        listItem.onclick = () => showAccounts(customer._customerId);
        customerList.appendChild(listItem);
    })
}
// show customer form
function showCustomerForm() {
    const form = document.getElementById('customer-form');
    // Kiểm tra trạng thái hiển thị hiện tại của form
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block'; // Hiển thị form
    } else {
        form.style.display = 'none'; // Ẩn form
    }
}

// Thêm khách hàng mới
function addCustomer() {
    const customerName = document.getElementById("customer-name").value;
    const customerId = `C${Date.now()}`;
    const newCustomer = new Customer(customerId, customerName);
    bank.addCustomer(newCustomer);
    document.getElementById("customer-name").value = ""; // Xóa nội dung ô nhập
    showCustomers();
    updateCustomerDropdown();
}

// Hiển thị tài khoản của khách hàng
function showAccounts(customerId) {
    console.log("Customer ID clicked: ", customerId); // Debugging
    // Ẩn thông báo lỗi nếu có
    const messageDiv = document.getElementById("message");
    messageDiv.style.display = "none"; // Ẩn thông báo lỗi

    const customer = bank.findCustomer(customerId);
    if (customer) {
        const accountList = document.getElementById("account-list");
        accountList.innerHTML = ""; // Xóa danh sách cũ

        customer._accounts.forEach(account => {
            const listItem = document.createElement("li");
            listItem.textContent = `${account._accountType}: ${account._balance} VND`;
            accountList.appendChild(listItem);
        });

        document.getElementById("account-actions").style.display = "block";
        document.getElementById("account-customer").value = customerId;

        // Cập nhật dropdown loại tài khoản khi khách hàng thay đổi
        updateAccountDropdown(customer);
    }
}

// Thêm tài khoản cho khách hàng
function addAccount() {
    const customerId = document.getElementById("account-customer").value;
    const accountType = document.getElementById("account-type").value.toUpperCase(); // Kiểm tra loại tài khoản
    const customer = bank.findCustomer(customerId);
    if (customer) {
        if (customer._accounts.length >= 2) {
            showErrorMessage(`Khách hàng ${customer._customerName} không thể mở thêm tài khoản. Tối đa là 2 tài khoản.`);
            return;
        }
        const accountNumber = `A${Date.now()}`;
        const newAccount = new Account(accountNumber, customerId, accountType);
        customer.addAccount(newAccount); // Thêm tài khoản mới vào khách hàng
        document.getElementById("account-type").value = ""; // Xóa nội dung ô nhập
        showAccounts(customerId); // Hiển thị lại danh sách tài khoản của khách hàng
    } else {
        console.error("Customer not found");
    }
}

// Cập nhật danh sách khách hàng vào dropdown
function updateCustomerDropdown() {
    const customerDropdown = document.getElementById('account-customer');
    customerDropdown.innerHTML = ""; // Xóa danh sách cũ

    bank._customers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer._customerId;
        option.textContent = `${customer._customerName} (ID: ${customer._customerId})`;
        customerDropdown.appendChild(option);
    });

    // Thêm sự kiện onchange vào dropdown khách hàng
    customerDropdown.onchange = function() {
        const selectedCustomerId = customerDropdown.value;
        showAccounts(selectedCustomerId); // Cập nhật thông tin tài khoản khi chọn khách hàng khác
    };
}

function showAccountForm() {
    const form = document.getElementById('account-form');
    // Kiểm tra trạng thái hiển thị hiện tại của form
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block'; // Hiển thị form
    } else {
        form.style.display = 'none'; // Ẩn form
    }
}

function showErrorMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.style.display = "block"; // Hiển thị thông báo lỗi
}

// Cập nhật dropdown loại tài khoản cho khách hàng
function updateAccountDropdown(customer) {
    const accountDropdown = document.getElementById('account-type');
    const accountTypes = ['CHECKING', 'SAVINGS']; // Danh sách các loại tài khoản

    accountTypes.forEach(type => {
        const option = document.querySelector(`option[value="${type}"]`);

        // Nếu khách hàng đã có tài khoản của loại này thì disable option đó
        if (customer._accounts.some(account => account._accountType === type)) {
            if (option) {
                option.disabled = true; // Disable loại tài khoản đã có
            }
        } else {
            if (option) {
                option.disabled = false; // Bỏ disable loại tài khoản chưa có
            }
        }
    });
}

// Chuyển tiền giữa hai tài khoản
function transferMoney() {
    const fromAccount = document.getElementById("from-account").value;
    const toAccount = document.getElementById("to-account").value;
    const amount = parseFloat(document.getElementById("transaction-amount").value);
    const messageElement = document.getElementById("transaction-message"); // Get message element

    // Check if input values are valid
    if (fromAccount && toAccount && amount > 0) {
        // Call the transfer method and get the result
        const transferSuccess = bank.transfer(fromAccount, toAccount, amount);

        // If transfer was successful
        if (transferSuccess) {
            messageElement.textContent = `Chuyển tiền thành công từ tài khoản ${fromAccount} đến tài khoản ${toAccount}. Số tiền: ${amount} VND.`;
            messageElement.style.color = "green"; // Green for success message
            showTransactions();  // Display the transactions
        } else {
            // If transfer failed (e.g., insufficient funds or other errors)
            messageElement.textContent = "Giao dịch không thành công. Vui lòng kiểm tra lại thông tin!";
            messageElement.style.color = "red"; // Red for error message
        }
    } else {
        // If required input is missing
        messageElement.textContent = "Vui lòng nhập đầy đủ thông tin hợp lệ!";
        messageElement.style.color = "red"; // Red for error message
    }

}

// Hiển thị lịch sử giao dịch
function showTransactions() {
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = ""; // Xóa danh sách cũ
    bank._transactions.forEach(transaction => {
        const listItem = document.createElement("li");
        listItem.textContent = `${transaction.type}: ${transaction.amount} VND (${transaction.timestamp})`;
        transactionList.appendChild(listItem);
    });
}
