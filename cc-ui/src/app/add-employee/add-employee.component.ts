import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router,ActivatedRoute } from '@angular/router';
import { AddEmployeeServiceService } from './add-employee.service';
import { SessionService } from '../session.service';
import { filter } from 'rxjs';
import { enableDebugTools } from '@angular/platform-browser';
import { Component, ChangeDetectorRef } from '@angular/core';
 
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  Pfname:any;
  statusMsg?:string
  addEmployeeForm!: FormGroup;
  addPermissionForm!:FormGroup;
  form:any;
  advertisementRead: boolean = false;
  advertisementWrite: boolean = false;
  NegotiationRead:boolean = false;
  NegotiationWrite:boolean = false;
  permissionList: string[] = [];
permission:any;
companyId:any;
  currentUser: any;
  cdr: any;
  changeDetectorRef: any;
  isEdit:boolean=false;
  Puser_id:any;
  

  constructor(private formBuilder:FormBuilder,private router:Router,private addEmployeesService:AddEmployeeServiceService,private sessionService:SessionService,private route:ActivatedRoute){

  }
  ngOnInit():void{
    this.route.queryParams.subscribe(params => {
      if (params['edit'] === 'true') {
        this.isEdit = true;
        console.log('Edit mode enabled and woking bhhhh');
      //
      this.Puser_id =62;
        this.Pfname = "testingname";
      
      //
      }
      
    });
    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyId = companyId;
        console.log('company ID is :', companyId);
      },
      (error: any) => {
        console.error('Error retrieving company ID:', error);
      }
    );

    this.addEmployeeForm = this.formBuilder.group({
      user_id: ['2',Validators.required],
    company_id:this.companyId,
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', Validators.required],
    phone_no:['', Validators.required],
    password: ['', Validators.required],
    is_verified:['1',Validators.required],
    is_approved:['1',Validators.required],
    is_active:['1',Validators.required],
    last_login:['2024-07-15',Validators.required],
    designation: ['user'],
    });
    if(this.isEdit == true)
    {     
  
   this.addEmployeeForm.setValue({
     user_id:167,
     company_id:3,
     fname:this.Pfname,
     lname: "K",
     address: "sdhgd",
     email: "DeekshithK@ivoyant.com",
     phone_no:'9875446788',
     password: 'tfhgff',
     is_verified:1,
     is_approved:1,
     is_active:1,
     last_login:'2024-07-15',
     designation: 'user',
   }) 
  }
   
//session
this.sessionService.getCurrentUser().subscribe(user => {
  // if (user.id==null && user.token==null) {  // use this once token is used for a user
  if (user.user_id==null) {
    // if user session is null, redirect to login page
    this.router.navigate(['/sign-in']);
  }
  else{
    this.currentUser = user;
  console.log('From session '+this.currentUser.email+'  id here '+this.currentUser.user_id)

  }
  // store the user session information in a property
  
});
 //when navigate back to sign-in session ends
 this.router.events.pipe(
  filter(event => event instanceof NavigationEnd && event.url === '/sign-in')
).subscribe(() => {
  this.sessionService.clearSession();
});
}
logout(): void {
  // clear session data and redirect to login page
  this.sessionService.clearSession();

}



onPermissionChange(event: any, value: number) {
  let checkbox1 = document.getElementById('checkbox-1') as HTMLInputElement;
  let checkbox3 = document.getElementById('checkbox-3') as HTMLInputElement;
  
  if (event.target.checked) {
    switch(value){
      case 1:
        if (!this.permissionList.includes('2')) {
          this.permissionList.push('1');
        } else {
          event.target.checked = false; // uncheck the checkbox
        }
        break;
      case 2:
        this.permissionList = this.permissionList.filter(permission => permission !== '1');
        this.permissionList.push('2');
        if (this.permissionList.includes('4')) {
          checkbox3.disabled = true; // disable the value 3 checkbox
        }
        break;
      case 3:
        if (!this.permissionList.includes('4')) {
          this.permissionList.push('3');
        } else {
          event.target.checked = false; // uncheck the checkbox
        }
        break;
      case 4:
        this.permissionList = this.permissionList.filter(permission => permission !== '3');
        this.permissionList.push('4');
        if (this.permissionList.includes('2')) {
          checkbox1.disabled = true; // disable the value 1 checkbox
        }
        break;
    }
  } else {
    switch(value){
      case 1:
        this.permissionList = this.permissionList.filter(permission => permission !== '1');
        break;
      case 2:
        this.permissionList = this.permissionList.filter(permission => permission !== '2');
        checkbox1.disabled = false; // enable the value 1 checkbox
        checkbox3.disabled = false; // enable the value 3 checkbox
        break;
      case 3:
        this.permissionList = this.permissionList.filter(permission => permission !== '3');
        break;
      case 4:
        this.permissionList = this.permissionList.filter(permission => permission !== '4');
        checkbox3.disabled = false; // enable the value 3 checkbox
        checkbox1.disabled = false; // enable the value 1 checkbox
        break;
    }
  }
  
  if (this.permissionList.length === 0) {
    // if all checkboxes are unchecked, clear the permission list
    this.permissionList = [];
  }
  console.log('View initialized:', this.changeDetectorRef?.view);
  this.cdr.detectChanges();
}


private async addP() {
  if(this.isEdit == true)
  {
    try
    {
   debugger
    console.log("test in addP" + this.Puser_id)
    const response = await this.addEmployeesService.EditPermission(this.permissionList, this.Puser_id).toPromise();
    console.log(response);
    console.log(this.addPermissionForm.value);

    this.router.navigate(['/profile']);
  } catch(error) {
    console.log('Could not add', error);
  }
  }
  else{

  try {
    const emailValue = this.addEmployeeForm.value.email;
    console.log('Email value:', emailValue);
    
    const response = await this.addEmployeesService.addPermission(this.permissionList, emailValue).toPromise();
    console.log(response);
    console.log(this.addPermissionForm.value);

    this.router.navigate(['/profile']);
  } catch(error) {
    console.log('Could not add', error);
  }
}
}


async onAdd() {

if(this.isEdit == true){
  debugger
 const response = await this.addEmployeesService.EditUser(this.Puser_id,this.addEmployeeForm.value).toPromise();


 await this.addP();
 alert('User Edited Successfully')
    await this.router.navigate(['/profile'])
 this.isEdit = false;
 this.addEmployeeForm.reset();

}
else
{
  

  try {
  
    const response = await this.addEmployeesService.addEmployee(this.addEmployeeForm.value).toPromise();
    alert('User Added Successfully')
    await this.router.navigate(['/profile'])


    await this.addP(); // Wait for permissions to be added

    console.log(this.addPermissionForm.value);

   
      
    // reload the component
   
    await this.router.navigate(['/dashboard']);
    
  } catch(error) {
    console.log('Could not add', error);
  }
}
}  }