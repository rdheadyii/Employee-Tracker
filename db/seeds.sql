INSERT INTO department (department_name)
VALUES 
    ('Software Engineer'),
    ('Human Resources'),
    ('Sales'),
    ('Research and Development'),
    ('Legal'),
    ('Rockstar');

INSERT INTO role (title, salary, department_id)
VALUES 
    ('SR Software Engineer', 160000, 1),
    ('JR Software Engineer', 97000, 1),
    ('Director of HR', 100000, 2),
    ('HR Administrator', 85000, 2),
    ('Director of Sales', 180000, 3),
    ('Sales Associate', 75000, 3),
    ('Research Lead', 125000, 4),
    ('Researcher', 90000, 4),
    ('Lawyer', 250000, 5),
    ('Paralegal', 78000, 5),
    ('Lead Vocals', 500000, 6),
    ('Drummer', 485000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Jim', 'Bob', 1, NULL),
    ('Juanathon', 'Mendez', 2, 1),
    ('Toby', 'Barrett', 3, NULL),
    ('Rogue', 'Diesel', 4, 3),
    ('Han', 'Solo', 5, NULL),
    ('Chew', 'Bacca', 6, 5),
    ('Din', 'Djarin', 7, NULL),
    ('Boba', 'Fett', 8, 7),
    ('Phoenix', 'Wright', 9, NULL),
    ('Parrotis', 'Legalis', 10, 9),
    ('Daisuke', 'Tsuda', 11, NULL),
    ('Nao', 'Kawakita', 12, NULL);