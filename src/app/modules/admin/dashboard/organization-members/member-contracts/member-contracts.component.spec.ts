import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberContractsComponent } from './member-contracts.component';

describe('MemberContractsComponent', () => {
  let component: MemberContractsComponent;
  let fixture: ComponentFixture<MemberContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
