// Khởi tạo dữ liệu mẫu
const bank = new Bank();
let cus1 = new Customer(1,"MCK");
let cus2 = new Customer(2,"Son Tung MTP");
let cus3 = new Customer(3,"LowG");
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
        // listItem.onclick = () => showAccounts(customer.customerId);
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
}