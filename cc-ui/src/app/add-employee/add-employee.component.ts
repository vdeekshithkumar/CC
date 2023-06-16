import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { AddEmployeeServiceService } from './add-employee.service';
import { SessionService } from '../session.service';
import { filter } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ViewChild } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import { Component, ChangeDetectorRef } from '@angular/core';
import { DialogComponent } from '../dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NumberInput } from '@angular/cdk/coercion';

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
  get isBlue(): boolean {
    return this.stepper.selectedIndex > 0;
  }
  Pfname: any;
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
  currentUser: any;
  cdr: any;
  changeDetectorRef: any;
  isEdit: boolean = false;
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
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private router: Router, private addEmployeesService: AddEmployeeServiceService, private sessionService: SessionService, private route: ActivatedRoute) {
    this.permissions = []
      ;
  }
  ngOnInit(): void {
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
      fname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      address: ['', Validators.required],
      email: ['', Validators.email],
      phone_no: ['', Validators.required],
      city: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$')]],
      confirm_password: ['', Validators.required],
      is_verified: ['1', Validators.required],
      is_approved: ['1', Validators.required],
      is_active: ['1', Validators.required],
      last_login: ['2024-07-15', Validators.required],
      designation: ['user'],
    }
    );

    if (this.isEdit == true) {
      this.addEmployeeForm.setValue({
        user_id: 167,
        company_id: this.companyId,
        fname: this.Pfname,
        lname: this.Plname,
        address: this.Paddress,
        email: this.Pemail,
        phone_no: this.Pphone,
        password: this.Ppassword,
        is_verified: this.Pis_verified,
        is_approved: this.Pis_approved,
        is_active: this.Pis_active,
        last_login: this.Plast_login,
        designation: this.Pdesignation,
      })
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
    if (this.isEdit) {
      debugger
      try {
        const response = await this.addEmployeesService.EditUser(this.Puser_id, this.addEmployeeForm.value).toPromise();
        debugger
        await this.addP();
        alert('User Edited Successfully');
        location.reload();
        this.isEdit = false;
        this.addEmployeeForm.reset();

      } catch (error) {
        console.log('Could not edit:', error);
      }
    } else {
      debugger
      try {
        const response = await this.addEmployeesService.addEmployee(this.addEmployeeForm.value).toPromise();
        debugger
        await this.addP();
        alert('User Added Successfully');
        location.reload();
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
      !formValue.password
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
      if (!formValue.password) {
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
    const passwordControl = this.addEmployeeForm.get('password');
    if (passwordControl && passwordControl.invalid) {
      this.showValidationErrors = true;
      let passwordErrorMessage = 'Invalid password:\n';
      if (passwordControl.errors?.['required']) {
        passwordErrorMessage += '- Password is required\n';
      }
      if (passwordControl.errors?.['minlength']) {
        passwordErrorMessage += '- Password must be at least 8 characters long\n';
      }
      if (passwordControl.errors?.['pattern']) {
        passwordErrorMessage += '- Password must contain at least one uppercase letter, one lowercase letter, and one digit\n';
      }
      this.openErrorDialog(passwordErrorMessage);
    }
    else {
      // If all required fields are filled, call next()
      stepper.next();
    }
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
