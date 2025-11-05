import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RouterLink } from '@angular/router';
import { PaymentOrder, PaymentOrderService } from '../../../core/services/payment-order.service';

@Component({
  selector: 'app-payment-orders-list',
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    AutoCompleteModule,
    CardModule,
    ButtonModule,
    FormsModule,
    RouterLink,
    TooltipModule,
  ],
  templateUrl: './payment-orders-list.html',
  styleUrl: './payment-orders-list.css',
})
export class PaymentOrdersList implements OnInit {
  private orderService = inject(PaymentOrderService);

  paymentOrders = signal<PaymentOrder[]>([]);
  filteredOrders = signal<PaymentOrder[]>([]);
  statuses = ['Created', 'Successful', 'Unsuccessful'];
  selectedStatus = signal<string | null>(null);
  searchTerm = signal<string>('');
  loading = signal(true);

  ngOnInit(): void {
    this.orderService.getPaymentOrders().subscribe({
      next: (orders) => {
        this.paymentOrders.set(orders);
        this.filteredOrders.set(orders);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load payment orders:', err);
        this.loading.set(false);
      },
    });
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

  getStatusClass(status: string): string {
    switch (status) {
      case 'Created':
        return 'status-tag status-created';
      case 'Successful':
        return 'status-tag status-successful';
      case 'Unsuccessful':
        return 'status-tag status-unsuccessful';
      default:
        return 'status-tag';
    }
  }
}
