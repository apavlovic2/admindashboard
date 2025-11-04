export type PaymentStatus = 'Created' | 'Successful' | 'Unsuccessful';

export interface Customer {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface PaymentOrder {
  paymentReference: string;
  title: string;
  description: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  customer: Customer;
  createdOn: string; // ISO date string
  paidOn?: string; // only for successful
  authorizationCode?: string; // only for successful
}