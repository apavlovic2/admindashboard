import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';

export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface PaymentOrder {
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

@Injectable({ providedIn: 'root' })
export class PaymentOrderService {
  private readonly baseUrl = 'http://localhost:3000/paymentOrders';

  constructor(private http: HttpClient) {}

  getPaymentOrders(): Observable<PaymentOrder[]> {
    return this.http.get<PaymentOrder[]>(this.baseUrl);
  }

  getPaymentOrder(reference: string): Observable<PaymentOrder> {
    return this.http.get<PaymentOrder[]>(`${this.baseUrl}?reference=${reference}`)
      .pipe(map(results => results[0]));
  }

  createPaymentOrder(order: PaymentOrder): Observable<PaymentOrder> {
    return this.http.post<PaymentOrder>(this.baseUrl, order);
  }

  updatePaymentOrder(reference: string, order: PaymentOrder): Observable<PaymentOrder> {
    return this.http.get<PaymentOrder[]>(`${this.baseUrl}?reference=${reference}`).pipe(
      map(results => results[0]),
      switchMap(existing => this.http.put<PaymentOrder>(`${this.baseUrl}/${(existing as any).id}`, order))
    );
  }

  deletePaymentOrder(reference: string): Observable<void> {
    return this.http.get<PaymentOrder[]>(`${this.baseUrl}?reference=${reference}`).pipe(
      map(results => results[0]),
      switchMap(existing => this.http.delete<void>(`${this.baseUrl}/${(existing as any).id}`))
    );
  }
}
