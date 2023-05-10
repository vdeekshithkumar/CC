import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router,ActivatedRoute } from '@angular/router';
import { AddEmployeeServiceService } from './add-employee.service';
import { SessionService } from '../session.service';
import { filter } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

import { enableDebugTools } from '@angular/platform-browser';
import { Component, ChangeDetectorRef } from '@angular/core';

interface Permission {
  write: any;
  read: any;
  permission_id: number;
  type: string;
  actions: string;
}
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  Pfname:any;
  statusMsg?:string
  addEmployeeForm!: FormGroup;
  permissionsByType = {};
  selectedPermissions: Permission[] = [];
  addPermissionForm!:FormGroup;
  form:any;
  permissionList: Permission[] = [];
  correspondingPermission:any;
  advertisementRead: boolean = false;
  advertisementWrite: boolean = false;
  NegotiationRead:boolean = false;
  NegotiationWrite:boolean = false;
  ppList: any[] = []; // Initialize ppList as an empty array
permissions: any[] = [] ;
PList:any;
read: boolean|undefined;
write: boolean|undefined;
permission_id: number | undefined;
type: string | undefined;
actions: string | undefined;
companyId:any;
  currentUser: any;
  cdr: any;
  changeDetectorRef: any;
  isEdit:boolean=false;
  Puser_id:any;
  types = [];
 



  constructor(private formBuilder:FormBuilder,private router:Router,private addEmployeesService:AddEmployeeServiceService,private sessionService:SessionService,private route:ActivatedRoute){
    this.permissions = []
    ;
  }
  ngOnInit():void{

    this.addEmployeesService.getAllPermission().subscribe((data: Permissions[]) => {
      this.PList = data;
      console.log("this is permisssions list fetched"+this.PList)


    });

    this.route.queryParams.subscribe(params => {
      if (params['edit'] === 'true') {
        this.isEdit = true;
        console.log('Edit mode enabled and woking bhhhh');
      //
      this.Puser_id =1014;
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
     company_id:this.companyId,
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

updateReadCheckbox(event: Event) {
  const writeCheckbox = event.target as HTMLInputElement;
  const readCheckbox = writeCheckbox.parentElement?.previousElementSibling?.querySelector('input[type="checkbox"]') as HTMLInputElement;
  if (writeCheckbox.checked) {
    readCheckbox.checked = true;
  } else {
    readCheckbox.checked = false;
  }
}


updateReadAccess(permission: any, event: any) {
  const checkbox = event.target as HTMLInputElement;
  const action = checkbox.id.includes('write') ? 'write' : 'read';

  this.correspondingPermission = this.PList.find((p: { type: any; actions: string; }) => p.type === permission.type && p.actions === action);

  if (this.correspondingPermission) {
    console.log('Permission ID:', this.correspondingPermission.permission_id);
    console.log('Action:', this.correspondingPermission.actions);
    console.log('Type:', this.correspondingPermission.type);

    if (action === 'write' && checkbox.checked) {
      const readCheckbox = document.getElementById(permission.type + '-read') as HTMLInputElement;
      readCheckbox.checked = true;
      readCheckbox.disabled = true; // Disable the read checkbox
    } else if (action === 'write' && !checkbox.checked) {
      const readCheckbox = document.getElementById(permission.type + '-read') as HTMLInputElement;
      readCheckbox.checked = false;
      readCheckbox.disabled = false; // Enable the read checkbox
    }

    this.ppList.push(this.correspondingPermission.permission_id);
  }
}






private async addP() {
  if (this.isEdit) {
    try {
      
      console.log('User ID in addP:', this.Puser_id);
      const response = await this.addEmployeesService.EditPermission(this.ppList, this.Puser_id).toPromise();
      console.log(response);
      console.log(this.addPermissionForm.value);
      this.router.navigate(['/profile']);
    
    } catch (error) {
      console.log('Could not edit:', error);
    }
  } else {
    try {
      const emailValue = this.addEmployeeForm.value.email;
      console.log('Email value:', emailValue);

      const response = await this.addEmployeesService.addPermission(this.ppList, emailValue).toPromise();
      console.log(response);
 

      this.router.navigate(['/profile']);
    } catch (error) {
      console.log('Could not add:', error);
    }
  }
}
async onAdd() {
  if (this.isEdit) {
    try {
      const response = await this.addEmployeesService.EditUser(this.Puser_id, this.addEmployeeForm.value).toPromise();

      await this.addP();
      alert('User Edited Successfully');
      await this.router.navigate(['/profile']);
      this.isEdit = false;
      this.addEmployeeForm.reset();
    } catch (error) {
      console.log('Could not edit:', error);
      }
    } else {
      try {
        const response = await this.addEmployeesService.addEmployee(this.addEmployeeForm.value).toPromise();
        alert('User Added Successfully');
        await this.router.navigate(['/profile']);

        await this.addP(); // Wait for permissions to be added

        console.log(this.addPermissionForm.value);

        // Reload the component
        await this.router.navigate(['/dashboard']);
      } catch (error) {
        console.log('Could not add:', error);
      }
    }
  }
}
