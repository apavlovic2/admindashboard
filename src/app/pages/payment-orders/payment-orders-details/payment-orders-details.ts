import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { PaymentOrder, PaymentOrderService } from '../../../core/services/payment-order.service';

@Component({
  selector: 'app-payment-orders-details',
  imports: [CommonModule, RouterLink, CardModule, ButtonModule, TagModule, DividerModule, TooltipModule],
  templateUrl: './payment-orders-details.html',
  styleUrl: './payment-orders-details.css',
})
export class PaymentOrdersDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private orderService = inject(PaymentOrderService);

  order = signal<PaymentOrder | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const ref = this.route.snapshot.paramMap.get('id');
    if (!ref) return;

    this.orderService.getPaymentOrder(ref).subscribe({
      next: (data) => {
        this.order.set(data);
        this.loading.set(false);
      },
      error: () => {
        console.error('Failed to load payment order.');
        this.loading.set(false);
      },
    });
  }

  getStatusSeverity(status?: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case 'Successful': return 'success';
      case 'Created': return 'info';
      case 'Unsuccessful': return 'danger';
      default: return 'secondary';
    }
  }
}
