import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
}

interface PaymentOrder {
  reference: string;
  title: string;
  description: string;
  status: 'Created' | 'Successful' | 'Unsuccessful';
  amount: number;
  currency: string;
  customer: CustomerData;
  createdOn: Date;
  paidOn?: Date;
  authorizationCode?: string;
}

@Component({
  selector: 'app-payment-orders-details',
  imports: [CommonModule, RouterLink, CardModule, ButtonModule, TagModule, DividerModule, TooltipModule],
  templateUrl: './payment-orders-details.html',
  styleUrl: './payment-orders-details.css',
})
export class PaymentOrdersDetails implements OnInit {
  private route = inject(ActivatedRoute);
  order = signal<PaymentOrder | null>(null);

  ngOnInit(): void {
    const ref = this.route.snapshot.paramMap.get('id');
    if (!ref) return;

    // TODO: put real order logic
    const mockOrder: PaymentOrder = {
      reference: ref,
      title: `Mock Order ${ref}`,
      description: 'Detailed description of the payment order.',
      status: 'Successful',
      amount: 250.75,
      currency: 'USD',
      customer: {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        phone: '+123456789',
        address: '456 Elm Street',
        postalCode: '10001',
        city: 'New York',
        country: 'USA',
      },
      createdOn: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      paidOn: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      authorizationCode: 'AUTH123456',
    };

    this.order.set(mockOrder);
  }

  getStatusSeverity(status?: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined 
  {
    switch (status) {
      case 'completed': return 'success';
      case 'pending':   return 'warn';
      case 'failed':    return 'danger';
      default:          return 'secondary';
    }
  }
}