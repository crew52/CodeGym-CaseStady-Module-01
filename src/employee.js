let rew1 = new Account("111111111", "rew1", AccountType.SAVINGS);
let rew2 = new Account("222222222", "rew2", AccountType.CHECKING);

let son1 = new Account("333333333", "rew52", AccountType.SAVINGS);
let son2 = new Account("444444444", "son", AccountType.CHECKING);

let cus1 = new Customer(1,"Nguyen Cong Dung");
cus1.addAccount(rew1);
cus1.addAccount(rew2);

let cus2 = new Customer(2,"Nguyen Cong Son");
cus2.addAccount(son1);
cus2.addAccount(son2);

let bank = new Bank();
bank.addCustomer(cus1);
bank.addCustomer(cus2);

// Nạp tiền vào tài khoản
rew1.deposit(50000, bank._transactions);
// Hàm xử lý truy cập thông tin khách hàng
function accessCustomer() {
    const customerId = parseInt(document.getElementById("customer-id").value); // Lấy ID khách hàng từ input
    const customerInfoElement = document.getElementById("customer-info"); // Vùng hiển thị kết quả

    if (isNaN(customerId)) {
        customerInfoElement.innerHTML = `<p style="color: red;">Vui lòng nhập ID khách hàng hợp lệ!</p>`;
        return;
    }

    // Gọi phương thức accessCustomerData
    const customer = bank.findCustomer(customerId);
    if (customer) {
        let customerInfo = `<h3>Thông tin khách hàng (ID: ${customerId})</h3>`;
        customerInfo += `<p><strong>Tên:</strong> ${customer._customerName}</p>`;
        customerInfo += `<p><strong>Tài khoản:</strong></p>`;
        customer.getAccounts().forEach(account => {
            customerInfo += `
                <ul>
                    <li><strong>Số tài khoản:</strong> ${account._accountNumber}</li>
                    <li><strong>Loại:</strong> ${account._accountType}</li>
                    <li><strong>Số dư:</strong> ${account._balance} VND</li>
                </ul>
            `;
        });

        customerInfoElement.innerHTML = customerInfo;
    } else {
        customerInfoElement.innerHTML = `<p style="color: red;">Không tìm thấy khách hàng với ID: ${customerId}</p>`;
    }
}