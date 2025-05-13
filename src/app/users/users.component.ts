import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { User } from './models/user.interface';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CustomPipe } from './pipes/custom.pipe';
import { StatusClassPipe } from './pipes/status-class.pipe';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzPaginationModule,
    UserModalComponent,
    NzIconModule,
    NzCardModule,
    CustomPipe,
    StatusClassPipe
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  users: User[] = [
    { id: 1, name: 'Ana', email: 'ana@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Mihai', email: 'mihai@example.com', role: 'User', status: 'Inactive' },
    { id: 3, name: 'Tibi', email: 'tibi@tibi.com', role: 'admin', status: 'active' },
    { id: 4, name: 'Ioana', email: 'ioana@example.com', role: 'User', status: 'Active' },
    { id: 5, name: 'George', email: 'george@example.com', role: 'Admin', status: 'Inactive' },
    { id: 6, name: 'Alina', email: 'alina@example.com', role: 'User', status: 'Active' },
    { id: 7, name: 'Radu', email: 'radu@example.com', role: 'Admin', status: 'Inactive' },
    { id: 8, name: 'Diana', email: 'diana@example.com', role: 'User', status: 'Active' },
    { id: 9, name: 'Alex', email: 'alex@example.com', role: 'User', status: 'Inactive' }
  ];
  

  displayedUsers: User[] = [];
  pageSize = 5;
  currentPage = 1;

  constructor(private modal: NzModalService) {}

  ngOnInit(): void {
    this.updatePageData();
  }

  updatePageData(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.displayedUsers = this.users.slice(start, start + this.pageSize);
  }

 /* addUser(): void {
    const id = Date.now();
    this.users.push({
      id,
      name: 'Nou',
      email: `nou${id}@example.com`,
      role: 'User',
      status: 'Active'
    });
    this.updatePageData();
  } */
 
    addUser(): void {
      const modalRef = this.modal.create({
        nzTitle: 'Add User',
        nzContent: UserModalComponent,
        nzData: {
          user: { id: 0, name: '', email: '', role: '', status: '' }
        },
        nzFooter: null // eliminăm footerul implicit
      });
    
      modalRef.afterClose.subscribe((result: Partial<User> | undefined) => {
        if (result && result.name && result.email && result.role && result.status) {
          this.users.push({
            id: Date.now(),
            name: result.name,
            email: result.email,
            role: result.role,
            status: result.status
          });
          this.updatePageData();
        }
      });
    }
    
    
    


  editUser(user: User): void {
    const modalRef = this.modal.create({
      nzTitle: 'Edit User',
      nzContent: UserModalComponent,
      nzData: { user: { ...user } }, // ← pasăm datele către componentă
      nzFooter: null // ← eliminăm butoanele implicite
    });
  
    modalRef.afterClose.subscribe((result: Partial<User> | undefined) => {
      if (result && result.name && result.email && result.role && result.status) {
        Object.assign(user, result);
        this.updatePageData();
      }
    });
  }
  
  
  
  
  

  deleteUser(user: User): void {
    this.users = this.users.filter(u => u.id !== user.id);
    this.updatePageData();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePageData();
  }
  
}
