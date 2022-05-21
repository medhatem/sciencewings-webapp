import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProfilComponent } from './member-profil.component';

describe('MemberProfilComponent', () => {
  let component: MemberProfilComponent;
  let fixture: ComponentFixture<MemberProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
