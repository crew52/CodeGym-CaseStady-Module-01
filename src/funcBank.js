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
