import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputText } from 'primeng/inputtext';
import { AutoComplete } from 'primeng/autocomplete';
import { Card } from 'primeng/card';


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
  selector: 'app-payment-orders-list',
  imports: [CommonModule, TableModule, InputText, AutoComplete, Card, FormsModule],
  templateUrl: './payment-orders-list.html',
  styleUrl: './payment-orders-list.css',
})
export class PaymentOrdersList implements OnInit {
  paymentOrders = signal<PaymentOrder[]>([]);
  filteredOrders = signal<PaymentOrder[]>([]);
  statuses = ['Created', 'Successful', 'Unsuccessful'];
  selectedStatus = signal<string | null>(null);
  searchTerm = signal<string>('');

  ngOnInit(): void {
    const mockOrders: PaymentOrder[] = Array.from({ length: 25 }, (_, i) => {
      const status = this.statuses[Math.floor(Math.random() * 3)] as PaymentOrder['status'];
      const isPaid = status === 'Successful';
      return {
        reference: `PAY-${1000 + i}`,
        title: `Order ${i + 1}`,
        description: `Payment for Order #${i + 1}`,
        status,
        amount: Math.floor(Math.random() * 1000) + 100,
        currency: 'USD',
        customer: {
          firstName: 'John',
          lastName: `Doe ${i + 1}`,
          email: `john${i + 1}@example.com`,
          phone: '+1234567890',
          address: '123 Main Street',
          postalCode: '1000',
          city: 'New York',
          country: 'USA',
        },
        createdOn: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        paidOn: isPaid ? new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000) : undefined,
        authorizationCode: isPaid ? `AUTH-${Math.floor(Math.random() * 900000) + 100000}` : undefined,
      };
    });

    this.paymentOrders.set(mockOrders);
    this.filteredOrders.set(mockOrders);
  }

  applyFilters(): void {
    let data = this.paymentOrders();

    const search = this.searchTerm().toLowerCase();
    if (search) {
      data = data.filter(
        (order) =>
          order.reference.toLowerCase().includes(search) ||
          order.title.toLowerCase().includes(search) ||
          order.description.toLowerCase().includes(search)
      );
    }

    const status = this.selectedStatus();
    if (status) {
      data = data.filter((order) => order.status === status);
    }

    this.filteredOrders.set(data);
  }

  filterStatuses(event: { query: string }): void {
    const query = event.query.toLowerCase();
    const allStatuses = ['Created', 'Successful', 'Unsuccessful'];
    this.statuses = allStatuses.filter((s) => s.toLowerCase().includes(query));
  }
}
