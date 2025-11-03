import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOrdersList } from './payment-orders-list';

describe('PaymentOrdersList', () => {
  let component: PaymentOrdersList;
  let fixture: ComponentFixture<PaymentOrdersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentOrdersList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentOrdersList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
