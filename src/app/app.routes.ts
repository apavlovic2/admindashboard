import { Routes } from '@angular/router';
import { Home } from './pages/home/home'
import { PaymentOrdersList } from './pages/payment-orders/payment-orders-list/payment-orders-list';
import { PaymentOrdersDetails } from './pages/payment-orders/payment-orders-details/payment-orders-details';
import { PaymentOrderForm } from './pages/payment-orders/payment-order-form/payment-order-form/payment-order-form';
import { UsersList } from './pages/users/users-list/users-list';
import { UserForm } from './pages/users/user-form/user-form';
import { Error401 } from './pages/errors/error401/error401';
import { Error403 } from './pages/errors/error403/error403';
import { Error404 } from './pages/errors/error404/error404';

export const routes: Routes = [
    { path: '', component: Home, title: 'Dashboard - Home' },
    {
        path: 'payment-orders',
        children: [
            { path: '', component: PaymentOrdersList, title: 'Payment orders' },
            { path: 'create', component: PaymentOrderForm, title: 'Create Payment Order' },
            { path: ':id', component: PaymentOrdersDetails, title: 'Payment order details' },
        ],
    },
    {
        path: 'users',
        children: [
            { path: '', component: UsersList, title: 'Users' },
            { path: 'create', component: UserForm, title: 'Create User' },
            { path: 'edit/:id', component: UserForm, title: 'Edit User' },
        ]
    },
    { path: '401', component: Error401 },
    { path: '403', component: Error403 },
    { path: '404', component: Error404 },
    { path: '**', redirectTo: '404'},
];
