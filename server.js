//import and require mysql2;
const mysql2= require('mysql2');
const inquirer= require('inquirer');
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
      addRole(answer.title, answer.salary, answer.department_id)
  });
}

function updatingEmployeeRolePrompt(){
  inquirer
  .prompt([
    {
      type: "list",
      message: "Which employee's role do you want to update?",
      choices: ['Raja Farrell', 'Roger Evens', 'Oakly Jones'],
      name: "employee_name",
    },
    {
      type: "list",
      message: "Which role do you want to assign the selected employee?",
      choices: ['Finance Helper','Sales Associate', 'Teller'],
      name: "role_name"
    },
  ])
  .then((answer) => {
      console.log("Prompt: " + answer.employee_name + " " + answer.role_name)
      updateEmployeeRole(answer.employee_name, answer.role_name)
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
        updatingEmployeeRolePrompt();
        
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
  sql= `INSERT INTO department(name) VALUES('${name}')`;
    db.execute(sql, function (err, results) {
      if(err){
        console.log("Error message: " + err)
      }       
      console.table(results);
    return getPrompt();
  });
}
//add role function
function addRole(title, salary, department_id){
  sql= `INSERT INTO role(title, salary, department_id) VALUES('${title}', '${salary}', '${department_id}')`;
    db.execute(sql, function (err, results) {
      if(err){
        console.log("Error message: " + err)
      }       
      console.table(results);
    return getPrompt();
  });
}

function viewAllEmployees(){
     const sql = "SELECT * from employee";    
    //const sql = "SELECT first_name FROM employee UNION title FROM role UNION name FROM department UNION salary FROM role UNION manager_id FROM employee";
    db.execute(sql, function (err, results) {
      if(err){
        console.log("Error message: " + err)
      }       
      console.table(results);
    return getPrompt();
  });
}

function addNewEmployee(first_name, last_name){
  sql= `INSERT INTO employee (first_name, last_name, manager_id) VALUES('${first_name}' , '${last_name}', '5')`;
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
//name, role
function updateEmployeeRole(employee_name, role_title){
  let name = employee_name.split(" ");
  let first = name[0];
  let last = name[1]

  var sql = `UPDATE employee JOIN role SET role.title = '${role_title}' WHERE employee.first_name = '${first}' AND employee.last_name = '${last}' AND role.id = employee.role_id LIMIT 1;`;
  db.execute(sql, function (err, results) {
    if(err){
      console.log("Error message: " + err)
    }  
    
    console.table(results);
    return getPrompt();
  })
}
