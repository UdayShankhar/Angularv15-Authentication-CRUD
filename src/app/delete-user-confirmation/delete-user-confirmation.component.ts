import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user-confirmation',
  templateUrl: './delete-user-confirmation.component.html',
  styleUrls: ['./delete-user-confirmation.component.scss'],
})
export class DeleteUserConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteUserConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  deleteUser(isDelete: boolean): void {
    this.dialogRef.close({ deleteUser: isDelete });
  }
}
