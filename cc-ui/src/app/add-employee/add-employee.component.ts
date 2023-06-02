import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router,ActivatedRoute } from '@angular/router';
import { AddEmployeeServiceService } from './add-employee.service';
import { SessionService } from '../session.service';
import { filter } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { enableDebugTools } from '@angular/platform-browser';
import { Component, ChangeDetectorRef } from '@angular/core';


export interface Permission {
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
  Plname: any;
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
  Pemail: any;
  Pphone: any;
  Ppassword: any;
  Paddress: any;
  Pis_verified: any;
  Pis_active: any;
  Plast_login: any;
  Pdesignation: any;
  Pis_approved: any;
 
  constructor(private formBuilder:FormBuilder,private router:Router,private addEmployeesService:AddEmployeeServiceService,private sessionService:SessionService,private route:ActivatedRoute){
    this.permissions = []
    ;
  }
  ngOnInit():void{

    this.addEmployeesService.getAllPermission().subscribe((data: Permissions[]) => {
      this.PList = data;
      console.log("this is permisssions list fetched"+this.PList)


    });

    const state = history.state;
  if (state && state.edit) {
    this.isEdit = true;
    console.log('Edit mode enabled.');

    this.Puser_id = state.user_id;
    console.log("From profile" + this.Puser_id);
    this.Pfname = state.fname;
    console.log("From profile" + this.Pfname);
    this.Plname = state.lname;
    console.log("From profile" + this.Plname);
    this.Pphone = state.phone_no;
    console.log("From profile" + this.Pphone);
    this.Pemail = state.email;
    console.log("From profile" + this.Pemail);
    this.Paddress = state.address;
    console.log("From profile" + this.Paddress);
    this.Ppassword = state.password;
    console.log("From profile" + this.Ppassword);
    this.Pis_verified = state.is_verified;
    console.log("From profile" + this.Pis_verified);
    this.Pis_approved = state.is_approved;
    console.log("From profile" + this.Pis_approved);
    this.Pis_active = state.is_active;
    console.log("From profile" + this.Pis_active);
    this.Plast_login = state.last_login;
    console.log("From profile" + this.Plast_login);
    this.Pdesignation = state.designation;
    console.log("From profile" + this.Pdesignation);
   
  }

    
    this.sessionService.getCompanyId().subscribe(
      (companyId: number) => {
        this.companyId = companyId;
        console.log('company ID is :', companyId);
      },
      (error: any) => {
        console.error('Error retrieving company ID:', error);
      }
    );

  
      if (this.isEdit) {
        this.addEmployeeForm = this.formBuilder.group({
          user_id: [this.Puser_id,Validators.required],
          company_id:this.companyId,
          fname: [this.Pfname, Validators.required],
          lname: [this.Plname, Validators.required],
          address: [this.Paddress, Validators.required],
          email: [this.Pemail, Validators.required],
          phone_no: [this.Pphone, Validators.required],
          password: ['', Validators.required],
          is_verified:[ this.Pis_verified,Validators.required],
          is_approved:[ this.Pis_approved,Validators.required],
          is_active:[ this.Pis_active,Validators.required],
          last_login:[this.Plast_login,Validators.required],
          designation: [ this.Pdesignation],
         
        });
      } else {
        this.addEmployeeForm = this.formBuilder.group({
          user_id: ['2',Validators.required],
          company_id:this.companyId,
          fname: ['', Validators.required],
          lname: ['', Validators.required],
          address: ['', Validators.required],
          email: ['', Validators.required],
          phone_no: ['', Validators.required],
          password: ['', Validators.required],
          is_verified:['1',Validators.required],
          is_approved:['1',Validators.required],
          is_active:['1',Validators.required],
          last_login:['2024-07-15',Validators.required],
          designation: ['user'],
        
          
        });
        this.disableFormAutocomplete();
      }
    

  
    if(this.isEdit)
    {

   this.addEmployeeForm.setValue({
     user_id:167,
     company_id:this.companyId,
     fname:this.Pfname,
     lname: this.Plname,
     address: this.Paddress,
     email:this.Pemail ,
     phone_no:this.Pphone,
   
   })
   const { password, ...formValuesWithoutPassword } = this.addEmployeeForm.value;
    this.addEmployeeForm.patchValue(formValuesWithoutPassword);
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
disableFormAutocomplete(): void {
  const formElement = document.getElementById('registrationForm') as HTMLFormElement;
  if (formElement) {
    const inputFields = formElement.getElementsByTagName('input');
    for (let i = 0; i < inputFields.length; i++) {
      inputFields[i].setAttribute('name', 'input_' + this.generateRandomString());
    }
  }
}

generateRandomString(): string {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
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

  this.correspondingPermission = this.PList.find(
    (p: { type: any; actions: string }) =>
      p.type === permission.type && p.actions === action
  );

  if (this.correspondingPermission) {
    console.log('Permission ID:', this.correspondingPermission.permission_id);
    console.log('Action:', this.correspondingPermission.actions);
    console.log('Type:', this.correspondingPermission.type);
    this.ppList.push(this.correspondingPermission.permission_id);
  }

  // Get the corresponding read and write checkboxes
  const readCheckbox = document.getElementById(permission.type + '-read') as HTMLInputElement;
  const writeCheckbox = document.getElementById(permission.type + '-write') as HTMLInputElement;

  if (action === 'write' && checkbox.checked) {
    // Select both read and write checkboxes
    readCheckbox.checked = true;
    writeCheckbox.checked = true;
    readCheckbox.disabled = true;
  } else if (action === 'write' && !checkbox.checked) {
    // Unselect both read and write checkboxes
    readCheckbox.checked = false;
    writeCheckbox.checked = false;
    readCheckbox.disabled = false;
  }
}

async addP() {
  debugger;
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
      console.log("list permission"+ this.ppList);
      console.log("ddhgdemail"+emailValue);
      console.log(response);
      this.router.navigate(['/profile']);
    } catch (error) {
      console.log('Could not add:', error);
    }
  }
}

async onAdd() {
  debugger;
  if (this.isEdit) {
    try {
      const response = await this.addEmployeesService.EditUser(this.Puser_id, this.addEmployeeForm.value).toPromise();
      await this.addP();
      alert('User Edited Successfully');
      this.router.navigate(['/profile']);
      this.isEdit = false;
      this.addEmployeeForm.reset(); // Move this line to after the call to addP()
    } catch (error) {
      console.log('Could not edit:', error);
    }
  } else {
    try {
      const response = await this.addEmployeesService.addEmployee(this.addEmployeeForm.value).toPromise();
      console.log("from add component" + response);
     
      await this.addP(); // Wait for permissions to be added
      // this.ppList = this.addPermissionForm.value.permissions;
      alert('User Added Successfully');
      
      this.addEmployeeForm.reset(); // Move this line here
    } catch (error) {
      console.log('Could not add:', error);
    }
  }
}


}
