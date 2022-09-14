import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberUpdateContractComponent } from './member-update-contract.component';

describe('MemberUpdateContractComponent', () => {
  let component: MemberUpdateContractComponent;
  let fixture: ComponentFixture<MemberUpdateContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberUpdateContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberUpdateContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
