
--question 1
create view employee_details_salary as

select
e.emp_no,
e.first_name, 
e.last_name ,
e.sex, 
s.salary
from employees e
join salaries s on e.emp_no = s.emp_no ;


--question 2
select first_name ,last_name ,hire_date 
from employees e
where hire_date between '1986-01-01' and '1986-12-31';


--question 3
select d.dept_no, d.dept_name , dm.emp_no , e.last_name , e.first_name 
from departments d 
join dept_manager dm on d.dept_no = dm.dept_no 
join employees e on e.emp_no = dm.emp_no;


--question 4
select de.emp_no , e.last_name , e.first_name , d.dept_name 
from dept_emp de 
join departments d on de.dept_no = d.dept_no 
join employees e on e.emp_no = de.emp_no; 

--question 5
select first_name , last_name , sex 
from employees e 
where first_name = 'Hercules' and last_name like 'B%';

--question 6
select e.emp_no , e.last_name , e.first_name , d.dept_name 
from dept_emp de 
join departments d on de.dept_no = d.dept_no 
join employees e on e.emp_no = de.emp_no
where d.dept_name = 'Sales';

--question 7
select e.emp_no , e.last_name , e.first_name , d.dept_name 
from dept_emp de 
join departments d on de.dept_no = d.dept_no 
join employees e on e.emp_no = de.emp_no
where d.dept_name = 'Sales' or d.dept_name ='Development';


--question 8
select 
	last_name ,
	count(last_name )
from employees e
group by last_name 
order by count(last_name ) desc ;


