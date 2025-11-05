import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PaymentOrderService, PaymentOrder, CustomerData } from '../../../../core/services/payment-order.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-order-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    SelectModule,
    RadioButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './payment-order-form.html',
  styleUrl: './payment-order-form.css',
})
export class PaymentOrderForm implements OnInit {
  form!: FormGroup;
  orderReference!: string;
  duplicateRef = signal(false);
  suggestedRef = signal('');
  customers = signal<CustomerData[]>([]);
  selectedCustomer!: CustomerData | null;
  customerMode = signal<'existing' | 'manual'>('manual');

  statuses = [
    { label: 'Created', value: 'Created' },
    { label: 'Successful', value: 'Successful' },
    { label: 'Unsuccessful', value: 'Unsuccessful' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private orderService: PaymentOrderService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.orderReference = this.route.snapshot.paramMap.get('id') ?? '';

    this.form = this.fb.group({
      reference: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      currency: ['USD', Validators.required],
      status: ['Created', Validators.required],
      paidOn: [null],
      authorizationCode: [''],
      customerMode: ['manual', Validators.required],
      customerSelect: [null],
      customer: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: [''],
        address: [''],
        postalCode: [''],
        city: [''],
        country: [''],
      }),
    });

    this.http.get<any[]>('http://localhost:3000/users').subscribe({
      next: (users) => {
        const customers = users
          .filter(u => u.roles.includes('Customer'))
          .map(u => ({
            firstName: u.firstName,
            lastName: u.lastName,
            email: u.email,
            phone: u.phone ?? '',
            address: u.address ?? '',
            postalCode: u.postalCode ?? '',
            city: u.city ?? '',
            country: u.country ?? '',
          }));
        this.customers.set(customers);
      },
      error: (err) => console.error('Failed to load customers', err),
    });
      this.orderService.getPaymentOrders().subscribe((orders) => {
        const refs = orders.map((o) => o.reference);
        const nums = refs
          .map((r) => parseInt(r.replace('PAY-', ''), 10))
          .filter((n) => !isNaN(n));
        const nextNum = Math.max(...nums, 1000) + 1;
        this.form.patchValue({ reference: `PAY-${nextNum}` });
      });

    this.form.get('reference')?.valueChanges.subscribe((ref) => {
      if (!ref) return;
      this.orderService.getPaymentOrders().subscribe((orders) => {
        const exists = orders.some((o) => o.reference === ref);
        this.duplicateRef.set(exists);
        if (exists) this.suggestedRef.set(`${ref}-1`);
        else this.suggestedRef.set('');
      });
    });

    this.form.get('customerSelect')?.valueChanges.subscribe((customer) => {
      if (customer && this.customerMode() === 'existing') {
        this.form.get('customer')?.patchValue({
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone ?? '',
          address: customer.address ?? '',
          postalCode: customer.postalCode ?? '',
          city: customer.city ?? '',
          country: customer.country ?? '',
        });
      }
    });

    this.form.get('customerMode')?.valueChanges.subscribe((mode) => {
      this.customerMode.set(mode);
      if (mode === 'manual') {
        this.form.get('customerSelect')?.reset();
      }
    });
  }

  useSuggestedRef() {
    this.form.patchValue({ reference: this.suggestedRef() });
    this.duplicateRef.set(false);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Invalid Input',
        detail: 'Please correct the form errors.',
      });
      return;
    }

    if (this.duplicateRef()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Duplicate Reference',
        detail: 'Please use a unique reference value.',
      });
      return;
    }

    const f = this.form.value;

    let customerData: CustomerData;
    if (this.customerMode() === 'existing') {
      customerData = {
        ...f['customerSelect'],
        ...f['customer'],
      };
    } else {
      customerData = f['customer'];
    }

    const order: PaymentOrder = {
      reference: f['reference'],
      title: f['title'],
      description: f['description'],
      amount: f['amount'],
      currency: f['currency'],
      status: f['status'],
      paidOn: f['status'] === 'Successful' ? f['paidOn'] : null,
      authorizationCode: f['status'] === 'Successful' ? f['authorizationCode'] : null,
      customer: customerData,
      createdOn: new Date(),
    };

    this.orderService.createPaymentOrder(order).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Payment Order created successfully',
        });
        setTimeout(() => this.router.navigate(['/payment-orders']), 1000);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to save payment order',
        });
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/payment-orders']);
  }

  get f() {
    return this.form.controls;
  }
}