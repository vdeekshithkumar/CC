import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddEmployeeServiceService } from './add-employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  addEmployeeForm!: FormGroup;
  addPermissionForm!:FormGroup;
  form:any;

  constructor(private formBuilder:FormBuilder,private router:Router,private addEmployeesService:AddEmployeeServiceService){

  }
  ngOnInit():void{
    this.addEmployeeForm = this.formBuilder.group({
      user_id: ['2',Validators.required],
    company_id:['1',Validators.required],
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', Validators.required],
    phone_no:['9875446788', Validators.required],
    password: ['tfhgff', Validators.required],
    is_verified:['1',Validators.required],
    is_approved:['0',Validators.required],
    is_active:['1',Validators.required],
    last_login:['2024-07-15',Validators.required],
    designation: ['user'],
    });

    this.addPermissionForm = this.formBuilder.group({
      up_id:['100',Validators.required],
      user_id: ['2',Validators.required],
      permission_id:['200',Validators.required],
    
    
    });



  }

  onAdd(){
    try{
      const response = this.addEmployeesService.addEmployee(this.addEmployeeForm.value).toPromise();
      console.log(response);
      
      this.router.navigate(['/profile']);
    }
    catch(error){
      console.log('Could not add',error);
    }

    // try{
    //   const response = this.addEmployeesService.addPermission(this.addPermissionForm.value).toPromise();
    //   console.log(response);
      
    //   this.router.navigate(['/profile']);
    // }
    // catch(error){
    //   console.log('Could not add',error);
    // }

  }

}
