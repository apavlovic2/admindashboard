import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOrdersDetails } from './payment-orders-details';

describe('PaymentOrdersDetails', () => {
  let component: PaymentOrdersDetails;
  let fixture: ComponentFixture<PaymentOrdersDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentOrdersDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentOrdersDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
