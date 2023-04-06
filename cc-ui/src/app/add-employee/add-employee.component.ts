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
  Ar:any;
  Aw:any;
  Nr:any;
  Nw:any;

 
 
  

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
      up_id:['8',Validators.required],
      user_id: ['',Validators.required],
      permission_id:['',Validators.required],
    
    
    
    });
   
    this.Ar=9;
    this.Aw=8;
this.Nr=7;
this.Nw=6;

  }
  OnMainPer(){
    console.log('Ar:', this.Ar);
console.log('Nr:', this.Nr);
console.log('Aw:', this.Aw);
console.log('Nw:', this.Nw);
    if(this.Ar == 10 && this.Nr == 30 && this.Aw == 8 && this.Nw==6)
    {
      this.addPermissionForm.setValue({
        up_id:100,
        user_id: 2,
        permission_id: 5,
      });
    }

    else if(this.Aw == 20 && this.Nw== 40 && this.Ar == 10 && this.Nr == 30)
    {
      this.addPermissionForm.setValue({
        up_id:100,
        user_id: 2,
        permission_id: 6,
      });

    }

    else if(this.Ar == 10 && this.Nw== 40 && this.Aw== 8 && this.Nr== 30)
    {
      this.addPermissionForm.setValue({
        up_id:100,
        user_id: 2,
        permission_id: 7,
      });

    }

    else if(this.Aw == 20 && this.Nr == 30 && this.Ar== 10 && this.Nw== 6)
    {
      this.addPermissionForm.setValue({
        up_id:100,
        user_id: 2,
        permission_id: 8,
      });
    }

    else if(this.Ar == 10 && this.Aw== 8 && this.Nr == 7 && this.Nw == 6)
    {
      this.addPermissionForm.setValue({
        up_id:100,
        user_id: 2,
        permission_id: 1,
      });
    }

    else if(this.Ar == 10 && this.Aw== 20 && this.Nr == 7 && this.Nw == 6)
    {
      this.addPermissionForm.setValue({
        up_id:100,
        user_id: 2,
        permission_id: 2,
      });
    }

    else if(this.Ar == 9 && this.Aw== 8 && this.Nr == 30 && this.Nw == 6)
    {
      this.addPermissionForm.setValue({
        up_id:100,
        user_id: 2,
        permission_id: 3,
      });
    }
    else 
    {
      this.addPermissionForm.setValue({
        up_id:100,
        user_id: 2,
        permission_id: 4,
      });
    }

  }

 OnAdRead()
 {
  this.Ar=10;
 
  this.OnMainPer()
 }


  OnAdWrite(){
    this.Aw = 20;
    this.Ar =10;
   
    this.OnMainPer()
  }

  
 OnNRead()
 {
  this.Nr =30;
  
  this.OnMainPer()
 }
  OnNWrite(){
    this.Nw = 40;
    this.Nr = 30;
   
    this.OnMainPer()
  }




 
  onAdd(){
    try{
      const response = this.addEmployeesService.addEmployee(this.addEmployeeForm.value).toPromise();
      console.log(response);
      
      console.log(this.addPermissionForm.value);
      this.router.navigate(['/profile']);
    }
    catch(error){
      console.log('Could not add',error);
    }

    try{
      const response = this.addEmployeesService.addPermission(this.addPermissionForm.value).toPromise();
      console.log(response);
      console.log(this.addPermissionForm.value);
      
      this.router.navigate(['/profile']);
    }
    catch(error){
      console.log('Could not add',error);
    }

  }

}
