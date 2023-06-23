import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { AddEmployeeServiceService } from './add-employee.service';
import { SessionService } from '../session.service';
import { filter } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Inject, ViewChild } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import { Component, ChangeDetectorRef } from '@angular/core';
import { DialogComponent } from '../dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NumberInput } from '@angular/cdk/coercion';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  styleUrls: ['./add-employee.component.css', '../../stepper.scss', '../../styles.css','../app.component.css']
})
export class AddEmployeeComponent {
  @ViewChild('stepper') stepper!: MatStepper;
  edit: any;
  Pcompany_id: any;
  get isBlue(): boolean {
    return this.stepper.selectedIndex > 0;
  }
  Pfname: any;
  showform=true;
  password1!: string
  password2!: string
  activeTab = 'details';
  statusMsg?: string
  addEmployeeForm!: FormGroup;
  permissionsByType = {};
  selectedPermissions: any[] = [];
  addPermissionForm!: FormGroup;
  form: any;
  permissionList: Permission[] = [];
  correspondingPermission: any;
  advertisementRead: boolean = false;
  advertisementWrite: boolean = false;
  NegotiationRead: boolean = false;
  isPasswordDisabled: boolean = false;
  NegotiationWrite: boolean = false;
  ppList: any[] = []; // Initialize ppList as an empty array
  permissions: any[] = [];
  PList: any;
  read: boolean | undefined;
  write: boolean | undefined;
  permission_id: number | undefined;
  type: string | undefined;
  actions: string | undefined;
  companyId: any;
  showPassword = false;
  showValidationErrors: boolean = false;
  isEdit:boolean = false;
  currentUser: any;
  cdr: any;
  changeDetectorRef: any;
  
  Puser_id: any;
 
