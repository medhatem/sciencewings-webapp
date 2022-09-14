import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberContractsFormComponent } from './member-contracts-form.component';

describe('MemberContractsFormComponent', () => {
  let component: MemberContractsFormComponent;
  let fixture: ComponentFixture<MemberContractsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberContractsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberContractsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
