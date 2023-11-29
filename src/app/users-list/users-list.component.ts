import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { DeleteUserConfirmationComponent } from '../delete-user-confirmation/delete-user-confirmation.component';
import { Router } from '@angular/router';

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
  loader = false;
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
    private dialog: MatDialog,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.loader = true;
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response?.users;
        this.loader = false;
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
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.users = [...this.users, res];
        this.openSnackBar('User added successfully');
      }
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '500px',
      data: { user, type: 'editUser' },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        const index = this.users.findIndex((u) => u?._id === res?._id);
        if (index !== -1) {
          this.users[index] = res;
        }
        const result = JSON.parse(JSON.stringify(this.users));
        this.users = result;
        this.openSnackBar('User updated successfully');
      }
    });
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(DeleteUserConfirmationComponent, {
      data: user,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res?.deleteUser && user?._id) {
        this.userService.deleteUser(user?._id).subscribe((res) => {
          this.users = this.users.filter((u) => u._id !== res?.user?._id);
          this.openSnackBar('User deleted successfully');
        });
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
