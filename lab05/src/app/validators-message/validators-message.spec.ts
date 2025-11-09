import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorsMessage } from './validators-message';

describe('ValidatorsMessage', () => {
  let component: ValidatorsMessage;
  let fixture: ComponentFixture<ValidatorsMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidatorsMessage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidatorsMessage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
