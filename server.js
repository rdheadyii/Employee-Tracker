// import needed variables
const inquirer = require('inquirer');
const db = require('./assets/helpers/connection.js');
const mysql = require('mysql2');

function searchDB() {
    inquirer.prompt({
        name: 'select',
        type: 'rawlist',
        message: "Please choose a selection.",
        choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Quit'
        ]
    })
    .then(function (select) {
        switch(select) {
            case 'View All Departments':
            deptTable();
            break;

            case 'View All Roles':
            roleTable();
            break;

            case 'View All Employees':
            employeeTable();
            break;

            case 'Add a Department':
            addDept();
            break;

            case 'Add a Role':
            addRole();
            break;

            case 'Add an Employee':
            addEmployee();
            break;

            case 'Update an Employee Role':
            updateER();
            break;

            case 'Quit':
            quit();
            break;
        }
    });
}

function deptTable() {
    let sql = 'SELECT name, id FROM employees.department ORDER BY id asc';

    db.query(sql, function (err, res) {
        console.log(res);
        searchDB();
    });
}

function roleTable() {
    let sql = 'SELECT role.title, role.salary, department.name FROM role, department WHERE department.id = role.department_id;';

    db.query(sql, function (err, res) {
        console.log(res);
        searchDB();
    });
}

function employeeTable() {
    let sql = 'SELECT employee.first_name, employee.last_name, role.title FROM employee, role WHERE employee.id = role.id;';

    db.query(sql, function (err, res) {
        console.log(res);
        searchDB();
    });
}

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
            console.log(res);
            searchDB();
        });
    });
}

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
}

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
}

searchDB();