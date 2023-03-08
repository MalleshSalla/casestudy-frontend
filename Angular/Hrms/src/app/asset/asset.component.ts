import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Asset } from '../../model/asset';
import { AssetService } from '../../../src/service/asset.service';
import { UserService } from '../_services/user.service';
import { EmployeeService } from 'src/service/employee.service';
import { global } from '@angular/compiler/src/util';
import { Employee } from '../../model/employee';


@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})



export class AssetComponent implements OnInit {
  form: any = {};
  editForm: any = {};
  assDetail !: FormGroup;
  assObj: Asset = new Asset();
  assList: Asset[] = [];
  assId: Number;
  showAdminBoard = global.showAdminBoard;
  empObj: Employee = new Employee();


  constructor(private formBuilder: FormBuilder, private assService: AssetService, private userService: UserService, private empService: EmployeeService) { }

  ngOnInit(): void {

    this.getAllAsset();

    this.assDetail = this.formBuilder.group({
      Id: [''],
      AssetName: [''],
      AssetModelNo: [''],
      AssetType: [''],
      EmployeeId: ['']
    });

  }

  addAsset(event) {
    console.log(this.form);
    this.assObj.assetName = this.form.assetname;
    let errorFlag: Boolean = false;
    if (this.form.assetname == null || this.form.assetname.length <= 0) {
      var x = <HTMLFormElement>document.getElementsByClassName('invalidname')[0];
      x.style.display = 'inline';
      event.preventDefault();
      errorFlag = true;
    }
    this.assObj.assetModelNo = this.form.modelNo;

    if (this.form.modelNo == null || this.form.modelNo.length <= 0) {
      var x = <HTMLFormElement>document.getElementsByClassName('invalidmodel')[0];
      x.style.display = 'inline';
      event.preventDefault();
      errorFlag = true;
    }
    this.assObj.assetType = this.form.assettype;

    if (this.form.assettype == null || this.form.assettype.length <= 0) {
      var x = <HTMLFormElement>document.getElementsByClassName('invalidtype')[0];
      x.style.display = 'inline';
      event.preventDefault();
      errorFlag = true;
    }
    this.assObj.employeeId = this.form.employeeid;
    if (this.form.employeeid == null || this.form.employeeid.length <= 0) {
      var x = <HTMLFormElement>document.getElementsByClassName('invalidemployeeid')[0];
      x.style.display = 'inline';
      event.preventDefault();
      errorFlag = true;
    }
    if (errorFlag === true) {
      return false;
    }
    this.assService.addAsset(this.assObj).subscribe(res => {
      console.log(res);
      this.getAllAsset();
      let element: HTMLElement = document.getElementById('addAsset') as HTMLElement;
      element.click();

    }, err => {
      console.log(err);
    });
    //this.form.name = this.form.department = this.form.designation = this.form.salary = '';
  }

  getAllAsset() {
    this.assService.getAllAsset().subscribe(res => {
      this.assList = res;
      console.log(res);
      for (let key in res) {
        let value = res[key];
        this.empObj.id = value.employeeId;
        this.empService.getEmployeeById(this.empObj).subscribe(response => {
          this.assList[key].employeeName = response['employeeName'];



        }, err => {
          console.log("error while fetching data.");
          this.assList[key].employeeName = 'Not Allocated';
          this.assList[key].employeeId = null;
        });
      }

    }, err => {
      console.log("error while fetching data.")
    });
  }


  getAssetById(ass: Asset) {
    this.assService.getAssetById(ass).subscribe(res => {
      this.assObj = res;
      console.log(res);
      this.form.id = res['id'];
      this.form.assetname = res['assetName'];
      this.form.modelNo = res['assetModelNo'];
      this.form.assettype = res['assetType'];
      this.form.employeeid = ass['employeeId'];

    }, err => {
      console.log("error while fetching data.")
    });
  }

  updateAsset(event) {
    this.assObj.id = Number(this.form.id);
    this.assObj.assetName = this.form.assetname;
    if (this.form.assetname == null || this.form.assetname.length <= 0) {
      var x = <HTMLFormElement>document.getElementsByClassName('editname')[0];
      x.style.display = 'inline';
      event.preventDefault();
      return false;
    }
    this.assObj.assetModelNo = this.form.modelNo;
    if (this.form.modelNo == null || this.form.modelNo.length <= 0) {
      var x = <HTMLFormElement>document.getElementsByClassName('editmodel')[0];
      x.style.display = 'inline';
      event.preventDefault();
      return false;
    }
    this.assObj.assetType = this.form.assettype;
    if (this.form.assettype == null || this.form.assettype.length <= 0) {
      var x = <HTMLFormElement>document.getElementsByClassName('edittype')[0];
      x.style.display = 'inline';
      event.preventDefault();
      return false;
    }
    this.assObj.employeeId = this.form.employeeid;
    if (this.form.employeeid == null || this.form.employeeid.length <= 0) {
      var x = <HTMLFormElement>document.getElementsByClassName('editemployee')[0];
      x.style.display = 'inline';
      event.preventDefault();
      return false;
    }
    console.log(this.assObj);
    this.assService.updateAsset(this.assObj.id, this.assObj).subscribe(res => {
      console.log(res);
      this.getAllAsset();
      let element: HTMLElement = document.getElementById('editAsset') as HTMLElement;
      element.click();
    }, err => {
      console.log(err);
    })
    //this.form.name = this.form.department = this.form.designation = this.form.salary = '';
  }

  deleteAsset(ass: Asset) {
    if (confirm("are you sure want to delete the Asset? ") == true) {
      this.assService.deleteAsset(ass).subscribe(res => {
        console.log(res);
        alert('Asset deleted successfully');
        this.getAllAsset();
      }, err => {
        console.log(err);
      });
    } else {
      return false;
    }
  }

  onKeypressEvent(event: Event): void {
    var x = <HTMLFormElement>event.target;
    console.log(x.value);
    console.log(x.id);
    if (x.value != null && x.value.length > 0)
      console.log(x);
    if (x.id == 'addname') {
      var x = <HTMLFormElement>document.getElementsByClassName('invalidname')[0];
      x.style.display = 'none';
    }
    if (x.id == 'addmodel') {
      var x = <HTMLFormElement>document.getElementsByClassName('invalidmodel')[0];
      x.style.display = 'none';
    }
    if (x.id == 'addassettype') {
      var x = <HTMLFormElement>document.getElementsByClassName('invalidtype')[0];
      x.style.display = 'none';
    }
    if (x.id == 'addemployeeid') {
      var x = <HTMLFormElement>document.getElementsByClassName('invalidemployeeid')[0];
      x.style.display = 'none';
    }
    if (x.id == 'editassetname') {
      var x = <HTMLFormElement>document.getElementsByClassName('editname')[0];
      x.style.display = 'none';
    }
    if (x.id == 'editmodelno') {
      var x = <HTMLFormElement>document.getElementsByClassName('editmodel')[0];
      x.style.display = 'none';
    }
    if (x.id == 'editassettype') {
      var x = <HTMLFormElement>document.getElementsByClassName('edittype')[0];
      x.style.display = 'none';
    }
    if (x.id == 'editemployeeid') {
      var x = <HTMLFormElement>document.getElementsByClassName('editemployee')[0];
      x.style.display = 'none';
    }
  }

  clearAssetData(frmId) {
    var resetForm: HTMLFormElement;
    resetForm = <HTMLFormElement>document.getElementById(frmId);
    console.log(resetForm);
    if (resetForm)
      resetForm.reset();
  }

}

function emp(emp: any) {
  throw new Error('Function not implemented.');
}

