import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOrderForm } from './payment-order-form';

describe('PaymentOrderForm', () => {
  let component: PaymentOrderForm;
  let fixture: ComponentFixture<PaymentOrderForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentOrderForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentOrderForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
