// import needed variables
const inquirer = require('inquirer');
const {deptTable, roleTable, employeeTable, addDept, addRole, addEmployee, updateER, quit} = require('./assets/helpers/helper.js');
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
    .then(function (answer) {
        switch(answer.select) {
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

searchDB();