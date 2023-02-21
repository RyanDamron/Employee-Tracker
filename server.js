const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'asdf',
    database: 'business_db'
  },
  console.log(`Connected to the business_db database.`)
);

const startQuestion = [
  {
      type: 'list',
      message: "What would you like to do?",
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee'],
      name: 'init'
  }
]
const deptQuestions = [
  {
    type: 'input',
    message: "What is the name of the department?",
    name: 'deptName'
  }
]
const roleQuestions = [
  {
    type: 'input',
    message: "What is the name of the role?",
    name: 'roleName'
  },
  {
    type: 'input',
    message: "What is the salary for the role?",
    name: 'roleSalary'
  },
  {
    type: 'list',
    message: "In which department is the role??",
    choices: ['Sales', 'Engineering', 'Finance', 'Legal'],
    name: 'roleDept'
  },
]
const empQuestions = [
  {
    type: 'input',
    message: "What is the employee's first name?",
    name: 'firstName'
  },
  {
    type: 'input',
    message: "What is the employee's last name?",
    name: 'lastName'
  },
  {
    type: 'list',
    message: "What is the employee's role?",
    choices: ['Sales Manager', 'Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead', 'Lawyer'],
    name: 'empRole'
  },
  {
    type: 'list',
    message: "Who is the employee's manager?",
    choices: ['John Doe', 'Ashley Rodriguez', 'Kunal Singh', 'Sarah Lourd'],
    name: 'mgrName'
  },
]


function initQuestion() {
  inquirer.prompt(startQuestion)
    .then((data) => {
      console.log(data);
      if (data.init=== "View all departments") {
        viewDepts()
      }
      else if (data.init === "View all roles") {
        viewRoles()
      }
      else if (data.init === "View all employees") {
        viewEmps()
      }
      else if (data.init === "Add a department") {
        addDept()
      }
      else if (data.init === "Add a role") {
        addRole()
      }
      else if (data.init === "Add an employee") {
        addEmp()
      }
        })
}

//   {
//       type: 'input',
//       message: "What is the employee's ID number?",
//       name: 'id'
//   },
//   {
//       type: 'input',
//       message: "What is the employee's email address?",
//       name: 'email'
//   },
//   {
//       type: 'input',
//       message: "What is the manager's office number?",
//       name: 'office'
//   }
// ]
// db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
//   console.table(result);
// });

function viewDepts () {
  db.query('SELECT * FROM departments', function (err, results) {
  console.log(results);
  setTimeout(initQuestion, 5000);
});

}
function viewRoles () {
  db.query('SELECT * FROM roles', function (err, results) {
  console.log(results);
  setTimeout(initQuestion, 5000);
});

}
function viewEmps () {
  db.query('SELECT * FROM employees', function (err, results) {
  console.log(results);
  setTimeout(initQuestion, 5000);
});
}
function addDept () {
  inquirer.prompt(deptQuestions)
  .then ((data) => {
   db.query(`INSERT IGNORE INTO departments (name)
      VALUES ('${data.deptName}')`, function (err, results) {
        console.log(results);
      });
      initQuestion();
    });
  }
  function addRole () {
    inquirer.prompt(roleQuestions)
    .then ((data) => {
      if(data.roleDept === 'Sales') {
      db.query(`INSERT IGNORE INTO roles (name, salary, department_id) VALUES ('${data.roleName}', '${data.roleSalary}', '1')`,
      function (err, results) {
        console.log(results);
      });
      }
      else if (data.roleDept === 'Engineering') {
        db.query(`INSERT IGNORE INTO roles (name, salary, department_id) VALUES ('${data.roleName}', '${data.roleSalary}', '2')`,
        function (err, results) {
          console.log(results);
        });
      }
      else if (data.roleDept === 'Finance') {
        db.query(`INSERT IGNORE INTO roles (name, salary, department_id) VALUES ('${data.roleName}', '${data.roleSalary}', '3')`,
        function (err, results) {
          console.log(results);
        });
      }
      else if (data.roleDept === 'Legal') {
        db.query(`INSERT IGNORE INTO roles (name, salary, department_id) VALUES ('${data.roleName}', '${data.roleSalary}', '4')`,
        function (err, results) {
          console.log(results);
        });
      }
      initQuestion();
    });
    
  }
  function addEmp() {
    inquirer.prompt(empQuestions)
    .then((data) =>{
      if(data.empRole === 'Sales Manager') {
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${data.firstName}', '${data.lastName}', '1', 'NULL')`,
        function (err, results) {
          console.log(results);
        });
        }
        else if (data.empRole === 'Salesperson') {
          db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${data.firstName}', '${data.lastName}', '2', '1')`,
          function (err, results) {
            console.log(results);
          });
        }
        else if (data.empRole === 'Lead Engineer') {
          db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${data.firstName}', '${data.lastName}', '3', 'NULL')`,
          function (err, results) {
            console.log(results);
          });
        }
        else if (data.empRole === 'Software Engineer') {
          db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${data.firstName}', '${data.lastName}', '4', '3')`,
          function (err, results) {
            console.log(results);
          });
        }
        else if (data.empRole === 'Account Manager') {
          db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${data.firstName}', '${data.lastName}', '5', 'NULL')`,
          function (err, results) {
            console.log(results);
          });
        }
        else if (data.empRole === 'Accountant') {
          db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${data.firstName}', '${data.lastName}', '6', '5')`,
          function (err, results) {
            console.log(results);
          });
        }
        else if (data.empRole === 'Legal Team Lead') {
          db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${data.firstName}', '${data.lastName}', '7', 'NULL')`,
          function (err, results) {
            console.log(results);
          });
        }
        else if (data.empRole === 'Lawyer') {
          db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${data.firstName}', '${data.lastName}', '8', '7')`,
          function (err, results) {
            console.log(results);
          });
        }
        initQuestion();
    });
  }
   
  initQuestion();  
//     db.query(sql, params, (err, result) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: body
//       });
//     });
  
// });
// }
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

