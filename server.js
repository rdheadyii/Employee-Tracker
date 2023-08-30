// import needed variables
const inquirer = require('inquirer');
const db = require('./assets/helpers/connection.js');
const cTable = require("console.table");
const mysql = require('mysql2');

// make connection to database
db.connect((err) => {
    if(err) throw err;
    searchDB();
});

// function for initial prompts will run other functions using switch depending on which answer selected
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

// function for all employees gives (id, first name, last name, title, department, salary, manager)
function employeeTable() {
    let sql = `SELECT e.id , e.first_name, e.last_name, r.title,  d.name as department, r.salary, CONCAT(m.first_name,' ',m.last_name) AS manager FROM employee e 
    LEFT JOIN role r ON e.role_id = r.id
    LEFT JOIN department d ON r.department_id = d.id 
    LEFT JOIN employee m ON m.id = e.manager_id`;

    db.query(sql, function (err, res) {
        if(err) throw err;
        console.table(res)
        searchDB();
    });
};

// function for employees by department gives (department, title, id, first name, last name)
function deptTable() {
    let sql = `SELECT d.name AS department, r.title, e.id, e.first_name, e.last_name FROM employee e
    LEFT JOIN role r ON (r.id = e.role_id)
    LEFT JOIN department d ON (d.id = r.department_id)
    ORDER BY d.name`;

    db.query(sql, function (err, res) {
        if(err) throw err;
        console.table(res);
        searchDB();
    });
};

// function for employees by manager gives (manager, department, id, first name, last name, title)
function empManagerTable() {
    let sql = `SELECT CONCAT(m.first_name, ' ', m.last_name) AS manager, d.name AS department, e.id, e.first_name, e.last_name, r.title FROM employee e
    LEFT JOIN employee m ON m.id = e.manager_id
    INNER JOIN role r ON (r.id = e.role_id && e.manager_id != 'NULL')
    INNER JOIN department d ON (d.id = r.department_id)
    ORDER BY manager`;

    db.query(sql, function (err, res) {
        if(err) throw err;
        console.table(res)
        searchDB();
    });
};

// function for all roles gives (role id, role, salary, department id, department)
function roleTable() {
    let sql = `SELECT r.id AS roleID, r.title AS Role, r.salary, r.department_id AS departmentID, d.name AS Department FROM employee e
    LEFT JOIN role r ON e.role_id = r.id
    LEFT JOIN department d ON r.department_id = d.id
    GROUP BY r.id, r.title`;

    db.query(sql, function (err, res) {
        if(err) throw err;
        console.table(res);
        searchDB();
    });
};

// function for the budget departments gives (is, department, budget)
function deptBudget() {
    let sql = `SELECT d.id, d.name AS Department, SUM(r.salary) AS Budget FROM employee e
    LEFT JOIN role r ON e.role_id = r.id
    LEFT JOIN department d ON r.department_id = d.id
    GROUP BY d.id, d.name`;

    db.query(sql, function (err, res) {
        if(err) throw err;
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
        let sql = '';

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
        let sql = '';

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
        let sql = '';

        db.query(sql, [answer.title, answer.salary, answer.departmentID], function (err, res) {
            if (err) throw err;
            console.log(`Added Role: ${answer.title}`);
            searchDB();
        });
    });
};

function updateEmpRole() {
    let sql = '';

    db.query(sql, function (err, res) {
        if(err) throw err;
        console.table(res)
        searchDB();
    });
};

function updateEmpManager() {
    let sql = '';

    db.query(sql, function (err, res) {
        if(err) throw err;
        console.table(res)
        searchDB();
    });
};

function removeEmp() {
    let sql = '';

    db.query(sql, function (err, res) {
        if(err) throw err;
        console.table(res)
        searchDB();
    });
};

function removeDept() {
    let sql = '';

    db.query(sql, function (err, res) {
        if(err) throw err;
        console.table(res)
        searchDB();
    });
};

function removeRole() {
    let sql = '';

    db.query(sql, function (err, res) {
        if(err) throw err;
        console.table(res)
        searchDB();
    });
};

function quit() {
    process.exit(); 
};