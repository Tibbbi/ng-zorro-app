import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { User } from '../../models/user.interface';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-user-modal',
  standalone: true,
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule, // 🔥 Asta e cheia
    FormsModule,
    NzFormModule,
    NzInputModule
  ]
})
export class UserModalComponent implements OnInit {
  @Input() user!: User;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    @Inject(NZ_MODAL_DATA) public data: { user: User }
  ) {}

  ngOnInit(): void {
    const user = this.data?.user; 
  
    this.form = this.fb.group({
      name: [user?.name || '', Validators.required],
      email: [user?.email || '', [Validators.required, Validators.email]],
      role: [user?.role || '', Validators.required],
      status: [user?.status || '', Validators.required]
    });
  }
  

  

  cancel(): void {
    this.modalRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.modalRef.close(this.form.value);
    }
  }

  
}
