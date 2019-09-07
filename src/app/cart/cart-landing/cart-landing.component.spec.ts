import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartLandingComponent } from './cart-landing.component';

describe('CartLandingComponent', () => {
  let component: CartLandingComponent;
  let fixture: ComponentFixture<CartLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
