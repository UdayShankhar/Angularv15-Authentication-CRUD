import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

interface User {
  _id?: string;
  name?: string;
  phoneNumber?: string;
  address?: string;
  state?: string;
  city?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = [
    'name',
    'phone',
    'address',
    'state',
    'city',
    'actions',
  ];
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response?.users;
      },
      () => {
        this.openSnackBar('Error while fetching users');
      }
    );
  }

  addUser() {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '500px',
      data: { type: 'addUser' },
    });

    dialogRef.afterClosed().subscribe((res) => {
      // console.log(res)
    });
  }

  editUser(user: any): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '500px',
      data: { user, type: 'editUser' },
    });

    dialogRef.componentInstance.userUpdated.subscribe((updatedUserDetails) => {
      const index = this.users.findIndex(
        (u) => u._id === updatedUserDetails._id
      );
      if (index !== -1) {
        this.users[index] = updatedUserDetails;
      }
      // console.log(this.users);
    });

    dialogRef.afterClosed().subscribe((res) => {
      // console.log(res);
    });
  }

  deleteUser(user: any): void {
    // console.log('Delete user:', user);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
