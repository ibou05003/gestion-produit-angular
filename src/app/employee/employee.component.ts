import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees: any=[];

  modalTitle="";
  EmployeeID=0;
  Name="";
  Age="";
  State="";
  Country="";

  constructor(private employeeService: EmployeeService) {
    
  }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.employeeService.getEmployees().subscribe(
      res=>{
        console.log(res);
        this.employees=res;
        console.log(this.employees);
      },
      err=>{
        console.log(err);
      }
    )
  }

  addClick(){
    this.modalTitle="Ajout Employee";
    this.EmployeeID=0;
    this.Name="";
    this.Age="";
    this.State="";
    this.Country="";
  }

  editClick(employee:any){
    this.modalTitle="Modification Employee";
    this.EmployeeID=employee.EmployeeID;
    this.Name=employee.Name;
    this.Age=employee.Age;
    this.State=employee.State;
    this.Country=employee.Country;
  }

  createClick(){
    var employee={
      Name: this.Name,
      Age: this.Age,
      State: this.State,
      Country: this.Country
    };

    this.employeeService.create(employee).subscribe(
      res=>{
        console.log(res);
        alert(res.toString())
        this.refreshList();
      },
      err=>{
        console.log(err);
      }
    )
  }

  updateClick(){
    var employee={
      EmployeeID:this.EmployeeID,
      Name: this.Name,
      Age: this.Age,
      State: this.State,
      Country: this.Country
    };

    this.employeeService.update(employee,employee.EmployeeID).subscribe(
      res=>{
        console.log(res);
        alert(res.toString())
        this.refreshList();
      },
      err=>{
        console.log(err);
      }
    )
  }

  delete(id:any){
    if (confirm('Etes-vous sur de vouloir supprimer?')) {
      this.employeeService.delete(id).subscribe(
      res=>{
        console.log(res);
        alert(res.toString())
        this.refreshList();
      },
      err=>{
        console.log(err);
      }
    )
    }
    
  }
}
