// import needed variables
const inquirer = require('inquirer');
const db = require('./assets/helpers/connection.js');
const cTable = require("console.table");
const mysql = require('mysql2');

db.connect((error) => {
    if(error) throw error;
    searchDB();
});

function searchDB() {
    inquirer.prompt({
        name: 'select',
        type: 'rawlist',
        message: "Please choose a selection.",
        choices: [
            "View All Employees",
            "View All Employees by Department",
            "View All Employees by Manager",
            "View By Roles",
            "View Department Budget",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Employee Role",
            "Update Employee Manager",
            "Remove Employee",
            "Remove Department",
            "Remove Role",
            'Quit'
        ]
    })
    .then(function (answer) {
        switch(answer.select) {
            case 'View All Employees':
            employeeTable();
            break;

            case 'View All Employees by Department':
            deptTable();
            break;

            case 'View All Employees by Manager':
            empManagerTable();
            break;

            case 'View By Roles':
            roleTable();
            break;

            case 'View Department Budget':
            deptBudget();
            break;

            case 'Add Employee':
            addEmployee();
            break;

            case 'Add Department':
            addDept();
            break;

            case 'Add Role':
            addRole();
            break;

            case 'Update Employee Role':
            updateEmpRole();
            break;

            case 'Update Employee Manager':
            updateEmpManager();
            break;

            case 'Remove Employee':
            removeEmp();
            break;

            case 'Remove Department':
            removeDept();
            break;

            case 'Remove Role':
            removeRole();
            break;

            case 'Quit':
            quit();
            break;
        }
    });
};

function employeeTable() {
    let sql = 'SELECT employee.id, employee.first_name, employee.last_name, role.title ';

    db.query(sql, function (err, res) {
        console.table(res)
        searchDB();
    });
};

function deptTable() {
    let sql = 'SELECT name, id FROM employees.department ORDER BY id asc';

    db.query(sql, function (err, res) {
        console.table(res);
        searchDB();
    });
};

function empManagerTable() {
    let sql = 'SELECT employee.first_name, employee.last_name, role.title FROM employee, role WHERE employee.id = role.id;';

    db.query(sql, function (err, res) {
        console.table(res)
        searchDB();
    });
};

function roleTable() {
    let sql = 'SELECT role.title, role.salary, department.name FROM role, department WHERE department.id = role.department_id;';

    db.query(sql, function (err, res) {
        console.table(res);
        searchDB();
    });
};

function deptBudget() {
    let sql = 'SELECT employee.first_name, employee.last_name, role.title FROM employee, role WHERE employee.id = role.id;';

    db.query(sql, function (err, res) {
        console.table(res)
        searchDB();
    });
};

function addEmployee() {
    inquirer.prompt([
        {
        name: 'firstName',
        type: 'input',
        message: 'Employee first name.'
        },
        {
        name: 'lastName',
        type: 'input',
        message: 'Employee last name.'
        },
        {
        name: 'roleID',
        type: 'rawlist',
        message: 'Select employee role.',
        choices: [
            'SR Software Engineer',
            'JR Software Engineer',
            'Director of HR',
            'HR Administrator',
            'Director of Sales',
            'Sales Associate',
            'Research Lead',
            'Researcher',
            'Lawyer',
            'Paralegal',
            'Lead Vocals',
            'Drummer'
        ]
        },
    ])
    .then(function (answer) {
        let sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?, ?, ?, ?)';

        db.query(sql, [answer.firstName, answer.lastName, answer.roleID], function (err, res) {
            if (err) throw err;
            console.log('Added New Employee');
            searchDB();
        });
    });
};

function addDept() {
    inquirer.prompt({
        name: 'deptName',
        type: 'input',
        message: 'What is the name of the new department?'
    })
    .then(function (answer) {
        let sql = 'INSERT INTO department (name) VALUE (?)';

        db.query(sql, answer.deptName, function (err, res) {
            if (err) throw err;
            console.log('New Department Added');
            searchDB();
        });
    });
};

function addRole() {
    inquirer.prompt([
        {
        name: 'title',
        type: 'input',
        message: 'Type in title of new role.'
        },
        {
        name: 'salary',
        type: 'input',
        message: 'Type in salary of new role.'
        },
        {
        name: 'departmentID',
        type: 'rawlist',
        message: 'Please select department.',
        choices: [
            'Software Engineer',
            'Human Resources',
            'Sales',
            'Research and Development',
            'Legal',
            'Rockstar'
        ]
        },
    ])
    .then(function (answer) {
        let sql = 'INSERT INTO role (title, salary, department_id) VALUE (?, ?, ?)';

        db.query(sql, [answer.title, answer.salary, answer.departmentID], function (err, res) {
            if (err) throw err;
            console.log(`Added Role: ${answer.title}`);
            searchDB();
        });
    });
};

function updateEmpRole() {
    let sql = 'SELECT employee.first_name, employee.last_name, role.title FROM employee, role WHERE employee.id = role.id;';

    db.query(sql, function (err, res) {
        console.table(res)
        searchDB();
    });
};

function updateEmpManager() {
    let sql = 'SELECT employee.first_name, employee.last_name, role.title FROM employee, role WHERE employee.id = role.id;';

    db.query(sql, function (err, res) {
        console.table(res)
        searchDB();
    });
};

function removeEmp() {
    let sql = 'SELECT employee.first_name, employee.last_name, role.title FROM employee, role WHERE employee.id = role.id;';

    db.query(sql, function (err, res) {
        console.table(res)
        searchDB();
    });
};

function removeDept() {
    let sql = 'SELECT employee.first_name, employee.last_name, role.title FROM employee, role WHERE employee.id = role.id;';

    db.query(sql, function (err, res) {
        console.table(res)
        searchDB();
    });
};

function removeRole() {
    let sql = 'SELECT employee.first_name, employee.last_name, role.title FROM employee, role WHERE employee.id = role.id;';

    db.query(sql, function (err, res) {
        console.table(res)
        searchDB();
    });
};

function quit() {
    process.exit(); 
};