  types = [];
  Pis_verified: any;
  Plname: any;
  Pphone: any;
  Pemail: any;
  Paddress: any;
  Ppassword: any;
  Pis_approved: any;
  Pis_active: any;
  Plast_login: any;
  Pdesignation: any;
  constructor(private snackBar: MatSnackBar,private formBuilder: FormBuilder, private dialog: MatDialog, private router: Router, private addEmployeesService: AddEmployeeServiceService, private sessionService: SessionService, public dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private route: ActivatedRoute) {
    this.permissions = []
      ;
  }
  ngOnInit(): void {
   
    this.isEdit =this.data.isEdit;
  
    if(this.isEdit == true){
    this.Puser_id = this.data.user_data.user_id;
    console.log("From profile" + this.Puser_id);
    this.Pcompany_id = this.data.user_data.company_id;
    console.log("From profile" + this.Pcompany_id);
    this.Pfname = this.data.user_data.fname;
    console.log("From profile its is dataggggg" + this.Pfname);
    this.Plname = this.data.user_data.lname;
    this.Pphone = this.data.user_data.phone_no;
    this.Pemail = this.data.user_data.email;
    this.Paddress = this.data.user_data.address;
    this.isPasswordDisabled = this.isEdit;
    this.Ppassword = this.data.user_data.password;
    this.Pis_verified = this.data.user_data.is_verified;
    this.Pis_approved = this.data.user_data.is_approved;
    this.Pis_active = this.data.user_data.is_active;
    this.Plast_login = this.data.user_data.last_login;
    this.Pdesignation = this.data.user_data.designation;
    this.isEdit = this.data.isEdit;
    
    console.log("this is edit user true"+this.isEdit);
    

    console.log('Received data:', this.data);
    console.log('fname:', this.Pfname);
    // Access other properties as neede
    }
    debugger
    this.addEmployeesService.getAllPermission().subscribe((data: Permissions[]) => {
      this.PList = data;
      console.log("this is permisssions list fetched" + this.PList)
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
      user_id: ['2', Validators.required],
      company_id: this.companyId,
      fname:  ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(20)]],
      lname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(20)]],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(25)]],
      phone_no: ['', [Validators.pattern('[0-9]*'), Validators.maxLength(15)]],
      city: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$'), Validators.maxLength(15)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$'), Validators.maxLength(15)]],
      is_verified: ['1', Validators.required],
      is_approved: ['1', Validators.required],
      is_active: ['1', Validators.required],
      last_login: ['2024-07-15', Validators.required],
      designation: ['user'],
    }
    );

    if (this.isEdit) {
      
   console.log("edit mode is here"+this.isEdit)
      this.addEmployeeForm.setValue({
        user_id: this.Puser_id,
         // Set the received user_id
        company_id: this.Pcompany_id,
        fname:  this.Pfname,
        lname: this.Plname,
        address: this.Paddress,
        email: this.Pemail,
        phone_no: this.Pphone,
        city:'',
        password: this.Ppassword,
        confirm_password: this.Ppassword,
        is_verified: this.Pis_verified,
        is_approved: this.Pis_approved,
        is_active: this.Pis_active,
        last_login: this.Plast_login,
        designation: this.Pdesignation,
      });
    
    }
       //session




    this.sessionService.getCurrentUser().subscribe(user => {
      // if (user.id==null && user.token==null) {  // use this once token is used for a user
      if (user.user_id == null) {
        // if user session is null, redirect to login page
        this.router.navigate(['/sign-in']);
      }
      else {
        this.currentUser = user;
        console.log('From session ' + this.currentUser.email + '  id here ' + this.currentUser.user_id)
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
  compare() {
    debugger
    if (this.password1 === this.password2)
      return true
    else return false
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
    debugger;
  
    const checkbox = event.target as HTMLInputElement;
    const action = checkbox.id.includes('write') ? 'write' : 'read';
    let hasReadPermission = false;
    let hasWritePermission = false;
  
    if (checkbox.checked) {
      const correspondingPermission = this.PList.find(
        (p: { type: any; actions: string }) =>
          p.type === permission.type && p.actions === action
      );
  
      if (correspondingPermission) {
        console.log('Permission ID:', correspondingPermission.permission_id);
        console.log('Action:', correspondingPermission.actions);
        console.log('Type:', correspondingPermission.type);
  
        if (action === 'read') {
          if (!this.ppList.includes(correspondingPermission.permission_id)) {
            this.ppList.push(correspondingPermission.permission_id);
          }
          hasReadPermission = true;
        } else if (action === 'write') {
          const readPermission = this.PList.find(
            (p: { type: any; actions: string }) =>
              p.type === permission.type && p.actions === 'read'
          );
  
          if (readPermission) {
            console.log('Permission ID:', readPermission.permission_id);
            console.log('Action:', readPermission.actions);
            console.log('Type:', readPermission.type);
  
            const readCheckbox = document.getElementById(
              permission.type + '-read'
            ) as HTMLInputElement;
  
            if (readCheckbox) {
              readCheckbox.checked = true;
            }
  
            if (!this.ppList.includes(readPermission.permission_id)) {
              this.ppList.push(readPermission.permission_id);
            }
            if (!this.ppList.includes(correspondingPermission.permission_id)) {
              this.ppList.push(correspondingPermission.permission_id);
            }
  
            hasReadPermission = true;
            hasWritePermission = true;
          }
        }
      }
    } else {
      const correspondingPermission = this.PList.find(
        (p: { type: any; actions: string }) =>
          p.type === permission.type && p.actions === action
      );
  
      if (correspondingPermission) {
        const index = this.ppList.findIndex(
          (p: any) => p === correspondingPermission.permission_id
        );
  
        if (index !== -1) {
          this.ppList.splice(index, 1);
        }
      }
  
      if (action === 'write') {
        const readCheckbox = document.getElementById(
          permission.type + '-read'
        ) as HTMLInputElement;
  
        if (readCheckbox) {
          readCheckbox.checked = false;
          const readPermissionIndex = this.ppList.findIndex(
            (p: any) => p === permission.type + '-read'
          );
  
          if (readPermissionIndex !== -1) {
            this.ppList.splice(readPermissionIndex, 1);
          }
        }
      }
    }
  
    // Check if no permission is selected and reset ppList to an empty array
    if (!hasReadPermission && !hasWritePermission) {
      this.ppList = [];
    }
  
    console.log('Selected Permissions:', this.ppList);
  }
  
  
  
  
  


  private async addP() {
    debugger
    if (this.isEdit) {
      try {
        debugger
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
        debugger
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
    const timerDuration = 1000;
    if (this.isEdit) {
      try {
        const response = await this.addEmployeesService.EditUser(this.Puser_id, this.addEmployeeForm.value).toPromise();
        await this.addP();
        this.snackBar.open('User Edited Successfully', 'OK', {
          duration: 3000,
               verticalPosition: 'top',
        });
        setTimeout(() => {
          window.location.reload();
        }, timerDuration);
       
        this.addEmployeeForm.reset();
      } catch (error) {
        console.log('Could not edit:', error);
      }
    } else {
      try {
        const response = await this.addEmployeesService.addEmployee(this.addEmployeeForm.value).toPromise();
        await this.addP();
        this.snackBar.open('User Added Successfully', 'OK', {
          duration: 3000,
               verticalPosition: 'top',
        });
  
        setTimeout(() => {
          window.location.reload();
        }, timerDuration);
        await this.router.navigate(['/profile']);
      } catch (error) {
        console.log('Could not add:', error);
      }
    }
  }
  
  openErrorDialog(message: string): void {
    this.dialog.open(DialogComponent, {
      data: {
        message: message
      }
    });
  }
  nextStep(): void {
    if (this.addEmployeeForm.invalid) {
      setTimeout(() => {
        this.stepper.next();
      }, 100);
    } else {
      this.stepper.next();
    }
  }

  next(stepper: MatStepper) {
    if (this.addEmployeeForm.valid) {
      stepper.next();
    }
  }

  async openDialog(stepper: MatStepper) {
    // Check if all required fields are filled
    const formValue = this.addEmployeeForm.value;
    if (
      !formValue.fname ||
      !formValue.lname ||
      !formValue.email ||
      (this.isEdit && !formValue.password)
    ) {
      // If not, display the dialog box
      this.showValidationErrors = true;
      let errorMessage = 'The following fields are required:\n';
      if (!formValue.fname) {
        errorMessage += '- First Name\n';
      }
      if (!formValue.lname) {
        errorMessage += '- Last Name\n';
      }
      if (!formValue.email) {
        errorMessage += '- Email\n';
      }
      if (!this.isEdit || !formValue.password) { // Exclude confirm password validation in edit mode
        errorMessage += '- Password\n';
      }
      this.openErrorDialog(errorMessage);
      return
    }
    if (!this.addEmployeeForm.controls['email'].valid) {
      this.openErrorDialog('Invalid email format');
      return;
    }
    if (!this.addEmployeeForm.controls['fname'].valid) {
      this.openErrorDialog('Invalid First Name Format');
      return;
    }

    if (!this.addEmployeeForm.controls['lname'].valid) {
      this.openErrorDialog('Invalid Last Name Format');
      return;
    }
    if (!this.isEdit) { // Validate password and confirm password only in add mode
      const passwordControl = this.addEmployeeForm.get('password');
      if (passwordControl && passwordControl.invalid) {
        this.showValidationErrors = true;
        let passwordErrorMessage = 'Invalid password:\n';
        if (passwordControl.hasError('required')) {
          passwordErrorMessage += '- Password is required\n';
        }
      if (passwordControl.errors?.['minlength']) {
        passwordErrorMessage += '- Password must be at least 8 characters long\n';
      }
      if (passwordControl.errors?.['pattern']) {
        passwordErrorMessage += '- Password must contain at least one uppercase letter, one lowercase letter, and one digit\n';
      }
      this.openErrorDialog(passwordErrorMessage);
      return;
    }
    if (formValue.password !== formValue.confirm_password) {
      this.openErrorDialog('Password and confirm password should match');
      return;
    }
  }

  // If all required fields are filled, call next()
  stepper.next();
}
  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
function passwordMatchValidator(formGroup: FormGroup): { passwordMismatch: boolean } | null {
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}
