// Khởi tạo dữ liệu mẫu
const bank = new Bank();
let cus1 = new Customer("1","MCK");
let cus2 = new Customer("2","Son Tung MTP");
let cus3 = new Customer("3","LowG");
bank.addCustomer(cus1);
bank.addCustomer(cus2);
bank.addCustomer(cus3);

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
    }
}

// Thêm tài khoản cho khách hàng
function addAccount() {
    const customerId = document.getElementById("account-customer").value;
    const accountType = document.getElementById("account-type").value.toUpperCase(); // Kiểm tra loại tài khoản
    const customer = bank.findCustomer(customerId);
    if (customer) {
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


