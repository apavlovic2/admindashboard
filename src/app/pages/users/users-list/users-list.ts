import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-users-list',
  imports: [CommonModule, TableModule, ButtonModule, TagModule, ConfirmDialogModule, RouterLink, CardModule],
  providers: [ConfirmationService, MessageService],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class UsersList implements OnInit {
  users = signal<User[]>([]);
  loading = signal<boolean>(true);

  constructor(
    private userService: UserService,
    private confirmation: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading.set(true);
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load users.' });
      },
    });
  }

  deleteUser(id: string): void {
    this.confirmation.confirm({
      message: 'Are you sure you want to delete this user?',
      accept: () => {
        this.userService.deleteUser(id).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'User removed successfully' });
          this.loadUsers();
        });
      },
    });
  }
}