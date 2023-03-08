import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
import { Asset } from 'src/model/asset';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  addAssURL: string;
  getAssURL: string;
  updateAssUrl: string;
  deleteAssUrl: string;
  getAssByUrl: string;
  httpClient: any;
  baseUrl: any;

  constructor(private http: HttpClient) {

    this.addAssURL = 'http://localhost:9100/asset/create';
    this.getAssURL = 'http://localhost:9100/asset/get/all';
    this.updateAssUrl = 'http://localhost:9100/asset/update';
    this.deleteAssUrl = 'http://localhost:9100/asset/delete';
    this.getAssByUrl = 'http://localhost:9100/asset/get';
  }

  addAsset(ass: Asset): Observable<Asset> {
    return this.http.post<Asset>(this.addAssURL, ass);
  }

  getAllAsset(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.getAssURL);
  }

  /*updateEmployee(empId: Number, emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.updateEmpUrl, + '/' + empId, emp);
  }
  */
  updateAsset(id: Number, ass: Asset): Observable<Object> {
    return this.http.put(`${this.updateAssUrl}/${id}`, ass);
  }

  deleteAsset(ass: Asset): Observable<Asset> {
    return this.http.delete<Asset>(this.deleteAssUrl + '/' + ass.id);
  }

  getAssetById(ass: Asset): Observable<Asset> {
    return this.http.get<Asset>(this.getAssByUrl + '/' + ass.id);
  }


}
