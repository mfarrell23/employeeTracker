//import and require mysql2;
const mysql2= require('mysql2');
var express = require('express'); // Get the module
var app = express(); // Create express by calling the prototype in var express
const inquirer= require('inquirer');

const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const employee_db = 'employee_db'
//Connect to database
const db = mysql2.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    database: employee_db
  },
  console.log(`Connected to the employee_db database.`)
);
// begin of calling program
getPrompt();
// end of program

function addRolePrompt(){
  inquirer
  .prompt([
    {
      type: "input",
      message: "What is your title?",
      name: "title",
    },
    {
      type: "list",
      message: "What is your salary",
      choices: ["5000","5500","6000"],
      name: "salary"
    },
    {
      type: "list",
      message: "What is your department_id",
      choices: ["1","2","3"],
      name: "department_id",
    },
  ])
  .then((answer) => {
      addRole(answer.title, answer.salary, answer.departrment_id)
  });
}

function updatingEmployeePromt(){
  inquirer
  .prompt([
    {
      type: "input",
      message: "What is your new role?",
      name: "newRole",
    },
    {
      type: "list",
      message: "Are you a manager?",
      choices: ['yes','no'],
      name: "manager_id"
    },
  ])
  .then((answer) => {
      updatingEmployeePromt(answer.newRole, answer.manager_id)
  });
}

function addEmployeePrompt(){
  inquirer
  .prompt([
    {
      type: "input",
      message: "What is your first name?",
      name: "first_name",
    },
    {
      type: "input",
      message: "What is your last name?",
      name: "last_name",
    },
  ])
  .then((answer) => {
      addNewEmployee(answer.first_name, answer.last_name)
  });
}

function addDepartmentPrompt(){
  inquirer
  .prompt([
    {
      type: "input",
      message: "What is the department your adding?",
      name: "department",
    },
  ])
  .then((answer) => {
      addDepartment(answer.department);
  });
}
function getPrompt(){
inquirer
.prompt([
    { type:'list',
    message: "What would you like to do?",
    name: 'sqlOptions',
    choices: [
        'View All Employees',
        'Add New Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'Add Department',
        'Quit'
    ]}
]).then(({sqlOptions}) => {
      if(sqlOptions==="View All Employees"){
         //sql function for get all employees
         console.log('View All Employees');
         viewAllEmployees();
      }
      if(sqlOptions==="Add New Employee"){
        //sql function for adding employees
        console.log('Add New Employee');
        addEmployeePrompt() //addNewEmployee() function is inside this function
      }
      else if(sqlOptions==="Update Employee Role"){
        //sql function for updating employee role
        console.log('Updating Employee Role');
        updatingEmployeePromt();
        
      }
      else if(sqlOptions==="View All Departments"){
        //sql function for adding departments
        console.log('View All Departments');
        viewAllDepartments();
        
      }
      else if(sqlOptions==="Add Department"){
        //sql function for adding departments
        console.log('Add Department');
        addDepartmentPrompt();
        
      }
      else if(sqlOptions==="View All Roles"){
        //sql function for adding roles
        console.log('View All Roles')
        viewAllRoles();
      }
      else if(sqlOptions==="Add Role"){
        //sql function for adding roles
        console.log('Add Role');
        addRolePrompt();
      }
      else{
        return endPrompt()
      }
})}

function endPrompt(){
   console.log("You have quit the program. Good bye.");
}

//view all departments function
function viewAllDepartments(){
    db.execute('SELECT * FROM department;', function (err, results) {
      if(err){
        console.log("Error message: " + err)
      }  
      
      console.table(results);
      return getPrompt();
  }
)}
//add department function
function addDepartment(name){
  sql= `INSERT INTO department(name) VALUES(${name})`;
    db.execute(sql, function (err, results) {
      if(err){
        console.log("Error message: " + err)
      }       
      console.table(results);
    return getPrompt();
  });
}
//add role function
function addRole(){
  sql= `INSERT INTO role VALUES(title,salary,department)`;
    db.execute(sql, function (err, results) {
      if(err){
        console.log("Error message: " + err)
      }       
      console.table(results);
    return getPrompt();
  });
}

function viewAllEmployees(){
    const sql = "SELECT employee.first_name, employee.last_name, role.title, department.name, role.salary, employee.manager_id FROM employee JOIN role ON employee.role_id = role.id JOIN department ON department.id = role.id";    
    db.execute(sql, function (err, results) {
      if(err){
        console.log("Error message: " + err)
      }       
      console.table(results);
    return getPrompt();
  });
}

function addNewEmployee(first_name, last_name){
  sql= `INSERT INTO employee (first_name, last_name, manager_id) VALUES('${first_name}' , '${last_name}', NULL)`;
  db.execute(sql, function (err, results) { 
    if(err){
      console.log("Error message: " + err)
    }       
    console.table(results);
  return getPrompt();
  });
}

function viewAllRoles(){
  db.execute('SELECT role.id, role.title, department.name, role.salary FROM role JOIN department ON role.department_id = department.id', function (err, results) {
    if(err){
      console.log("Error message: " + err)
    }  
    
    console.table(results);
    return getPrompt();
  })
}
  // app.listen(PORT, () => {
  //   console.log(`Server running on port ${PORT}`);
  // });