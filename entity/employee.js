class Employee {
    _employeeId;
    _employeeName;
    _role;

    constructor(employeeId, employeeName, role) {
        this._employeeId = employeeId;
        this._employeeName = employeeName;
        this._role = role;
    }

    getEmployeeId() {
        return this._employeeId;
    }

    setEmployeeId(value) {
        this._employeeId = value;
    }

    getEmployeeName() {
        return this._employeeName;
    }

    setEmployeeName(value) {
        this._employeeName = value;
    }

    getRole() {
        return this._role;
    }

    setRole(value) {
        this._role = value;
    }

    accessCustomerData(customerId){}
    processTransaction(transaction){}
}