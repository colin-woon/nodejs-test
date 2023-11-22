const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
};


const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

const createNewEmployee = (req, res) => {
    const newEmployee = {
        //employees? - checks if this property is null/undefined
        //.length at the start checks for existing length
        //.length - 1 is to get the array index
        //else, new employee is considered the 1st employee with id number 1
        "id": data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    }

    if (!newEmployee.firstname || !newEmployee.lastname) {
        return res.status(400).json({ 'message': 'First and last names are missinggg' })
    }

    //--Sets the entire data again, by putting in the old data first with the spread operator and appending the newEmployee details
    data.setEmployees([...data.employees, newEmployee]);
    res.status(201).json(data.employees);
}

const updateEmployee = (req, res) => {
    //--employee checking for matching ID, then assigns it
    const theEmployee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!theEmployee) {
        return res.status(404).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    if (req.body.firstname) theEmployee.firstname = req.body.firstname;
    if (req.body.lastname) theEmployee.lastname = req.body.lastname;
    //--filters out theEmployee, leaving only the remaining employees' details
    const employeeDetailsArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const updatedEmployeeDetailsArray = [...employeeDetailsArray, theEmployee];
    //--If 1, arrangement should be [b, a]
    //--If -1, arrangement should be [a, b]
    //--If 0, arrangement should be [a, b] (original, same order)
    data.setEmployees(updatedEmployeeDetailsArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees);
}

const deleteEmployee = (req, res) => {
    const theEmployee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!theEmployee) {
        return res.status(404).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    //--filters out theEmployee, leaving only the remaining employees' details
    const employeeDetailsArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...employeeDetailsArray]);
    res.json(data.employees);
}

const getEmployee = (req, res) => {
    const theEmployee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (!theEmployee) {
        return res.status(404).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    res.json(theEmployee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}