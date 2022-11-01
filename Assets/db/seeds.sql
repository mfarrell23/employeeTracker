USE employee_db;

INSERT INTO department (name)
VALUES
('sales'),
('finance'),
('legal');
INSERT INTO roles (title, salary, department_id)
VALUES
('sales assoc', 6000,1),
('sales manager',8000,1),
('financial assoc',6500,2),
('legal advisor',8500,3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Raja','Farrell',2,NULL),
('Oakly','Jones', 1, 1),
('Roger','Evens',3,NULL)
('Tucker','Johnson',2,NULL);