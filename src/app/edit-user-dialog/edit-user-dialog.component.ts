import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: 'edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss'],
})
export class EditUserDialogComponent {
  @Output() userUpdated = new EventEmitter<any>();
  editUserForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    const formConfig = {
      name: [data?.user?.name || '', Validators.required],
      phoneNumber: [data?.user?.phoneNumber || '', Validators.required],
      address: [data?.user?.address || '', Validators.required],
      state: [data?.user?.state || '', Validators.required],
      city: [data?.user?.city || '', Validators.required],
    };
    this.editUserForm = this.fb.group(formConfig);
  }

  onSubmit(): void {
    const updatedUserDetails = this.editUserForm.value;
    if (this.data?.type === 'addUser') {
      this.userService.addUser(this.editUserForm.value).subscribe(
        (res) => {
          if (res) {
            this.dialogRef.close(res?.user);
          }
        },
        (error) => {
          this.openSnackBar(error.error.message || 'Error while adding user');
        }
      );
    } else {
      const userID = this.data;
      this.userService
        .updateUser(this.data?.user?._id, this.editUserForm.value)
        .subscribe(
          (res) => {
            if (res) {
              this.dialogRef.close(res?.user);
            }
          },
          () => this.openSnackBar('Error while updating user')
        );
    }
    this.userUpdated.emit(updatedUserDetails);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
