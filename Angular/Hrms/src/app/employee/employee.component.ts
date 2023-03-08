import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { Employee } from '../../model/employee';
import { EmployeeService } from '../../../src/service/employee.service';
import { UserService } from '../_services/user.service';
import { global } from '@angular/compiler/src/util';
import { EMPTY, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})



export class EmployeeComponent implements OnInit {
  form: any = {};
  editForm: any = {};
  empDetail !: FormGroup;
  empObj: Employee = new Employee();
  empList: Employee[] = [];
  empId: Number;
  showAdminBoard = global.showAdminBoard;

  constructor(private formBuilder: FormBuilder, private empService: EmployeeService, private userService: UserService) { }

  ngOnInit(): void {

    this.getAllEmployee();

    this.empDetail = this.formBuilder.group({
      Id: [''],
      EmployeeName: [''],
      EmployeeDepartment: [''],
      EmployeeDesignation: [''],
      EmployeeSalary: [''],
    });

  }

  addEmployee(event) {
    console.log(this.form);
    this.empObj.employeeName = this.form.name;
    let errorFlag: Boolean = false;
    if (this.form.name == null || this.form.name.length <= 0) {
      var x = <HTMLFormElement>document.getElementsByClassName('invalid-feedback')[0];
      x.style.display = 'inline';
      event.preventDefault();
      errorFlag = true;
    }
    this.empObj.employeeDepartment = this.form.department;
    if (this.form.department == null || this.form.department.length <= 0) {
      var x = <HTMLFormElement>document.getElementsByClassName('invalidDepartment')[0];
      x.style.display = 'inline';
      event.preventDefault();
      errorFlag = true;
    }
    this.empObj.employeeDesignation = this.form.designation;
    if (this.form.designation == null || this.form.designation.length <= 0) {
      var x = <HTMLFormElement>document.getElementsByClassName('invalidDesignation')[0];
      x.style.display = 'inline';
      event.preventDefault();
      errorFlag = true;
    }
    this.empObj.employeeSalary = this.form.salary;
    if (this.form.salary == null || this.form.salary.length <= 0) {
      var x = <HTMLFormElement>document.getElementsByClassName('invalidSalary')[0];
      x.style.display = 'inline';
      event.preventDefault();
      errorFlag = true;
    }
    if (errorFlag === true) {
      return false;
    }

    this.empService.addEmployee(this.empObj).subscribe(res => {
      console.log(res);
      this.getAllEmployee();
      let element: HTMLElement = document.getElementById('addEmployee') as HTMLElement;
      element.click();
    }, err => {
      console.log(err);
    });
    //this.form.name = this.form.department = this.form.designation = this.form.salary = '';
  }

  getAllEmployee() {
    this.empService.getAllEmployee().subscribe(res => {
      this.empList = res;
      console.log(res);
    }, err => {
      console.log("error while fetching data.")
    });
  }

  getEmployeeById(emp: Employee) {
    this.empService.getEmployeeById(emp).subscribe(res => {
      this.empObj = res;
      console.log(res['employeeName']);
      this.form.id = res['id'];
      this.form.name = res['employeeName'];
      this.form.department = res['employeeDepartment'];
      this.form.designation = res['employeeDesignation'];
      this.form.salary = res['employeeSalary'];
    }, err => {
      console.log("error while fetching data.")
    });
  }

  updateEmployee(event) {
    this.empObj.id = Number(this.form.id);
    this.empObj.employeeName = this.form.name;
    if (this.form.name == null || this.form.name.length <= 0) {
      var x = <HTMLFormElement>document.getElementsByClassName('invalid')[0];
      x.style.display = 'inline';
      event.preventDefault();
      return false;
    }

    this.empObj.employeeDepartment = this.form.department;
    if (this.form.department == null || this.form.department.length <= 0) {
      var x = <HTMLFormElement>document.getElementsByClassName('Depart')[0];
      x.style.display = 'inline';
      event.preventDefault();
      return false;
    }

    this.empObj.employeeDesignation = this.form.designation;
    if (this.form.designation == null || this.form.designation.length <= 0) {
      var x = <HTMLFormElement>document.getElementsByClassName('invalidDesign')[0];
      x.style.display = 'inline';
      event.preventDefault();
      return false;
    }
    this.empObj.employeeSalary = this.form.salary;
    if (this.form.salary == null || this.form.salary.length < 3) {
      var x = <HTMLFormElement>document.getElementsByClassName('invalidSal')[0];
      x.style.display = 'inline';
      event.preventDefault();
      return false;
    }
    console.log(this.empObj);
    this.empService.updateEmployee(this.empObj.id, this.empObj).subscribe(res => {
      console.log(res);
      this.getAllEmployee();
      let element: HTMLElement = document.getElementById('editEmployee') as HTMLElement;
      element.click();

    }, err => {
      console.log(err);
    })
    //this.form.name = this.form.department = this.form.designation = this.form.salary = '';
  }

  deleteEmployee(emp: Employee) {
    if (confirm("are you sure want to delete the Employee? ") == true) {
      this.empService.deleteEmployee(emp).subscribe(res => {
        console.log(res);
        alert('Employee deleted successfully');
        this.getAllEmployee();
      }, err => {
        console.log(err);
      });
    } else {
      return false;
    }
  }

  clearEmployeeData(frmId) {
    var resetForm: HTMLFormElement;
    resetForm = <HTMLFormElement>document.getElementById(frmId);
    var x = <HTMLFormElement>document.getElementsByClassName('validationClass')[0];
    x.style.display = 'none';
    console.log(resetForm);
    if (resetForm)
      resetForm.reset();
  }

  onKeypressEvent(event: Event): void {
    var x = <HTMLFormElement>event.target;
    console.log(x.value);
    console.log(x.id);
    if (x.value != null && x.value.length > 0)
      console.log(x);
    if (x.id == 'name') {
      var x = <HTMLFormElement>document.getElementsByClassName('invalid-feedback')[0];
      x.style.display = 'none';
    }
    if (x.id == 'department') {
      var x = <HTMLFormElement>document.getElementsByClassName('invalidDepartment')[0];
      x.style.display = 'none';
    }
    if (x.id == 'designation') {
      var x = <HTMLFormElement>document.getElementsByClassName('invalidDesignation')[0];
      x.style.display = 'none';
    }
    if (x.id == 'salary') {
      var x = <HTMLFormElement>document.getElementsByClassName('invalidSalary')[0];
      x.style.display = 'none';
    }
    if (x.id == 'editname') {
      var x = <HTMLFormElement>document.getElementsByClassName('invalid')[0];
      x.style.display = 'none';
    }
    if (x.id == 'editdepartment') {
      var x = <HTMLFormElement>document.getElementsByClassName('Depart')[0];
      x.style.display = 'none';
    }
    if (x.id == 'editdesignation') {
      var x = <HTMLFormElement>document.getElementsByClassName('invalidDesign')[0];
      x.style.display = 'none';
    }
    if (x.id == 'editsalary') {
      var x = <HTMLFormElement>document.getElementsByClassName('invalidSal')[0];
      x.style.display = 'none';
    }
  }




}

