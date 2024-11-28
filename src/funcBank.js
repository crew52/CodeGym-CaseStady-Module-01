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