import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  addEmpURL: string;
  getEmpURL: string;
  updateEmpUrl: string;
  deleteEmpUrl: string;
  getEmpByUrl: string;
  httpClient: any;
  baseUrl: any;

  constructor(private http: HttpClient) {

    this.addEmpURL = 'http://localhost:3000/employee/emp/create';
    this.getEmpURL = 'http://localhost:3000/employee/emp/all';
    this.updateEmpUrl = 'http://localhost:3000/employee/emp/update';
    this.deleteEmpUrl = 'http://localhost:3000/employee/emp/delete';
    this.getEmpByUrl = 'http://localhost:3000/employee/emp';
  }

  addEmployee(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.addEmpURL, emp);
  }

  getAllEmployee(): Observable<Employee[]> {
    console.log(this.http.get<Employee[]>(this.getEmpURL));
    return this.http.get<Employee[]>(this.getEmpURL);
  }

  /*updateEmployee(empId: Number, emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.updateEmpUrl, + '/' + empId, emp);
  }
  */
  updateEmployee(id: Number, emp: Employee): Observable<Object> {
    return this.http.put(`${this.updateEmpUrl}/${id}`, emp);
  }

  deleteEmployee(emp: Employee): Observable<Employee> {
    return this.http.delete<Employee>(this.deleteEmpUrl + '/' + emp.id);
  }

  getEmployeeById(emp: Employee): Observable<Employee> {
    return this.http.get<Employee>(this.getEmpByUrl + '/' + emp.id);
  }


}
